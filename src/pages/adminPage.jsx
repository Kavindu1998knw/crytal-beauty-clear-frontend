import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { FaThList } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="w-[300px] h-full bg-gray-300" >
                <Link to="/admin/dashboard" className="flex items-center gap-2 p-4 text-white bg-gray-400 mb-2 rounded-md"> <MdSpaceDashboard />Dashboard</Link>
                <Link to="/admin/users" className="flex items-center gap-2 p-4 text-white bg-gray-400 mb-2 rounded-md"><FaUsersGear />Users</Link>
                <Link to="/admin/products" className="flex items-center gap-2 p-4 text-white bg-gray-400 mb-2 rounded-md"><FaThList />Products</Link>
                <Link to="/admin/orders" className="flex items-center gap-2 p-4 text-white bg-gray-400 mb-2 rounded-md"><FaClipboardList />Orders</Link>
            </div>
            <div className="w-full h-full bg-white rounded-md ml-2">
                <Routes path="/*">
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/products" element={<AdminProductPage />} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/product/addProduct" element={<AddProductPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                    <Route path="/product/editProduct" element={<EditProductPage/>}/>
                </Routes>
            </div>
        </div>
    )
}