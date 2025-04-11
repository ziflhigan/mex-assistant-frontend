import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

// Import page components
// These would be your actual dashboard and chat components
const DashboardPlaceholder = () => <div style={{padding: '20px'}}><h2>Dashboard Content</h2><p>This is where your dashboard would go</p></div>;
const ChatPlaceholder = () => <div style={{padding: '20px'}}><h2>AI Assistant Chat</h2><p>This is where your chat interface would go</p></div>;
const NotificationsPlaceholder = () => <div style={{padding: '20px'}}><h2>Notifications</h2><p>This is where notifications would go</p></div>;
const SettingsPlaceholder = () => <div style={{padding: '20px'}}><h2>Settings</h2><p>This is where settings would go</p></div>;

/**
 * MainPage serves as the container for all app content
 * It sets up routing and manages global state for the app
 */
const MainPage = () => {
  // State for current merchant
  const [selectedMerchantId, setSelectedMerchantId] = useState('5c1f8');
  
  // Sample merchants data
  const merchants = [
    { id: '5c1f8', name: 'Burger Factory (5c1f8)' },
    { id: '2e8a5', name: 'Burger Barn (2e8a5)' },
    { id: '0e1b3', name: 'Chicken Shack (0e1b3)' },
    { id: '1d4f2', name: 'Asian Wok (1d4f2)' },
    { id: 'b9e5f', name: 'Seafood Express (b9e5f)' }
  ];

  // Handle merchant change
  const handleMerchantChange = (merchantId) => {
    setSelectedMerchantId(merchantId);
    // Here you could also load new data for the selected merchant
    console.log(`Merchant changed to ${merchantId}`);
  };
  
  // Handle search
  const handleSearch = (query) => {
    console.log(`Search query: ${query}`);
    // Implement search functionality here
  };

  return (
    <AppLayout
      merchants={merchants}
      selectedMerchantId={selectedMerchantId}
      onMerchantChange={handleMerchantChange}
      onSearch={handleSearch}
      userName="Merchant Admin"
      userAvatar="/api/placeholder/35/35"
      logo="/api/placeholder/40/40"
    >
      <Routes>
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
        <Route path="/chat" element={<ChatPlaceholder />} />
        <Route path="/notifications" element={<NotificationsPlaceholder />} />
        <Route path="/settings" element={<SettingsPlaceholder />} />
        {/* Redirect to dashboard as default */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default MainPage;