import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setCurrUser({ _id: decoded._id, username: decoded.username });
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUserFromToken();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setCurrUser(response.data.user);
      return { success: true, ...response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed." };
    }
  };

  const signup = async (email, username, password) => {
    try {
      const response = await api.post('/users/signup', { email, username, password });
      return { success: true, ...response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Signup failed." };
    }
  };

  const verifyEmail = async (email, code) => {
    try {
      const response = await api.post('/users/verify-email', { email, code });
      localStorage.setItem('token', response.data.token);
      setCurrUser(response.data.user);
      return { success: true, ...response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Verification failed." };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrUser(null);
  };


    const forgotPassword = async (email, username) => {
    try {
      const { data } = await api.post('/users/forgot-password', { email, username });
      return { success: true, ...data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to send reset code.' };
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    try {
      const { data } = await api.post('/users/reset-password', { email, code, newPassword });
      // server returns token + user so we treat it like a login
      localStorage.setItem('token', data.token);
      setCurrUser(data.user);
      return { success: true, ...data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Password reset failed.' };
    }
  };

  const value = {
    currUser,
    loading,
    api,
    login,
    signup,
    verifyEmail,
    forgotPassword,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
