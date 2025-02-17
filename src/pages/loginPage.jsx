import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Cookies from "js-cookie";
import LightButton from "../LightButton"; // Import the LightButton component

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);  // State to manage display of LightButton/LoginForm
  const navigate = useNavigate();

  useEffect(() => {
    const sessionHash = Cookies.get("sessionHash");
    if (sessionHash) {
      navigate("/dashboard"); // Redirect to dashboard if sessionHash is present
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await API.post("/auth/login", { username, password });

      if (response.data.sessionHash) {
        Cookies.set("sessionHash", response.data.sessionHash, { expires: 1, secure: true });
        console.log("Login successful:", response.data);
        navigate("/dashboard");
      } else {
        setError("Session hash missing in response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleButtonClick = () => {
    setShowLogin(true); // Trigger the display of LoginForm when button is clicked
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Display LightButton initially, and LoginForm after click */}
      {!showLogin ? (
        <LightButton onClick={handleButtonClick} />
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
