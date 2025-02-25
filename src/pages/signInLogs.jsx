import React, { useEffect, useState } from "react";
import API from "../api/api"; // Import the configured Axios instance

const SignInLogs = () => {
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
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Sign-In Logs</h2>

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
  );
};

export default SignInLogs;
