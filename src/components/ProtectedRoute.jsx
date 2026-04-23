import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  console.log('Checking currentUser in ProtectedRoute:', currentUser);  // Cek apakah currentUser sudah terisi dengan accessToken

  if (!currentUser || !currentUser.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;