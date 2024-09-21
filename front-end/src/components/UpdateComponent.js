import { useEffect } from 'react';
import React from "react";
import { useParams,useNavigate } from 'react-router-dom'
const UpdateProduct = () => {
    const [name,setname]=React.useState('');
    const [price,setprice]=React.useState('');
    const [category,setcategory]=React.useState('');
    const [company,setcompany]=React.useState('');
    const params = useParams();
    const naviagte=useNavigate();
    //const [error,seterror]=React.useState(false);
    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:4000/product/${params.id}`);
        result = await result.json();
        setname(result.name);
        setprice(result.price);
        setcategory(result.category);
        setcompany(result.company)
    }



    const UpdateProduct = async() =>{
        console.warn(name,price,category,company)
        let result = await fetch(`http://localhost:4000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({name,price,category,company}), // converting into string foam
            headers: {
              "Content-Type": "application/json",
            }
         });
        result = await result.json();
        // console.warn(result);
        if(result){
            naviagte("/")
        }
    }

return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder=" product name"
        className="inputbox" value={name} onChange={(e)=>{
            setname(e.target.value)}
        }
      />
      {/* {error&&!name&&<span className="invalid-input">Enter valid name</span>} */}
      <input
        type="text"
        placeholder="Enter product price"
        className="inputbox" value={price} onChange={(e)=>{
            setprice(e.target.value)
        }}
      />
      {/* {error&&!price&&<span className="invalid-input">Enter valid price</span>} */}
      <input type="text"
        placeholder="Enter product category"
        className="inputbox" value={category} onChange={(e)=>{
            setcategory(e.target.value)
        }}
      />
      {/* {error&&!category&&<span className="invalid-input">Enter valid category</span>} */}
      <input
        type="text"
        placeholder="Enter product company"
        className="inputbox" value={company} onChange={(e)=>{
            setcompany(e.target.value)
        }}
      />
      {/* {error&&!company&&<span className="invalid-input">Enter valid company</span>} */}
      <button onClick={UpdateProduct} type="button" className="appbutton">update Product</button>
    </div>
  );
};
export default UpdateProduct;
