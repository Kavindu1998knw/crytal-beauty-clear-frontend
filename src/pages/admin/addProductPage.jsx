import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mediaUpload } from "../../util/mediaFileUpload";

/*productId,
  name,
  altNames,
  price,
  labeledPrice,
  description,
  images,
  stoke*/

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stoke, setStoke] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState([]);

  async function handleSubmit() {
    const altNamesArray = altNames.split(",");
    const promisesArray = [];
    for (let i = 0; i < image.length; i++) {
      promisesArray[i] = mediaUpload(image[i]);
    }

    try {
      const imageUrls = await Promise.all(promisesArray);

      const productData = {
        productId,
        name,
        altNames: altNamesArray,
        price,
        labeledPrice,
        description,
        stoke,
        images: imageUrls,
      };
      const token = localStorage.getItem("token");
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Product not added");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[600px] flex flex-col justify-center items-center shadow-xl rounded-2xl p-4">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <input
          onChange={(e) => setProductId(e.target.value)}
          type="text"
          name="productId"
          id="productId"
          placeholder="Product ID"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          onChange={(e) => setAltNames(e.target.value)}
          type="text"
          name="altNames"
          id="altNames"
          placeholder="Alternative Names"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          onChange={(e) => setLabeledPrice(e.target.value)}
          type="number"
          name="labeledPrice"
          id="labeledPrice"
          placeholder="Labeled Price"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          onChange={(e) => {
            setImage(e.target.files);
          }}
          multiple
          type="file"
          name="image"
          id="image"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          className="w-[400px] h-[100px] rounded-xl border-2 border-gray-500 m-2 p-2 resize-none"
        />
        <input
          onChange={(e) => setStoke(e.target.value)}
          type="number"
          name="stoke"
          id="stoke"
          placeholder="Stoke"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <div className=" w-[400px] flex items-center justify-between">
          <Link
            to="/admin/products"
            className="w-[150px] h-[50px] rounded-xl bg-red-500 text-white m-2 p-2 cursor-pointer hover:bg-red-600 text-center flex justify-center items-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="w-[150px] h-[50px] rounded-xl bg-blue-500 text-white m-2 p-2 cursor-pointer hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
