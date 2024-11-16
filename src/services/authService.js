import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';
axios.defaults.withCredentials = true; // Ensure credentials are included in requests

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const signupUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/signup`, credentials);
  return response.data;
};

export const checkAuthStatus = async () => {
  const response = await axios.get(`${API_URL}/status`, {
    withCredentials: true,
  });
  return response.data;
};

export const logoutUser = async () => {
    const response = await axios.get(`${API_URL}/logout`, {
      withCredentials: true, // Include cookies in the request
    });
    return response.data;
  };
  
  export const getMatches = async (userId) => {
    const response = await axios.get(`http://localhost:8080/api/profile/matches/${userId}`, {
      withCredentials: true,
    });
  
    // Validate and return the matches array
    if (response.data && response.data.matches) {
      return response.data.matches; // Ensure you return the correct matches array
    }
  };
  
  
