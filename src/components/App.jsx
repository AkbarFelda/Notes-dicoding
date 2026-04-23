import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import HomePage from '../pages/HomePage';
import ProtectedRoute from '../components/ProtectedRoute';
import NoteDetail from '../pages/NoteDetail';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
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
      </Routes>
    </AuthProvider>
  );
}

export default App;