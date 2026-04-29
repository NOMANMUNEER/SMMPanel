import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setCurrentUser(res.data);
          setRole(res.data.role);
        } catch (error) {
          console.error('Auth error', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setCurrentUser(userData);
    setRole(userData.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, role, login, logout, loading, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
