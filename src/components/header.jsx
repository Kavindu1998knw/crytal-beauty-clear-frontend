import { Link } from "react-router-dom";
export default function Header() {
    return (
        <header className="bg-blue-500 h-[70px] text-white p-4 flex items-center align-center justify-between">
            <h1 className="text-2xl font-bold">Crystal Beauty Clear</h1>
            <div className="flex items-center gap-4">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/reviews">Reviews</Link>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </header>
    );
}