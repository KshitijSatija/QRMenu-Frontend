import React, { useState, useRef, useEffect } from "react";
import { FiUpload, FiTrash2, FiAlertTriangle, FiCheck, FiX } from "react-icons/fi";
import API from "../api/api";
import profilePlaceholder from "../assets/profile.svg";
import Cookies from "js-cookie";
const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = ["Account", "Notifications", "Billing", "Login Logs"];
  return (
    <nav className="mb-8">
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("Account");

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
   
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(profilePlaceholder);
  

  const [deactivateConfirm, setdeactivateConfirm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [agreeToDeactivate, setagreeToDeactivate] = useState(false);
  const fileInputRef = useRef(null);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const validatePasswords = () => {
    return passwords.new && passwords.confirm && passwords.new === passwords.confirm;
  };

  const handleChangePassword = async () => {
    if (!validatePasswords()) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await API.post("/auth/change-password", {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      console.log("Yes")

      if (response.data.success) {
        setMessage("Password updated successfully.");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        setMessage(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await API.post("/auth/delete-account");
      
      alert("Account Deactivated Successfully!");
      // Optionally, log the user out after deactivation
      Cookies.remove("sessionHash");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to delete account.");
    }
  };
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSignInLogs = async () => {
      try {
        const response = await API.get("/user/signin-logs");
        setLogs(response.data.logins);
      } catch (err) {
        setError("Failed to load sign-in logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSignInLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto max-h-[500px] p-4">
        {activeTab === "Account" && (
          <div className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Save Changes
              </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Profile Picture</h2>
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  <img
                    className="h-24 w-24 object-cover rounded-full"
                    src={avatarPreview}
                    alt="Profile"
                  />
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
                  >
                    <FiUpload className="mr-2" />
                    Upload Photo
                  </button>
                  <p className="mt-2 text-sm text-gray-500">JPG, GIF or PNG. Max size 1MB.</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                disabled={!validatePasswords()}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
              {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Log Out Other Sessions</h2>
              <p className="text-gray-600 mb-4">This will log you out from all other devices except this one.</p>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Log Out Other Sessions
              </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-red-600">Deactivate Account</h2>
              <div className="bg-red-50 p-4 rounded-md mb-4">
                <div className="flex items-center">
                  <FiAlertTriangle className="text-red-600 mr-3" size={24} />
                  <p className="text-red-600">This action cannot be undone. All your data will be deactivated.</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="deactivateConfirm"
                  checked={agreeToDeactivate}
                  onChange={(e) => setagreeToDeactivate(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="deactivateConfirm" className="ml-2 text-gray-700">
                  I understand that this action is irreversible for a certain period of time.
                </label>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={!agreeToDeactivate}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
        </div>
        {activeTab === "Notifications" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
            <p className="text-gray-600">Configure your notification settings here.</p>
          </div>
        )}

        {activeTab === "Billing" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
            <p className="text-gray-600">Manage your billing details and subscription.</p>
          </div>
        )}
        
        {activeTab === "Login Logs" && (
          <div className="max-w-3xl mx-auto ">
          
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : logs.length === 0 ? (
            <p className="text-center text-gray-500">No successful login attempts found.</p>
          ) : (
            <div className="border border-gray-300 rounded-lg shadow-lg">
              {/* Fixed height and scrollable table */}
              <div className="max-h-130 overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-800 text-white sticky top-0">
                    <tr>
                      <th className="px-4 py-2 border border-gray-300 text-left">S.No.</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">IP Address</th>
                      <th className="px-4 py-2 border border-gray-300 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, index) => (
                      <tr key={index} className="odd:bg-gray-100 even:bg-white">
                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-300">{log.ipAddress}</td>
                        <td className="px-4 py-2 border border-gray-300">
                            {new Date(log.timestamp).toISOString().replace("T", " ").split(".")[0]}
                        </td>
    
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Account Deletion</h3>
            <p className="text-gray-600 mb-4">Please type "DEACTIVATE" to confirm account deactivation:</p>
            <input
              type="text"
              value={deactivateConfirm}
              onChange={(e) => setdeactivateConfirm(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deactivateConfirm !== "DEACTIVATE"}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to log out from all other devices?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                }}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;