import { Link } from "react-router-dom";

/*productId,
  name,
  altNames,
  price,
  labeledPrice,
  description,
  images,
  stoke*/

export default function AddProductPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[600px] flex flex-col justify-center items-center shadow-xl rounded-2xl p-4">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <input
          type="text"
          name="productId"
          id="productId"
          placeholder="Product ID"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          type="text"
          name="altNames"
          id="altNames"
          placeholder="Alternative Names"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <input
          type="number"
          name="labeledPrice"
          id="labeledPrice"
          placeholder="Labeled Price"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          className="w-[400px] h-[100px] rounded-xl border-2 border-gray-500 m-2 p-2 resize-none"
        />
        <input
          type="number"
          name="stoke"
          id="stoke"
          placeholder="Stoke"
          className="w-[400px] h-[40px] rounded-xl border-2 border-gray-500 m-2 p-2"
        />
        <div className=" w-[400px] flex items-center justify-between">
        <Link to="/admin/products" className="w-[150px] h-[50px] rounded-xl bg-red-500 text-white m-2 p-2 cursor-pointer hover:bg-red-600 text-center flex justify-center items-center">Cancel</Link>
          <button className="w-[150px] h-[50px] rounded-xl bg-blue-500 text-white m-2 p-2 cursor-pointer hover:bg-blue-600">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
