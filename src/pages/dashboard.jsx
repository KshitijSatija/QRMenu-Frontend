import { useState, useEffect } from "react";
import API from "../api/api"; // Import API instance
import { format } from "date-fns";
import {
  FaSpinner,
  FaUser,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaEdit,
  FaChartLine,
  FaCalendar,
  FaTasks,
} from "react-icons/fa";
import profilePlaceholder from "../assets/profile.svg";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
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

    const fetchRecentLogs = async () => {
      try {
        const response = await API.get("/api/menu/logs/recent");
        setRecentLogs(response.data.logs || []);
      } catch (err) {
        console.error("Error fetching recent logs:", err);
      }
    };

    fetchUserData();
    fetchRecentLogs();
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
    <main className="p-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  src={userData?.avatar || profilePlaceholder}
                  alt={`${userData?.fullName}'s profile`}
                  className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = profilePlaceholder;
                  }}
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700">
                  <FaEdit size={14} />
                </button>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {userData?.firstName + " " + userData?.lastName}
              </h2>
              <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mt-2">
                {userData?.role?.charAt(0).toUpperCase() + userData?.role?.slice(1)}
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
                {recentLogs.length > 0 ? (
                  recentLogs.map((log) => (
                    <div
                      key={log._id}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <p>{log.action.charAt(0).toUpperCase() + log.action.slice(1)} menu</p>
                      <span className="text-gray-400">
                        {format(new Date(log.timestamp), "MMM d, yyyy h:mm a")}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No recent activity</p>
                )}
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
                    {userData?.dob &&
                      format(new Date(userData.dob), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
