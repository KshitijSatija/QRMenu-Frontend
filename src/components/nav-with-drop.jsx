import { useState, useEffect } from "react";
import API from "../api/api"; 
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaUser, FaBell, FaCog, FaSignOutAlt, FaEdit, FaChartLine, FaCalendar, FaTasks, FaUserCircle  } from "react-icons/fa";
import Cookies from "js-cookie";
import SidebarMenu from "./sidebar";
const Navbar = () => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const validateSession = async () => {
      const sessionHash = Cookies.get("sessionHash");

      if (!sessionHash) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get("/auth/validate-session");
        setUsername(response.data.username);
        setLoading(false);
      } catch (error) {
        console.error("Session validation failed:", error);
        Cookies.remove("sessionHash");
        navigate("/login");
      }
    };

    validateSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      Cookies.remove("sessionHash");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
              <span>Instagram Analytics</span>
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
              <div className="relative">
                <button 
                className="p-2 rounded-full hover:bg-gray-100" 
                onClick={() => setShowSidebar(!showSidebar)}
                >
                <FaUserCircle className="text-gray-600" />
                </button>
                
                {/* Sidebar Dropdown */}
                {showSidebar && (
                <div className="absolute right-0 mt-2 z-50">
                    <SidebarMenu onClose={() => setShowSidebar(false)} onLogout={handleLogout} />
                </div>
                )}
            </div>
              
            <button
                onClick={handleLogout}
                className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-full active:translate-x-1 active:translate-y-1"
            >
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
                </div>
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

export default Navbar;
