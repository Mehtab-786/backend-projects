import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Caption() {
  const [caption, setCaption] = useState(null);
  const [url, setUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false); // for image upload spinner
  const navigate = useNavigate();

  // 1️⃣ Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // 2️⃣ Redirect if not authenticated
  if (isAuthenticated === false) {
    return <Navigate to="/register" replace />;
  }
  if (isAuthenticated === null) {
    return (
      <p className="text-white text-center mt-10">Checking authentication...</p>
    );
  }

  // 3️⃣ Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true); // start spinner
    try {
      const res = await axios.post("http://localhost:3000/api/post/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setUrl(res.data.post.image);
      setCaption(res.data.post.caption);
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setLoading(false); // stop spinner
    }
  };

  // 4️⃣ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4">
      <div className="bg-neutral-800 p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center gap-6 relative">
        <h2 className="text-2xl font-bold text-blue-400 mb-2 text-center">
          AI Caption Generator
        </h2>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600"
        >
          Logout
        </button>

        {/* Image preview */}
        {url ? (
          <img
            src={url}
            alt="Uploaded"
            className="w-full h-80 object-cover object-center rounded-lg border border-neutral-700"
          />
        ) : (
          <div className="w-full h-80 bg-neutral-700 flex items-center justify-center rounded-lg text-gray-400">
            {loading ? (
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
            ) : (
              "Image preview will appear here"
            )}
          </div>
        )}

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 rounded bg-neutral-700 text-white cursor-pointer"
        />

        {/* Caption */}
        {caption && (
          <p className="bg-neutral-700 p-4 rounded w-full text-center text-gray-300">
            {caption}
          </p>
        )}
      </div>

      {/* Spinner CSS */}
      <style>
        {`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        `}
      </style>
    </div>
  );
}

export default Caption;
