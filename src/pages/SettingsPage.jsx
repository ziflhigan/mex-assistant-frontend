import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/common/Card';
import LanguageSelector from '../components/chat/LanguageSelector';
import './SettingsPage.css';

function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('personal');
  const [settings, setSettings] = useState({
    personal: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+62 812-3456-7890',
      language: i18n.language,
      timezone: 'Asia/Jakarta',
    },
    business: {
      name: 'Burger Factory',
      type: 'Restaurant',
      address: '123 Main Street, Jakarta, Indonesia',
      operatingHours: {
        start: '09:00',
        end: '22:00'
      },
      currency: 'IDR',
      taxRate: 10,
      deliveryRadius: 5
    },
    notifications: {
      email: true,
      push: true,
      salesAlerts: true,
      lowStockAlerts: true,
      orderNotifications: true,
      customerReviews: true
    },
    preferences: {
      theme: 'system',
      fontSize: 'medium',
      highContrast: false,
      compactMode: false,
      autoRefresh: true,
      refreshInterval: 5
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));

    // Handle language change immediately
    if (category === 'personal' && setting === 'language') {
      handleLanguageChange(value);
    }
  };

  const handleLanguageChange = async (newLanguage) => {
    try {
      await i18n.changeLanguage(newLanguage);
      // Store the language preference in localStorage
      localStorage.setItem('i18nextLng', newLanguage);
      // Update document language
      document.documentElement.lang = newLanguage;
      // Update meta language
      document.querySelector('meta[name="language"]')?.setAttribute('content', newLanguage);
    } catch (error) {
      console.error('Failed to change language:', error);
      setSaveStatus('error');
    }
  };

  const handleNestedSettingChange = (category, subCategory, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: {
          ...prev[category][subCategory],
          [setting]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Apply language change if it was modified
      if (settings.personal.language !== i18n.language) {
        await handleLanguageChange(settings.personal.language);
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to initial state
    setSettings({
      personal: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+62 812-3456-7890',
        language: i18n.language,
        timezone: 'Asia/Jakarta',
      },
      business: {
        name: 'Burger Factory',
        type: 'Restaurant',
        address: '123 Main Street, Jakarta, Indonesia',
        operatingHours: {
          start: '09:00',
          end: '22:00'
        },
        currency: 'IDR',
        taxRate: 10,
        deliveryRadius: 5
      },
      notifications: {
        email: true,
        push: true,
        salesAlerts: true,
        lowStockAlerts: true,
        orderNotifications: true,
        customerReviews: true
      },
      preferences: {
        theme: 'system',
        fontSize: 'medium',
        highContrast: false,
        compactMode: false,
        autoRefresh: true,
        refreshInterval: 5
      }
    });
  };

  const getNotificationIcon = (key) => {
    const icons = {
      email: 'envelope',
      push: 'mobile-alt',
      salesAlerts: 'chart-line',
      lowStockAlerts: 'box',
      orderNotifications: 'shopping-cart',
      customerReviews: 'star'
    };
    return icons[key] || 'bell';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <Card title={t('settings.personal')} icon="fas fa-user">
            <div className="settings-group">
              <div className="settings-input-group">
                <label>
                  <i className="fas fa-user-circle"></i>
                  {t('settings.name')}
                </label>
                <input
                  type="text"
                  value={settings.personal.name}
                  onChange={(e) => handleSettingChange('personal', 'name', e.target.value)}
                  aria-label={t('settings.name')}
                  placeholder={t('settings.name')}
                />
              </div>
              <div className="settings-input-group">
                <label>
                  <i className="fas fa-envelope"></i>
                  {t('settings.email')}
                </label>
                <input
                  type="email"
                  value={settings.personal.email}
                  onChange={(e) => handleSettingChange('personal', 'email', e.target.value)}
                  aria-label={t('settings.email')}
                  placeholder={t('settings.email')}
                />
              </div>
              <div className="settings-input-group">
                <label>
                  <i className="fas fa-phone"></i>
                  {t('settings.phone')}
                </label>
                <input
                  type="tel"
                  value={settings.personal.phone}
                  onChange={(e) => handleSettingChange('personal', 'phone', e.target.value)}
                  aria-label={t('settings.phone')}
                  placeholder={t('settings.phone')}
                />
              </div>
              <div className="settings-input-group">
                <label>
                  <i className="fas fa-language"></i>
                  {t('settings.language')}
                </label>
                <select
                  value={settings.personal.language}
                  onChange={(e) => handleSettingChange('personal', 'language', e.target.value)}
                  aria-label={t('settings.language')}
                >
                  <option value="en">English</option>
                  <option value="id">Bahasa Indonesia</option>
                  <option value="ms">Bahasa Melayu</option>
                  <option value="th">ไทย</option>
                  <option value="vi">Tiếng Việt</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              <div className="settings-input-group">
                <label>
                  <i className="fas fa-globe"></i>
                  {t('settings.timezone')}
                </label>
                <select
                  value={settings.personal.timezone}
                  onChange={(e) => handleSettingChange('personal', 'timezone', e.target.value)}
                  aria-label={t('settings.timezone')}
                >
                  <option value="UTC">{t('settings.timezones.utc')}</option>
                  <option value="Asia/Jakarta">{t('settings.timezones.jakarta')}</option>
                  <option value="Asia/Kuala_Lumpur">{t('settings.timezones.kualaLumpur')}</option>
                  <option value="Asia/Singapore">{t('settings.timezones.singapore')}</option>
                </select>
              </div>
            </div>
          </Card>
        );
      case 'business':
        return (
          <Card title={t('settings.business')} icon="fas fa-store">
          <div className="settings-group">
              <div className="settings-input-group">
              <label>
                  <i className="fas fa-building"></i>
                  {t('settings.businessName')}
                </label>
                <input
                  type="text"
                  value={settings.business.name}
                  onChange={(e) => handleSettingChange('business', 'name', e.target.value)}
                  aria-label={t('settings.businessName')}
                  placeholder={t('settings.businessName')}
                />
              </div>
              <div className="settings-input-group">
                <label>
                  <i className="fas fa-tag"></i>
                  {t('settings.businessType')}
              </label>
                <select
                  value={settings.business.type}
                  onChange={(e) => handleSettingChange('business', 'type', e.target.value)}
                  aria-label={t('settings.businessType')}
                >
                  <option value="Restaurant">{t('settings.businessTypes.restaurant')}</option>
                  <option value="Cafe">{t('settings.businessTypes.cafe')}</option>
                  <option value="Food Stall">{t('settings.businessTypes.foodStall')}</option>
                  <option value="Bakery">{t('settings.businessTypes.bakery')}</option>
                </select>
              </div>
              <div className="settings-input-group">
              <label>
                  <i className="fas fa-map-marker-alt"></i>
                  {t('settings.address')}
              </label>
                <textarea
                  value={settings.business.address}
                  onChange={(e) => handleSettingChange('business', 'address', e.target.value)}
                  aria-label={t('settings.address')}
                  placeholder={t('settings.address')}
                  rows="3"
                />
              </div>
              <div className="settings-input-group">
              <label>
                  <i className="fas fa-clock"></i>
                  {t('settings.operatingHours')}
              </label>
                <div className="time-inputs">
                <input
                    type="time"
                    value={settings.business.operatingHours.start}
                    onChange={(e) => handleNestedSettingChange('business', 'operatingHours', 'start', e.target.value)}
                    aria-label={t('settings.openingTime')}
                  />
                  <span className="time-separator">to</span>
                <input
                    type="time"
                    value={settings.business.operatingHours.end}
                    onChange={(e) => handleNestedSettingChange('business', 'operatingHours', 'end', e.target.value)}
                    aria-label={t('settings.closingTime')}
                  />
            </div>
          </div>
              <div className="settings-input-group">
              <label>
                  <i className="fas fa-money-bill"></i>
                  {t('settings.currency')}
              </label>
                <select
                  value={settings.business.currency}
                  onChange={(e) => handleSettingChange('business', 'currency', e.target.value)}
                  aria-label={t('settings.currency')}
                >
                  <option value="IDR">{t('settings.currencies.idr')}</option>
                  <option value="MYR">{t('settings.currencies.myr')}</option>
                  <option value="SGD">{t('settings.currencies.sgd')}</option>
                </select>
              </div>
            </div>
          </Card>
        );
      case 'notifications':
        return (
          <Card title={t('settings.notifications')} icon="fas fa-bell">
          <div className="settings-group">
            <div className="settings-options">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <label key={key} className="toggle-switch">
                <input
                  type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                      aria-label={t(`settings.${key}`)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">
                      <i className={`fas fa-${getNotificationIcon(key)}`}></i>
                      {t(`settings.${key}`)}
                    </span>
              </label>
                ))}
              </div>
          </div>
        </Card>
        );
      case 'preferences':
        return (
          <Card title={t('settings.preferences')} icon="fas fa-cog">
          <div className="settings-group">
              <div className="settings-input-group">
                <label>
                  <i className="fas fa-palette"></i>
                  {t('settings.theme')}
                </label>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                  aria-label={t('settings.theme')}
                >
                  <option value="light">{t('settings.lightTheme')}</option>
                  <option value="dark">{t('settings.darkTheme')}</option>
                  <option value="system">{t('settings.systemTheme')}</option>
                </select>
              </div>
            <div className="settings-input-group">
                <label>
                  <i className="fas fa-text-height"></i>
                  {t('settings.fontSize')}
                </label>
              <select
                  value={settings.preferences.fontSize}
                  onChange={(e) => handleSettingChange('preferences', 'fontSize', e.target.value)}
                  aria-label={t('settings.fontSize')}
                >
                  <option value="small">{t('settings.small')}</option>
                  <option value="medium">{t('settings.medium')}</option>
                  <option value="large">{t('settings.large')}</option>
              </select>
            </div>
            <div className="settings-options">
                <label className="toggle-switch" title={t('settings.tooltips.highContrast')}>
                <input
                    type="checkbox"
                    checked={settings.preferences.highContrast}
                    onChange={(e) => handleSettingChange('preferences', 'highContrast', e.target.checked)}
                    aria-label={t('settings.highContrast')}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">
                    <i className="fas fa-adjust"></i>
                    {t('settings.highContrast')}
                  </span>
              </label>
                <label className="toggle-switch" title={t('settings.tooltips.compactMode')}>
                <input
                    type="checkbox"
                    checked={settings.preferences.compactMode}
                    onChange={(e) => handleSettingChange('preferences', 'compactMode', e.target.checked)}
                    aria-label={t('settings.compactMode')}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">
                    <i className="fas fa-compress"></i>
                    {t('settings.compactMode')}
                  </span>
              </label>
            </div>
          </div>
        </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>{t('settings.title')}</h1>
      </div>
      
      <div className="settings-container">
        {/* <div className="settings-subtitle">
          {t('settings.subtitle')}
        </div> */}

        <nav className="settings-tabs" role="tablist">
          <button
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
            role="tab"
            aria-selected={activeTab === 'personal'}
            aria-controls="personal-tab"
          >
            <i className="fas fa-user"></i>
            {t('settings.personal')}
          </button>
          <button
            className={`tab-button ${activeTab === 'business' ? 'active' : ''}`}
            onClick={() => setActiveTab('business')}
            role="tab"
            aria-selected={activeTab === 'business'}
            aria-controls="business-tab"
          >
            <i className="fas fa-store"></i>
            {t('settings.business')}
          </button>
          <button
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
            role="tab"
            aria-selected={activeTab === 'notifications'}
            aria-controls="notifications-tab"
          >
            <i className="fas fa-bell"></i>
            {t('settings.notifications')}
          </button>
          <button
            className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
            role="tab"
            aria-selected={activeTab === 'preferences'}
            aria-controls="preferences-tab"
          >
            <i className="fas fa-cog"></i>
            {t('settings.preferences')}
          </button>
        </nav>

        <div className="settings-content" role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
          {renderTabContent()}
          
          <div className="settings-actions">
            <button 
              className="save-button" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  {t('common.saving')}
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  {t('common.save')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {saveStatus === 'success' && (
        <div className="settings-popup success">
          <div className="popup-content">
            <i className="fas fa-check-circle"></i>
            <p>{t('settings.saveSuccess')}</p>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {saveStatus === 'error' && (
        <div className="settings-popup error">
          <div className="popup-content">
            <i className="fas fa-exclamation-circle"></i>
            <p>{t('common.error')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
