import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

/**
 * Simple placeholder for the Settings page
 */
const SettingsPage = () => {
  return (
    <div className="settings-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Settings</h2>
      
      <Card 
        title="Account Settings" 
        style={{ marginBottom: '20px' }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Profile Information</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Name</label>
              <input 
                type="text" 
                defaultValue="Merchant Admin" 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '4px' 
                }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Email</label>
              <input 
                type="email" 
                defaultValue="admin@example.com" 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '4px' 
                }} 
              />
            </div>
          </div>
          <Button>Update Profile</Button>
        </div>
      </Card>
      
      <Card 
        title="Preferences"
        style={{ marginBottom: '20px' }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Language</h4>
          <select 
            defaultValue="en" 
            style={{ 
              padding: '8px 12px', 
              border: '1px solid #e0e0e0', 
              borderRadius: '4px', 
              width: '200px' 
            }}
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="th">Thai</option>
            <option value="vi">Vietnamese</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Notifications</h4>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input type="checkbox" id="email-notifications" defaultChecked />
            <label htmlFor="email-notifications" style={{ marginLeft: '10px' }}>
              Email Notifications
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" id="app-notifications" defaultChecked />
            <label htmlFor="app-notifications" style={{ marginLeft: '10px' }}>
              In-App Notifications
            </label>
          </div>
        </div>
        
        <Button>Save Preferences</Button>
      </Card>
      
      <Card 
        title="Advanced Settings"
        style={{ marginBottom: '20px' }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Data Export</h4>
          <p style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
            Download all your business data in CSV format.
          </p>
          <Button variant="outlined">Export Data</Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;