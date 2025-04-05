import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

const PublicMenu = () => {
  const { restaurantName } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('stacked');
  const [activeTab, setActiveTab] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [viewedSections, setViewedSections] = useState(new Set());

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get(`/api/menu/${restaurantName}`);
        const data = response.data;
        setMenu(data);
        setViewMode(data.displayMode === 'tabs' || data.displayMode === 'stacked' ? data.displayMode : 'stacked');
        setStartTime(Date.now());
      } catch (err) {
        setError('Menu not found or error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
    return () => sendAnalytics();
  }, [restaurantName]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setViewedSections((prev) => new Set([...prev, menu.sections[index].title]));
  };

  const sendAnalytics = async () => {
    try {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const referrer = document.referrer || 'Direct Visit';
      await API.post('/api/analytics/log', {
        restaurantName,
        duration,
        viewedSections: Array.from(viewedSections),
        referrer,
      });
    } catch (error) {
      console.error('Error sending analytics:', error);
    }
  };

  if (loading) return <p className="text-center text-gray-600 mt-8">Loading menu...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  // Apply background style based on backgroundType
  const backgroundStyle = menu.backgroundType === 'image' && menu.backgroundImage?.data
    ? { backgroundImage: `url(data:${menu.backgroundImage.contentType};base64,${menu.backgroundImage.data})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: menu.backgroundValue || '#ffffff' };

  return (
    <div
      className="max-w-4xl mx-auto p-4 sm:p-8 shadow-lg rounded-lg min-h-screen"
      style={backgroundStyle}
    >
      {/* Header with Logo and Restaurant Name */}
      <div className="text-center mb-6">
        {menu.logo?.data && (
          <img
            src={`data:${menu.logo.contentType};base64,${menu.logo.data}`}
            alt={`${menu.restaurantName} Logo`}
            className="mx-auto mb-4 w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600">
          {menu.restaurantName}'s Menu
        </h1>
      </div>

      {/* View Mode Toggle */}
      <div className="text-right mb-4">
        <button
          onClick={() => setViewMode(viewMode === 'tabs' ? 'stacked' : 'tabs')}
          className="text-sm text-blue-500 underline hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Switch to {viewMode === 'tabs' ? 'Stacked' : 'Tabs'} View
        </button>
      </div>

      {/* Tabs View */}
      {viewMode === 'tabs' && (
        <>
          <div className="flex overflow-x-auto border-b mb-6" role="tablist">
            {menu.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`p-2 sm:px-4 whitespace-nowrap transition duration-300 ${
                  activeTab === index
                    ? 'border-b-4 border-yellow-400 text-yellow-600 font-semibold'
                    : 'text-gray-600 hover:text-yellow-600'
                } focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2`}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`section-${index}`}
                id={`tab-${index}`}
              >
                {section.title}
              </button>
            ))}
          </div>
          <div
            className="grid gap-4"
            role="tabpanel"
            id={`section-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {menu.sections[activeTab]?.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <p className="text-lg sm:text-xl font-semibold text-gray-800">{item.name}</p>
                  {item.description && (
                    <p className="text-sm sm:text-base text-gray-600 mt-1">{item.description}</p>
                  )}
                </div>
                <p className="text-lg sm:text-xl font-bold text-blue-500 mt-2 sm:mt-0">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Stacked View */}
      {viewMode === 'stacked' && (
        menu.sections.map((section, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-bold text-yellow-600 border-b-4 border-yellow-300 pb-2 mb-6">
              {section.title}
            </h2>
            <div className="grid gap-4">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">{item.name}</p>
                    {item.description && (
                      <p className="text-sm sm:text-base text-gray-600 mt-1">{item.description}</p>
                    )}
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-blue-500 mt-2 sm:mt-0">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Social Links */}
      {menu.socialLinks && menu.socialLinks.length > 0 && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Follow Us</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {menu.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline text-sm sm:text-base"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicMenu;