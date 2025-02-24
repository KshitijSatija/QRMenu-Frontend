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
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
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
          <h2 className="text-2xl font-bold text-blue-600">Focus Bias</h2>
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

        <main className="p-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <img
                      src={userData?.avatar}
                      alt={`${userData?.fullName}'s profile`}
                      className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9";
                      }}
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700">
                      <FaEdit size={14} /> 
                    </button>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-800">
                    {userData?.fullName}
                  </h2>
                  <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mt-2">
                    {userData?.role}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="text-gray-700 font-medium">{userData?.username}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700 font-medium">{userData?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p>Updated profile picture</p>
                      <span className="text-gray-400">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <p>Completed project milestone</p>
                      <span className="text-gray-400">Yesterday</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="text-gray-700 font-medium">{userData?.mobileno}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-700 font-medium">
                        {userData?.dob && format(new Date(userData.dob), "MMMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
