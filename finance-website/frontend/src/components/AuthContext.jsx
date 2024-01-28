import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the user is already logged in from localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    // Update localStorage when isLoggedIn changes
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

