import "./App.css";
import Nav from "./components/Nav.js";
import Signup from "./components/Signup.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkcomponent from "./components/Checkcomponent.js";
import Login from "./components/Login.js";
import AddProduct from "./components/AddProduct.js";
import ProductList from "./components/ProductList.js";
import UpdateProduct from "./components/UpdateComponent.js"
import Footer from "./components/Footer.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<Checkcomponent />}>
            <Route path="/" element={<ProductList/>}></Route>
            <Route path="/add" element={<AddProduct />}></Route>
            <Route
              path="/update/:id"
              element={<UpdateProduct/>}
            ></Route>
            <Route path="/logout" element={<h1>logout Component</h1>}></Route>
            <Route path="/profile" element={<h1>Profile Component</h1>}></Route>
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
      {/* <h1>E-Commerce Dashboard</h1> */}
    </div>
  );
}

export default App;
