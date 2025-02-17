import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for retrieving cookies

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor to add session hash from cookies
API.interceptors.request.use((config) => {
  const sessionHash = Cookies.get("sessionHash"); // Retrieve session hash from cookies
  if (sessionHash) {
    config.headers.Authorization = `Bearer ${sessionHash}`;
  }
  return config;
});

export default API;
