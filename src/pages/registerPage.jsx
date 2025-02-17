import React, { useState } from "react";
import API from "../api/api"; // Ensure the API import path is correct
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [step, setStep] = useState(1); // Step 1: Register, Step 2: OTP verification

  // Registration Fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [dob, setDob] = useState("");

  // OTP Verification Fields
  const [otp, setOtp] = useState("");

  // Error and Success Messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await API.post("/auth/send-otp", { email });

      if (response.status === 200) {
        setSuccess("OTP sent to your email. Please check your inbox.");
        setStep(2); // Move to OTP verification step
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  // Step 2: Verify OTP and Register
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await API.post("/auth/verify-otp", {
        email,
        otp,
        username,
        password,
        firstName,
        lastName,
        mobileno,
        dob,
      });

      if (response.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after successful registration
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {step === 1 ? (
        <>
          <h2 className="text-xl font-bold mb-4">Register</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}

          <form onSubmit={handleSendOTP}>
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
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="mb-4">
              <label className="block text-gray-700">First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Mobile Number:</label>
              <input
                type="number"
                value={mobileno}
                onChange={(e) => setMobileno(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
              Send OTP
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}

          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label className="block text-gray-700">Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
              Verify OTP & Register
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
