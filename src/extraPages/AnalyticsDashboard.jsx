import { useEffect, useState } from 'react';
import API from '../api/api';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics on mount
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await API.get('/api/analytics');
        setAnalytics(response.data);
      } catch (err) {
        setError('Error fetching analytics.');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Utility functions to analyze data
  const getTotalVisits = () => analytics.length;

  const getAverageTimeSpent = () => {
    if (analytics.length === 0) return 0;
    const totalDuration = analytics.reduce((sum, entry) => sum + entry.duration, 0);
    return (totalDuration / analytics.length).toFixed(2);
  };

  const getTopSections = () => {
    const sectionCounts = {};
    analytics.forEach((entry) => {
      entry.viewedSections.forEach((section) => {
        sectionCounts[section] = (sectionCounts[section] || 0) + 1;
      });
    });

    return Object.entries(sectionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Top 5 sections
  };

  const getReferrerSources = () => {
    const referrerCounts = {};
    analytics.forEach((entry) => {
      const source = entry.referrer || 'Direct';
      referrerCounts[source] = (referrerCounts[source] || 0) + 1;
    });

    return Object.entries(referrerCounts).sort((a, b) => b[1] - a[1]);
  };

  if (isLoading) return <p className="text-center mt-8">Loading analytics...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-600">Menu Analytics Dashboard</h1>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-blue-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Visits</h2>
          <p className="text-3xl font-bold">{getTotalVisits()}</p>
        </div>

        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Average Time Spent</h2>
          <p className="text-3xl font-bold">{getAverageTimeSpent()} seconds</p>
        </div>

        <div className="p-6 bg-green-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Unique Referrers</h2>
          <p className="text-3xl font-bold">{getReferrerSources().length}</p>
        </div>
      </div>

      {/* Top Viewed Sections */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-yellow-600">Top Viewed Sections</h2>
        {getTopSections().length === 0 ? (
          <p>No section data available.</p>
        ) : (
          <ul className="list-disc pl-6">
            {getTopSections().map(([section, count], index) => (
              <li key={index} className="text-lg">
                {section}: {count} views
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Referrer Sources */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Referrer Sources</h2>
        {getReferrerSources().length === 0 ? (
          <p>No referrer data available.</p>
        ) : (
          <ul className="list-disc pl-6">
            {getReferrerSources().map(([source, count], index) => (
              <li key={index} className="text-lg">
                {source}: {count} visits
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
