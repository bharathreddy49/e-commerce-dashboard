const express = require("express");
const cors = require("cors");

require("./db/config");
const User = require("./db/User");
const newLocal = "./db/Product";
const Product = require(newLocal);
//const product = require("./db/product");
//const mongoose=require('mongoose');
const app = express();

//const connectDB=async()=>{
//  mongoose.connect('mongodb://localhost:27017')
//}
//app.get("/",(req,res)=>{ // call back function,  get(path: "/",
// res.send("Hai i'm Bharath")
//});

app.use(express.json()); // express.json() is the middleware used to get data from postman to nodejs
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body); // creating instance of model , what ever getting from postman storing in user collection
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password"); // .select("-password") is used to not send password to Db for security
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "no User found" });
    }
  }

  // resp.send(user)
});
app.post("/add-products", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Product  found" });
  }
});

app.delete("/product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

app.listen(4000);

// mongoose contains schema- which defines the structure
// using schema we will built model
// using model we do CRUD operations
