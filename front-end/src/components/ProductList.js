import react, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import AddProduct from './AddProduct';
const ProductList=()=>{
    const [products,setProducts]=react.useState([]);
    
    const getproducts= async ()=>{
        let result= await fetch('http://localhost:4000/products');
        headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
        }
        result=await result.json();
        setProducts(result);
    }

    useEffect(()=>{
        getproducts();
    },[]);

    const deleteproduct= async (id)=>{
        console.warn(id);
        let result= await fetch(`http://localhost:4000/product/${id}`,{
            method:"Delete"
        });
        result= await result.json();
        if(result){
            getproducts();
        }
    }

    const searchhandle=async (event)=>{
        let key =event.target.value;
        if(key){
        let result=await fetch(`http://localhost:4000/search/${key}`);
        result=await result.json();
        if(result){
            setProducts(result);
        }}
        else{
            getproducts();
        }
    }
    //console.warn(products);
    return(
        <div className='Product-list'>
            <h3>Product List</h3>
            <input type="text" className="search-product" placeholder='Search for product' onChange={searchhandle}/>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
            products.length>0 ? products.map((item,index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>
                    <button onClick={()=>deleteproduct(item._id)}>Delete</button>
                    <Link to={"/update/"+item._id}>Update</Link>
                    </li>
                </ul>
            )
            :<h1>No Result found</h1>
        }
        </div>
    )
};
export default ProductList;