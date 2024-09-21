import React from "react";
const AddProduct = () => {
    const [name,setname]=React.useState('');
    const [price,setprice]=React.useState('');
    const [category,setcategory]=React.useState('');
    const [company,setcompany]=React.useState('');
    const [error,seterror]=React.useState(false);
     
    const addProduct = async() =>{
        if(!name||!price||!category||!company){
            seterror(true);
            return false;
        }


        console.warn(name,price,category,company)
        const userId=JSON.parse(localStorage.getItem("user"))._id;
        console.warn(userId);
        let result = await fetch("http://localhost:4000/add-products", {
            method: "post",
            body: JSON.stringify({name,price,category,company}), // converting into string foam
            headers: {
              "Content-Type": "application/json",
            }
        });
        result = await result.json();
    console.warn(result);
    }
    
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputbox" value={name} onChange={(e)=>{
            setname(e.target.value)}
        }
      />
      {error&&!name&&<span className="invalid-input">Enter valid name</span>}
      <input
        type="text"
        placeholder="Enter product price"
        className="inputbox" value={price} onChange={(e)=>{
            setprice(e.target.value)
        }}
      />
      {error&&!price&&<span className="invalid-input">Enter valid price</span>}
      <input type="text"
        placeholder="Enter product category"
        className="inputbox" value={category} onChange={(e)=>{
            setcategory(e.target.value)
        }}
      />
      {error&&!category&&<span className="invalid-input">Enter valid category</span>}
      <input
        type="text"
        placeholder="Enter product company"
        className="inputbox" value={company} onChange={(e)=>{
            setcompany(e.target.value)
        }}
      />
      {error&&!company&&<span className="invalid-input">Enter valid company</span>}
      <button onClick={addProduct} type="button" className="appbutton">Add Product</button>
    </div>
  );
};
export default AddProduct;
