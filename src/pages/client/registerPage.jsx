import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleRegister() {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    axios
      .post(import.meta.env.VITE_API_URL + "/api/user/", {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        phone: formData.phone,
      })
      .then((res) => {
        toast.success(res.data.message || "Registered successfully!");
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="w-full h-screen bg-[url('./login-bg.jpg')] bg-cover bg-center flex">
      <div className="w-1/2 h-full"></div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-[450px] min-h-[550px] shadow-lg backdrop-blur-sm rounded-xl flex flex-col justify-center items-center p-4">
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-[400px] h-[45px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white"
          />
          <input
            onChange={handleChange}
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-[400px] h-[45px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white"
          />
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className="w-[400px] h-[45px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white"
          />
          <input
            onChange={handleChange}
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-[400px] h-[45px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            className="w-[400px] h-[45px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white"
          />
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-[400px] h-[45px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white"
          />
          <button
            onClick={handleRegister}
            className="w-[400px] h-[50px] rounded-xl bg-green-600 text-white m-2 p-2 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-500 cursor-pointer" to={"/"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
