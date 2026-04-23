import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('accessToken');
    return token ? { accessToken: token } : null;
  });

  useEffect(() => {
    if (currentUser && currentUser.accessToken) {
      localStorage.setItem('accessToken', currentUser.accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setUser: setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;