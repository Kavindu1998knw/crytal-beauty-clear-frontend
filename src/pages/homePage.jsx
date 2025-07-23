import { Routes, Route } from "react-router";
import Header from "../components/header";
export default function HomePage() {
  return (
    <div className="h-screen w-full max-h-screen bg-gray-100">
      <Header />
      <div className="w-full h-[calc(100%-70px)] bg-gray-200">
        <Routes>
          <Route path="/" element={<h1>Welcome to Crystal Beauty Clear</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/about" element={<h1>About Us</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
          <Route path="/reviews" element={<h1>Reviews</h1>} />
        </Routes>
      </div>
    </div>
  );
}
