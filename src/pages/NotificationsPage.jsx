import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

/**
 * Simple placeholder for the Notifications page
 */
const NotificationsPage = () => {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Inventory Alert',
      message: 'Your Cheesy Bacon Fries are running low on stock. Consider restocking soon.',
      date: '10 Apr 2025',
      time: '09:45 AM',
      isRead: false
    },
    {
      id: 2,
      type: 'insight',
      title: 'Sales Milestone',
      message: 'Congratulations! You\'ve reached 10,000 total orders this month.',
      date: '09 Apr 2025',
      time: '02:30 PM',
      isRead: true
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Menu Recommendation',
      message: 'Based on search trends, adding "Fried Spring Rolls" to your menu could increase orders by up to 15%.',
      date: '08 Apr 2025',
      time: '11:15 AM',
      isRead: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Preparation Time Alert',
      message: 'Your average preparation time has increased by 20% in the last week. Check your kitchen workflow.',
      date: '07 Apr 2025',
      time: '04:20 PM',
      isRead: false
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'The MEX Assistant has been updated with new features. Check the What\'s New section.',
      date: '06 Apr 2025',
      time: '10:00 AM',
      isRead: true
    }
  ];

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return <i className="fas fa-exclamation-circle" style={{ color: '#e74c3c' }}></i>;
      case 'insight':
        return <i className="fas fa-chart-line" style={{ color: '#3498db' }}></i>;
      case 'recommendation':
        return <i className="fas fa-lightbulb" style={{ color: '#f1c40f' }}></i>;
      case 'system':
        return <i className="fas fa-cog" style={{ color: '#7f8c8d' }}></i>;
      default:
        return <i className="fas fa-bell" style={{ color: '#2ecc71' }}></i>;
    }
  };

  return (
    <div className="notifications-page">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>Notifications</h2>
        <div>
          <Button variant="text" style={{ marginRight: '10px' }}>
            Mark All as Read
          </Button>
          <Button variant="outlined">
            Settings
          </Button>
        </div>
      </div>
      
      <Card noPadding>
        {notifications.map((notification, index) => (
          <div 
            key={notification.id} 
            style={{
              padding: '15px 20px',
              borderBottom: index < notifications.length - 1 ? '1px solid #f0f0f0' : 'none',
              backgroundColor: notification.isRead ? 'transparent' : 'rgba(0, 177, 79, 0.05)',
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#f5f5f5', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '15px',
              flexShrink: 0
            }}>
              {getNotificationIcon(notification.type)}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '5px' 
              }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                  {notification.title}
                  {!notification.isRead && (
                    <span style={{ 
                      display: 'inline-block', 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--grab-green, #00b14f)', 
                      marginLeft: '8px' 
                    }}></span>
                  )}
                </h4>
                <div style={{ fontSize: '12px', color: '#777' }}>
                  {notification.date} at {notification.time}
                </div>
              </div>
              
              <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
                {notification.message}
              </p>
              
              <div style={{ marginTop: '10px' }}>
                <Button 
                  variant="text" 
                  size="small" 
                  style={{ padding: '2px 0' }}
                >
                  {notification.isRead ? 'Mark as Unread' : 'Mark as Read'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Card>
      
      {/* Load More Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="outlined">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default NotificationsPage;