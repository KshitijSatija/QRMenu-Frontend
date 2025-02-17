import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionHash = Cookies.get("sessionHash");

    if (!sessionHash) {
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-gray-600 mt-2">This is your main dashboard page.</p>
      </div>
    </div>
  );
};

export default Dashboard;
