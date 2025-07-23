import axios from "axios";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    if (loading){
      axios
      .get(import.meta.env.VITE_API_URL + "/api/product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }
    
  }, [loading]);

  async function deleteProduct(id) {
    const token = localStorage.getItem("token");
    console.log(id);
    
    if (!token) {
      alert("You need to login first");
      return;
    }
    try {
      await axios.delete(import.meta.env.VITE_API_URL + "/api/product/" + id, {
        headers: {
          Authorization: "Bearer "+token,
        },
      });
      toast.success("Product deleted successfully");
      loading ? setLoading(false) : setLoading(true);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product");
    }
  }

  return (
    <div className="w-full h-full rounded-md p-2 relative">
      <Link
        to="/admin/product/addProduct"
        className="absolute bottom-5 right-5 text-3xl cursor-pointer text-white bg-blue-500 rounded-full p-2"
      >
        <FaPlus />
      </Link>

      {loading &&
        <Loader/>
      }
      {!loading && <table className="w-full text-center">
        <thead className="bg-gray-200 h-10 text-lg font-bold rounded-md">
          <tr>
            <th>Product Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Labeled Price</th>
            <th>Stoke</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index} className="h-10 hover:bg-gray-100 cursor-pointer">
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.labeledPrice}</td>
                <td>{product.stoke}</td>
                <td>
                  <div className="flex justify-center items-center gap-3 text-[20px]">
                    <FaTrashAlt
                      onClick={() => deleteProduct(product.productId)}
                      className="hover:text-red-500"
                    />
                    <FaPencilAlt
                    onClick={()=>navigate("/admin/product/editProduct/",{state:product})}
                     className="hover:text-blue-500" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>}

      
    </div>
  );
}
