import Layout from "@/components/Layout";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { useState } from "react";

export default function newProduct(){
    const[title,setTitle]= useState('');
    const[description,setDescription]= useState('');
    const[price, setPrice]= useState('');
    const[goToProducts,setGoToProducts]= useState(false);
    const router =  useRouter();
    async function createProduct(ev){
        ev.preventDefault();
        const dataProducts= {title, description, price}
        await axios.post('/api/products', dataProducts);
        setGoToProducts(true);

    }

    if(goToProducts) {
       router.push('/products');
    }
    return(
        <Layout>
            <form onSubmit={createProduct}>
            <h1>New Product</h1>
            <label>Product name</label>
            <input type="text" placeholder="Product name" 
            value={title} onChange={ev => setTitle(ev.target.value)}
            />
            <label>Description</label>
            <textarea placeholder="Products description"  
            value={description} onChange={ev => setDescription(ev.target.value)}/>
            <label>Price</label>
            <input type="number" placeholder="Product price" value={price} onChange={ev => setPrice(ev.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
            </form>
            
        </Layout>
    )
}