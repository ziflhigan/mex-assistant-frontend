import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { DashboardProvider } from '../contexts/DashboardContext';
import AppLayout from '../components/layout/AppLayout';
import DashboardContainer from '../components/dashboard/DashboardContainer';
import ChatContainer from '../components/chat/ChatContainer';
import SettingsPage from './SettingsPage';
import NotificationsPage from './NotificationsPage';

/**
 * MainPage is the root page component
 * It uses AppLayout for consistent structure and navigation
 */
const MainPage = () => {
  const {
    merchants,
    selectedMerchantId,
    selectMerchant,
    user,
    isMobileSidebarOpen,
    toggleMobileSidebar,
    closeMobileSidebar
  } = useAppContext();

  // Handle search function
  const handleSearch = (query) => {
    console.log(`Search query: ${query}`);
    // Implement search functionality
  };

  return (
      // Wrap entire app in DashboardProvider to make it available everywhere
      <DashboardProvider>
        <AppLayout
            merchants={merchants}
            selectedMerchantId={selectedMerchantId}
            onMerchantChange={selectMerchant}
            userName={user.name}
            userAvatar={user.avatar}
            onSearch={handleSearch}
            isMobileOpen={isMobileSidebarOpen}
            onMobileToggle={toggleMobileSidebar}
            onMobileClose={closeMobileSidebar}
        >
          <Routes>
            <Route path="dashboard" element={<DashboardContainer />} />
            <Route path="chat" element={<ChatContainer />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            {/* Default route */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </AppLayout>
      </DashboardProvider>
  );
};

export default MainPage;