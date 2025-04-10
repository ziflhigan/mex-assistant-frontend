import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext'; // Assuming AppProvider wraps all contexts
import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import './styles/index.css'; // Import global styles

// TODO: Set up context providers (AppProvider should likely wrap DashboardProvider, ChatProvider)
// TODO: Implement authentication logic wrap routes if needed later
// TODO: Set up i18n provider initialization

function App() {
  return (
    <AppProvider> {/* Provides global context (theme, language, user, merchant) */}
      <Router>
        <Routes>
          {/* MainPage contains the layout (Header, Sidebar, MainContent) and nested routes */}
          <Route path="/*" element={<MainPage />} />

          {/* Define explicit routes if MainPage doesn't handle all sub-routes */}
          {/* Example: Maybe settings is a full page replacement */}
           {/* <Route path="/settings" element={<SettingsPage />} /> */}
           {/* <Route path="/notifications" element={<NotificationsPage />} /> */}

           {/* Redirect base path to dashboard */}
           {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}

        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;