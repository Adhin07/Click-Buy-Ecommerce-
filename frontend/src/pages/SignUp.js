import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import ecommerceImage from "../assest/signup.png";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Network error! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-full flex">
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2 h-full">
          <img src={ecommerceImage} alt="E-commerce" className="w-full h-full object-cover" />
        </div>
        
        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Account</h2>
          <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Name:</label>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
              />
            </div>
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
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Confirm Password:</label>
              <div className="flex items-center p-3 rounded-md border border-gray-300 focus-within:ring focus-within:ring-blue-200">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
                <span
                  className="cursor-pointer text-xl text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-md text-white font-semibold bg-blue-600 transition hover:bg-blue-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-6 text-gray-600 text-center">
            Already have an account? {" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
