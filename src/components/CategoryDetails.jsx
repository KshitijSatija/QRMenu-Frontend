import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

const CategoryDetails = () => {
  const { restaurantName, categoryId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(parseInt(categoryId, 10));

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get(`/api/menu/${restaurantName}`);
        setMenu(response.data);
        setCurrentCategoryIndex(parseInt(categoryId, 10));
      } catch (err) {
        setError('Menu not found or error fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [restaurantName, categoryId]);

  const handleCategoryChange = (index) => {
    setCurrentCategoryIndex(index);
    navigate(`/restaurant/${restaurantName}/category/${index}`);
  };

  if (loading) return <p className="text-center text-gray-600 mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  const backgroundStyle = menu.backgroundType === 'image' && menu.backgroundImage?.data
    ? { backgroundImage: `url(data:${menu.backgroundImage.contentType};base64,${menu.backgroundImage.data})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: menu.backgroundValue || '#ffffff' };

  return (
    <div className="min-h-screen flex flex-col" style={backgroundStyle}>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex items-center justify-center z-10">
        {menu.logo?.data && (
          <img
            src={`data:${menu.logo.contentType};base64,${menu.logo.data}`}
            alt={`${menu.restaurantName} Logo`}
            className="w-12 h-12 object-contain mr-4"
          />
        )}
        <h1 className="text-2xl font-bold text-blue-600">{menu.displayName}</h1>
      </div>

      {/* Category Content */}
      <div className="flex-1 mt-20 mb-20 px-4 sm:px-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-yellow-600 border-b-4 border-yellow-300 pb-2 mb-6">
          {menu.sections[currentCategoryIndex].title}
        </h2>
        <div className="grid gap-4">
          {menu.sections[currentCategoryIndex].items.map((item, index) => (
            <div
              key={index}
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-center gap-4 flex-wrap z-10">
        {menu.sections.map((section, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(index)}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
              currentCategoryIndex === index
                ? 'bg-yellow-400 text-white font-semibold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-all duration-200`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;