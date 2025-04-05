import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

const PublicMenuLanding = () => {
  const { restaurantName } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get(`/api/menu/${restaurantName}`);
        setMenu(response.data);
      } catch (err) {
        setError('Menu not found or error fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [restaurantName]);

  const handleCategoryClick = (categoryIndex) => {
    navigate(`/restaurant/${restaurantName}/category/${categoryIndex}`);
  };

  if (loading) return <p className="text-center text-gray-600 mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  const backgroundStyle = menu.backgroundType === 'image' && menu.backgroundImage?.data
    ? { backgroundImage: `url(data:${menu.backgroundImage.contentType};base64,${menu.backgroundImage.data})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: menu.backgroundValue || '#ffffff' };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-8" style={backgroundStyle}>
      {/* Logo and Restaurant Name */}
      <div className="text-center mt-10">
        {menu.logo?.data && (
          <img
            src={`data:${menu.logo.contentType};base64,${menu.logo.data}`}
            alt={`${menu.restaurantName} Logo`}
            className="mx-auto w-32 h-32 sm:w-48 sm:h-48 object-contain mb-4"
          />
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600">{menu.displayName}</h1>
      </div>

      {/* Categories */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Menu Categories</h2>
        <div className="grid gap-4 w-full">
          {menu.sections.map((section, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(index)}
              className="p-4 bg-white rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all duration-200 text-left"
            >
              <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Social Links */}
      {menu.socialLinks && menu.socialLinks.length > 0 && (
        <div className="mt-8 mb-4 text-center">
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

export default PublicMenuLanding;