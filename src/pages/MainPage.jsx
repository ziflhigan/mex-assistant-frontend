import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';
import DashboardContainer from '../components/dashboard/DashboardContainer';
import ChatContainer from '../components/chat/ChatContainer';
import SettingsPage from './SettingsPage'; // Placeholder pages
import NotificationsPage from './NotificationsPage'; // Placeholder pages

// This component renders the main layout and switches content based on the route
// TODO: Handle mobile sidebar toggle state and pass down the toggle function
// TODO: Ensure correct layout styling (Grid setup from original HTML) is applied

const MainPage = () => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const handleMenuToggle = () => {
        setMobileSidebarOpen(!isMobileSidebarOpen);
    };

    // Apply grid layout styles here or in a parent div/App.css
    const layoutStyle = {
        display: 'grid',
        // Define grid template based on CSS in mockup (adjust for mobile state)
        gridTemplateColumns: 'var(--sidebar-width) 1fr', // Desktop default
        gridTemplateRows: 'var(--header-height) 1fr',
        gridTemplateAreas: `"sidebar header" "sidebar main"`,
        minHeight: '100vh',
        // Add media queries or conditional styles for mobile layout
    };

  return (
    <div style={layoutStyle}> {/* Apply layout styles */}
      <Header onMenuToggle={handleMenuToggle} />
      <Sidebar isMobileOpen={isMobileSidebarOpen} /> {/* Pass state for mobile */}
      <MainContent>
        {/* Nested Routes determine what's shown in the MainContent area */}
        <Routes>
          <Route path="dashboard" element={<DashboardContainer />} />
          <Route path="chat" element={<ChatContainer />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          {/* Default route within MainPage */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Routes>
      </MainContent>
    </div>
  );
};

export default MainPage;