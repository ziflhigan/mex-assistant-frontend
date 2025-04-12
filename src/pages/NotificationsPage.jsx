import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/common/Card';
import './NotificationsPage.css';

function NotificationsPage() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      category: 'orders',
      title: t('notifications.dummy.highSales.title'),
      message: t('notifications.dummy.highSales.message'),
      timestamp: new Date(),
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      category: 'inventory',
      title: t('notifications.dummy.newFeature.title'),
      message: t('notifications.dummy.newFeature.message'),
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      priority: 'low'
    },
    {
      id: 3,
      type: 'warning',
      category: 'payments',
      title: t('notifications.dummy.lowStock.title'),
      message: t('notifications.dummy.lowStock.message'),
      timestamp: new Date(Date.now() - 7200000),
      read: false,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'alert',
      category: 'orders',
      title: t('notifications.dummy.paymentFailed.title'),
      message: t('notifications.dummy.paymentFailed.message'),
      timestamp: new Date(Date.now() - 86400000),
      read: false,
      priority: 'high'
    },
    {
      id: 5,
      type: 'info',
      category: 'inventory',
      title: t('notifications.dummy.newOrder.title'),
      message: t('notifications.dummy.newOrder.message'),
      timestamp: new Date(Date.now() - 172800000),
      read: true,
      priority: 'medium'
    },
    {
      id: 6,
      type: 'warning',
      category: 'payments',
      title: t('notifications.dummy.refundRequest.title'),
      message: t('notifications.dummy.refundRequest.message'),
      timestamp: new Date(Date.now() - 259200000),
      read: false,
      priority: 'high'
    }
  ]);

  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    search: ''
  });

  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter and sort notifications
  const filteredNotifications = notifications
    .filter(notification => {
      const matchesCategory = filters.category === 'all' || notification.category === filters.category;
      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'read' ? notification.read : !notification.read);
      const matchesSearch = !filters.search || 
        notification.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        notification.message.toLowerCase().includes(filters.search.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'timestamp') {
        return sortOrder === 'desc' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sortOrder === 'desc' ? 
          priorityOrder[b.priority] - priorityOrder[a.priority] : 
          priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  }, []);

  const deleteNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new notification
      if (Math.random() > 0.7) {
        const dummyNotifications = [
          {
            title: t('notifications.dummy.realtime.newOrder.title'),
            message: t('notifications.dummy.realtime.newOrder.message'),
            type: 'info',
            category: 'orders',
            priority: 'medium'
          },
          {
            title: t('notifications.dummy.realtime.lowStock.title'),
            message: t('notifications.dummy.realtime.lowStock.message'),
            type: 'warning',
            category: 'inventory',
            priority: 'high'
          },
          {
            title: t('notifications.dummy.realtime.payment.title'),
            message: t('notifications.dummy.realtime.payment.message'),
            type: 'alert',
            category: 'payments',
            priority: 'high'
          }
        ];

        const newNotification = {
          ...dummyNotifications[Math.floor(Math.random() * dummyNotifications.length)],
          id: Date.now(),
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [t]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return 'fas fa-bell';
      case 'info':
        return 'fas fa-info-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      default:
        return 'fas fa-bell';
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>{t('notifications.title')}</h1>
        <div className="notifications-actions">
          <button className="mark-all-read" onClick={markAllAsRead}>
            {t('notifications.actions.markAllRead')}
          </button>
          <button className="clear-all" onClick={clearAll}>
            {t('notifications.actions.clearAll')}
          </button>
        </div>
      </div>

      <div className="notifications-filters">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder={t('notifications.search.placeholder')}
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>

        <div className="filter-options">
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="all">{t('notifications.filters.categories.all')}</option>
            <option value="orders">{t('notifications.filters.categories.orders')}</option>
            <option value="inventory">{t('notifications.filters.categories.inventory')}</option>
            <option value="payments">{t('notifications.filters.categories.payments')}</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="all">{t('notifications.filters.status.all')}</option>
            <option value="unread">{t('notifications.filters.status.unread')}</option>
            <option value="read">{t('notifications.filters.status.read')}</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="timestamp">{t('notifications.sort.byDate')}</option>
            <option value="priority">{t('notifications.sort.byPriority')}</option>
          </select>

          <button
            className="sort-order"
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            aria-label={t('notifications.sort.toggleOrder')}
          >
            <i className={`fas fa-sort-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
          </button>
        </div>
      </div>

      <div className={`notifications-list ${isRefreshing ? 'refreshing' : ''}`}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <Card 
              key={notification.id} 
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
              data-type={notification.type}
            >
              <div className="notification-content">
                <div className="notification-icon">
                  <i className={getNotificationIcon(notification.type)}></i>
                </div>
                <div className="notification-details">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="mark-read"
                      aria-label={t('notifications.actions.markAsRead')}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="delete"
                    aria-label={t('notifications.actions.delete')}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="notifications-empty">
            <i className="fas fa-bell-slash"></i>
            <p>{t('notifications.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;