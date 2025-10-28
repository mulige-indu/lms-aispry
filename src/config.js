// API Configuration
// Automatically uses production URL when deployed, localhost when developing

const getApiBaseUrl = () => {
  // If running in production (on Vercel/Netlify), use environment variable
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // If deployed but no env var set, try to detect production
  if (window.location.hostname !== 'localhost') {
    // Replace this with your actual Render backend URL after deployment
    return 'https://lms-backend-xxxx.onrender.com/api';
  }

  // Local development
  return 'http://localhost:8080/api';
};

export const API_BASE_URL = getApiBaseUrl();

export default {
  API_BASE_URL
};
