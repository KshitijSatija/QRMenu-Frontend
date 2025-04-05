import { useState, useEffect } from 'react';
import API from '../api/api';
import QRCodeGenerator from '../components/QRCodeGenerator';

const MenuDashboard = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [displayName, setDisplayName] = useState(''); // Added displayName state
  const [sections, setSections] = useState([{ title: '', items: [{ name: '', description: '', price: '' }] }]);
  const [displayMode, setDisplayMode] = useState('stacked');
  const [menuURL, setMenuURL] = useState('');
  const [menuId, setMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [backgroundType, setBackgroundType] = useState('color');
  const [backgroundValue, setBackgroundValue] = useState('#ffffff');
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState('');
  const [socialLinks, setSocialLinks] = useState([{ name: '', url: '' }]);

  useEffect(() => {
    fetchUserAndMenu();
  }, []);

  const fetchUserAndMenu = async () => {
    try {
      setIsLoading(true);
      const menuResponse = await API.get('/api/menu/my-menu');
      if (menuResponse.data) {
        const { _id, sections, displayMode, restaurantName, displayName, logo, backgroundType, backgroundValue, backgroundImage, socialLinks } = menuResponse.data;
        setRestaurantName(restaurantName);
        setDisplayName(displayName || restaurantName); // Set displayName, fallback to restaurantName
        setMenuURL(`https://yourwebsite.com/restaurant/${restaurantName}`);
        setSections(sections || [{ title: '', items: [{ name: '', description: '', price: '' }] }]);
        setDisplayMode(displayMode || 'stacked');
        setMenuId(_id);
        setBackgroundType(backgroundType || 'color');
        setBackgroundValue(backgroundValue || '#ffffff');
        setSocialLinks(socialLinks || [{ name: '', url: '' }]);
        if (logo && logo.data) setLogoPreview(`data:${logo.contentType};base64,${logo.data}`);
        if (backgroundImage && backgroundImage.data) setBackgroundImagePreview(`data:${backgroundImage.contentType};base64,${backgroundImage.data}`);
      }
    } catch (error) {
      console.error('Error fetching user/menu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSection = () => {
    setSections([...sections, { title: '', items: [{ name: '', description: '', price: '' }] }]);
  };

  const deleteSection = (sectionIndex) => {
    setSections(sections.filter((_, index) => index !== sectionIndex));
  };

  const addItem = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].items.push({ name: '', description: '', price: '' });
    setSections(newSections);
  };

  const deleteItem = (sectionIndex, itemIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].items.splice(itemIndex, 1);
    setSections(newSections);
  };

  const handleChange = (sectionIndex, itemIndex, field, value) => {
    const newSections = [...sections];
    if (itemIndex === null) {
      newSections[sectionIndex][field] = value;
    } else {
      newSections[sectionIndex].items[itemIndex][field] = value;
    }
    setSections(newSections);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBackgroundImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImageFile(file);
      setBackgroundImagePreview(URL.createObjectURL(file));
    }
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { name: '', url: '' }]);
  };

  const deleteSocialLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index][field] = value;
    setSocialLinks(newSocialLinks);
  };

  const submitMenu = async () => {
    try {
      const formData = new FormData();
      formData.append('sections', JSON.stringify(sections));
      formData.append('displayMode', displayMode);
      formData.append('backgroundType', backgroundType);
      formData.append('backgroundValue', backgroundValue);
      formData.append('socialLinks', JSON.stringify(socialLinks));
      formData.append('displayName', displayName); // Added displayName to formData
      if (logoFile) formData.append('logo', logoFile);
      if (backgroundType === 'image' && backgroundImageFile) formData.append('backgroundImage', backgroundImageFile);

      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      let response;
      if (menuId) {
        response = await API.put(`/api/menu/${menuId}`, formData);
        alert('Menu updated successfully');
      } else {
        response = await API.post('/api/menu', formData);
        alert('Menu created successfully');
        setMenuId(response.data.menu._id); // Adjust based on your API response
      }
      await fetchUserAndMenu();
    } catch (error) {
      console.error('Error saving menu:', error.response?.data || error.message);
      alert('Error saving menu');
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto p-8 gap-8">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-8">Menu Dashboard</h1>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Restaurant Menu Url:</label>
          <input
            type="text"
            value={`https://qrmenu-22bbs0041.vercel.app/restaurant/${restaurantName}`}

            disabled
            className="p-2 border rounded-md w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter display name"
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Restaurant Logo:</label>
          {logoPreview && <img src={logoPreview} alt="Logo" className="w-32 h-32 object-cover mb-2" />}
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="p-2 border rounded-md w-full" />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Background:</label>
          <select
            value={backgroundType}
            onChange={(e) => setBackgroundType(e.target.value)}
            className="p-2 border rounded-md mb-2"
          >
            <option value="color">Color</option>
            <option value="image">Image</option>
          </select>
          {backgroundType === 'color' ? (
            <input
              type="text"
              placeholder="Background Color (e.g., #ffffff)"
              value={backgroundValue}
              onChange={(e) => setBackgroundValue(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
          ) : (
            <div>
              {backgroundImagePreview && (
                <img src={backgroundImagePreview} alt="Background" className="w-full h-32 object-cover mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
                className="p-2 border rounded-md w-full"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Social Links:</label>
          {socialLinks.map((link, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Name (e.g., Facebook)"
                value={link.name}
                onChange={(e) => handleSocialLinkChange(index, 'name', e.target.value)}
                className="p-2 border rounded-md flex-1"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                className="p-2 border rounded-md flex-1"
              />
              <button
                onClick={() => deleteSocialLink(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={addSocialLink} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Social Link
          </button>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Menu Display Mode:</label>
          <select
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="stacked">Stacked View</option>
            <option value="tabs">Tabbed View</option>
          </select>
        </div>

        {isLoading ? (
          <p>Loading your menu...</p>
        ) : (
          sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8 border rounded-lg p-6 shadow-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Section Title"
                  value={section.title}
                  onChange={(e) => handleChange(sectionIndex, null, 'title', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <button
                  onClick={() => deleteSection(sectionIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-4"
                >
                  Delete Section
                </button>
              </div>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) => handleChange(sectionIndex, itemIndex, 'name', e.target.value)}
                    className="p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => handleChange(sectionIndex, itemIndex, 'description', e.target.value)}
                    className="p-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => handleChange(sectionIndex, itemIndex, 'price', e.target.value)}
                    className="p-2 border rounded-md"
                  />
                  <button
                    onClick={() => deleteItem(sectionIndex, itemIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete Item
                  </button>
                </div>
              ))}
              <button
                onClick={() => addItem(sectionIndex)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Item
              </button>
            </div>
          ))
        )}

        <div className="flex gap-4">
          <button
            onClick={addSection}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Add Section
          </button>
          <button
            onClick={submitMenu}
            className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600"
          >
            {menuId ? 'Update Menu' : 'Submit Menu'}
          </button>
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-md h-full overflow-auto">
        <h2 className="text-2xl font-semibold mb-6">{displayName || restaurantName} - Live Menu Preview ({displayMode} View)</h2>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-xl font-bold mb-4">{section.title || 'Section Title'}</h3>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-2 flex justify-between">
                <p className="text-lg font-medium">
                  {item.name || 'Item Name'} - ₹{item.price || '0.00'}
                </p>
                {item.description && <p className="text-gray-600">{item.description}</p>}
              </div>
            ))}
          </div>
        ))}
        <QRCodeGenerator url={menuURL} />
      </div>
    </div>
  );
};

export default MenuDashboard;