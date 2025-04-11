import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext'; 
import MainPage from './pages/MainPage';
import './styles/index.css'; 

/**
 * Main App component
 * Sets up routing and context providers
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* MainPage handles all sub-routes */}
          <Route path="/*" element={<MainPage />} />

          {/* Redirect base path to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;