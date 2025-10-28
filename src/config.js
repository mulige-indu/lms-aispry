// API Configuration
// Automatically uses production URL when deployed, localhost when developing

const getApiBaseUrl = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'http://localhost:8080/api';
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
