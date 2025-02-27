import React, { useState } from "react";
import { loginUser } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData);
      setMessage(result.message);

      if (result.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      }
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold text-center mb-4">User Login</h2>
        <input type="email" name="email" value={formData.email} className="border p-2 w-full" placeholder="User ID" onChange={handleChange} required />
        <input type="password" name="password" value={formData.password} className="border p-2 w-full mt-2" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full mt-4">LOGIN</button>
        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
        <Link to="/forgot-password" className="text-blue-600 text-center block mt-4">Forgot Password?</Link>
      </form>
    </div>
  );
}

export default Login;
