import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet} from "react-router-dom";
import API from "../api/api"; 
import Cookies from "js-cookie";
import { FaSpinner, FaUser, FaBell, FaCog, FaSignOutAlt, FaEdit, FaChartLine, FaCalendar, FaTasks, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/fbbb.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="">Food Cart</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <a
              href="/dashboard"
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                location.pathname === "/dashboard" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
              }`}
            >
              <FaUser />
              <span>Dashboard</span>
            </a>
            <a
              href="/menu-dashboard"
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                location.pathname === "/menu-dashboard" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
              }`}
            >
              <FaTasks />
              <span>Menu Section</span>
            </a>
            <a
              href="/menu-logs"
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                location.pathname === "/menu-logs" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
              }`}
            >
              <FaChartLine />
              <span>Change Logs</span>
            </a>
            
            
          </div>
        </nav>
      </div>

      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
            <div className="flex items-center space-x-4">
              <button className="p-3 rounded-full hover:bg-gray-100">
                <FaBell className="text-gray-600" />
              </button>
              
              <button
                onClick={() => navigate("/settings")}
                className={`flex items-center space-x-2 p-3 rounded-full ${
                  location.pathname === "/settings" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                }`}
              >
                <FaCog className="text-gray-600" />
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className={`flex items-center space-x-2 p-3 rounded-full ${
                  location.pathname === "/dashboard" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                }`}
              >
                <FaUserCircle className="text-gray-600" />
              </button>

              

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
        <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Navbar;
