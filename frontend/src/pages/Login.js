import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import ecommerceImage from "../assest/ecommerce1.png";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../apis/fetching";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Email and password are required!");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate("/");
        fetchUserDetails({ dispatch });
      } else {
        toast.error(result.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Network error! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="login" className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-full flex">
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2 h-full">
          <img src={ecommerceImage} alt="E-commerce" className="w-full h-full object-cover" />
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login to Your Account</h2>
          <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Password:</label>
              <div className="flex items-center p-3 rounded-md border border-gray-300 focus-within:ring focus-within:ring-blue-200">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
                <span
                  className="cursor-pointer text-xl text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <Link
                to="/ForgotPassword"
                className="block text-sm text-blue-600 hover:underline mt-1 text-right"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-md text-white font-semibold bg-blue-600 transition hover:bg-blue-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-6 text-gray-600 text-center">
            Don't have an account? {" "}
            <Link to="/SignUp" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;