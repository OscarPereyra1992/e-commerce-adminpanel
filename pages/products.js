import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";

export default function Products(){
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        axios.get('/api/products').then(response =>{
            setProducts(response.data);
        })
    },[])
    return(
        <Layout>
            <Link className="bg-blue-700 rounded-md text-white py-1 px-2"
             href={'products/new'}>Add new product</Link>
            <table className="">
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(products =>(
                        <tr>
                            <td>{products.title}</td>
                            <td>
                                buttons
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )

}