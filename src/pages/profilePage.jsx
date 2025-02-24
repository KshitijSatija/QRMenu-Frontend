import { useEffect, useState } from "react";
import API from "../api/api"; // API instance with session-based authentication

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get("/user/profile"); // Fetch user profile
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-center text-xl mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-2xl shadow-lg text-center">
        <div className="mb-4">
          <img
            src="https://via.placeholder.com/120"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-teal-500"
          />
          <h2 className="text-2xl font-semibold mt-2">{user?.firstName} {user?.lastName}</h2>
          <p className="bg-teal-500 text-white text-sm py-1 px-3 rounded-md inline-block mt-2">
            {user?.role.toUpperCase()}
          </p>
        </div>
        <div className="text-left space-y-3">
          <p className="bg-gray-100 p-3 rounded-md"><strong>Username:</strong> {user?.username}</p>
          <p className="bg-gray-100 p-3 rounded-md"><strong>Email:</strong> {user?.email}</p>
          <p className="bg-gray-100 p-3 rounded-md"><strong>Mobile No:</strong> {user?.mobileno}</p>
          <p className="bg-gray-100 p-3 rounded-md">
            <strong>Date of Birth:</strong> {new Date(user?.dob).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
