import React, { useState } from "react";
import { registerUser } from "../../api";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      setMessage(result.message);

      if (result.success) {
        localStorage.setItem("isLoggedIn", "true"); // Store login status
        navigate("/"); // Redirect to Home
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("isLoggedIn", "true"); // Store login status
    navigate("/"); // Redirect to home
  };

  return (
    <div className="bg-[#e0e0e0] h-[100vh] w-[100vw] text-[#000] flex justify-center items-center flex-col relative">
      <form
        onSubmit={handleSubmit}
        className="bg-[#f5f5f5] h-[68vh] w-[30vw] flex justify-center items-center flex-col gap-[15px] rounded-[10px]"
      >
        <h2 className="text-[#838383] text-[25px] font-bold">
          User Registration
        </h2>
        <div className="flex justify-center flex-col gap-[20px]">
          <input
            type="text"
            name="name"
            value={formData.name}
            className="bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px]"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            className="bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px]"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            className="bg-[#e9e9e9] outline-blue-600 h-[6vh] w-[20vw] rounded-[5px] p-[10px]"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="text-[17px] text-white h-[6vh] w-[20vw] bg-blue-600 rounded-[5px]"
          >
            Register
          </button>
          {message && <p className="text-[#000] text-center">{message}</p>}
          <button
            type="button"
            onClick={handleSkip}
            className="text-[17px] text-red-500 h-[6vh] w-[20vw] rounded-[5px] bg-gray-300"
          >
            Skip Registration
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

