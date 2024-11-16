import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus } from '../services/authService';
import { logoutUser } from '../services/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const data = await checkAuthStatus();
        if (data.authenticated) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to check auth status:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const login = (userData) => {
    console.log('Login function called with:', userData); // Debugging
    setUser(userData);
    window.location.replace('/dashboard')
  };
  
  

  const logout = async () => {
    try {
      await logoutUser(); // Call backend to clear cookie
      setUser(null);      // Clear user state
      navigate('/login'); // Redirect to login
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
