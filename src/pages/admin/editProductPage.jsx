import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
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

export default function EditProductPage() {
  const locationData = useLocation();
  const navigate = useNavigate();
  if (!locationData.state) {
    toast.error("No product data found to edit");
    window.location.href("/admin/products");
  }

  const [productId, setProductId] = useState(locationData.state.productId);
  const [name, setName] = useState(locationData.state.name);
  const [altNames, setAltNames] = useState(
    locationData.state.altNames.join(",")
  );
  const [price, setPrice] = useState(locationData.state.price);
  const [labeledPrice, setLabeledPrice] = useState(
    locationData.state.labeledPrice
  );
  const [description, setDescription] = useState(
    locationData.state.description
  );
  const [stoke, setStoke] = useState(locationData.state.stoke);
  const [image, setImage] = useState([]);

  async function handleSubmit() {
    const altNamesArray = altNames.split(",");
    const promisesArray = [];
    for (let i = 0; i < image.length; i++) {
      promisesArray[i] = mediaUpload(image[i]);
    }

    try {
      let imageUrls = await Promise.all(promisesArray);
      if (imageUrls.length === 0) {
        imageUrls = locationData.state.images; // Use existing images if no new images are uploaded
      }
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
      await axios.put(
        import.meta.env.VITE_API_URL + "/api/product/"+productId,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product Updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Product not Updated");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[600px] flex flex-col justify-center items-center shadow-xl rounded-2xl p-4">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <input
          value={productId}
          disabled
          onChange={(e) => setProductId(e.target.value)}
          type="text"
          name="productId"
          id="productId"
          placeholder="Product ID"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
        value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
        value={altNames}
          onChange={(e) => setAltNames(e.target.value)}
          type="text"
          name="altNames"
          id="altNames"
          placeholder="Alternative Names"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
        value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
        value={labeledPrice}
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
          value={image}
          multiple
          type="file"
          name="image"
          id="image"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          className="w-[400px] h-[100px] rounded-xl border-2 border-gray-500 m-2 p-2 resize-none"
        />
        <input
          onChange={(e) => setStoke(e.target.value)}
          value={stoke}
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
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}
