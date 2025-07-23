import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_API_URL + "/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.message || "Login successful");
        localStorage.setItem("token", res.data.token);

        const user = res.data.user;
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong");
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="w-full h-screen bg-[url('./login-bg.jpg')] bg-cover bg-center flex">
      <div className="w-1/2 h-full"></div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-[450px] h-[400px] shadow-lg backdrop-blur-sm rounded-xl flex flex-col justify-center items-center">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-[400px] h-[50px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-[400px] h-[50px] rounded-xl border-2 border-gray-300 m-2 p-2 text-white"
          />
          <button
            onClick={handleLogin}
            className="w-[400px] h-[50px] rounded-xl bg-blue-500 text-white m-2 p-2 cursor-pointer"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-500 cursor-pointer" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
