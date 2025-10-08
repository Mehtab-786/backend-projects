import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      // 5️⃣ Send data to backend in JSON format
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        formData,
        {
            withCredentials:true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 6️⃣ Handle backend response
      setMessage(res.data.message || "Registered successfully!");
      console.log("Registered user:", res.data);
      localStorage.setItem('token', JSON.stringify(res.data))
      navigate('/')      

    } catch (error) {
      console.error("Error:", error);
      setMessage(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 text-white">
      <div className="bg-neutral-800 p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-700 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-700 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-700 focus:outline-none"
          />

          <button
            onClick={submitHandler}
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Register
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
