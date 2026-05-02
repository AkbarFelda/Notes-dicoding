import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import HomePage from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';
import NoteDetail from '../pages/NoteDetail';
import AddNotePage from '../pages/AddNotePage';
import { getAccessToken } from '../utils/network-data';

function App() {
  const token = getAccessToken();
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }
        />
        <Route path="/notes/:id" element={
          <ProtectedRoute>
            <NoteDetail />
          </ProtectedRoute>
        }
        />
        <Route path="/notes/new" element={
          <ProtectedRoute>
            <AddNotePage />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;