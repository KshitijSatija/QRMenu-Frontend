import { useState, useEffect } from "react";
import API from "../api/api"; // Import API instance
import { format } from "date-fns";
import { FaSpinner, FaUser, FaBell, FaCog, FaSignOutAlt, FaEdit, FaChartLine, FaCalendar, FaTasks } from "react-icons/fa";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await API.get("/user/profile"); // Fetch user data
        setUserData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <a href="#" className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 text-blue-600">
              <FaUser /> 
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
              <FaChartLine /> 
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
              <FaCalendar /> 
              <span>Calendar</span>
            </a>
            <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
              <FaTasks /> 
              <span>Tasks</span>
            </a>
          </div>
        </nav>
      </div>

      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaBell className="text-gray-600" /> 
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaCog className="text-gray-600" /> 
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaSignOutAlt className="text-gray-600" /> 
              </button>
            </div>
          </div>
        </header>

        <main>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
