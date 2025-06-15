import axios from "axios"
import { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/product")
        .then((res) => {
            setProducts(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className="w-full h-full rounded-md p-2 relative">
            <Link to="/admin/product/addProduct" className="absolute bottom-5 right-5 text-3xl cursor-pointer text-white bg-blue-500 rounded-full p-2"><FaPlus /></Link>
            
            <table className="w-full text-center">
                <thead className="bg-gray-500 text-white h-10 text-lg font-bold rounded-md">
                    <tr>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Labeled Price</th>
                        <th>Stoke</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product,index)=>{
                            return(
                                <tr key={index} className="h-10 hover:bg-gray-500 cursor-pointer hover:text-white">
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.labeledPrice}</td>
                                    <td>{product.stoke}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}