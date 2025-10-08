import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate =  useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/user/login',formData, {withCredentials:true})
      .then((res) => {
        console.log(res.data.user)
        localStorage.setItem('token', res.data.user)
        navigate('/')
      })
    } catch (error) {
      console.log('Error :: login :: ', error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 text-white">
      <div className="bg-neutral-800 p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>

        <div className="space-y-4">
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

          <button onClick={handleSubmit} className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
            Login
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
