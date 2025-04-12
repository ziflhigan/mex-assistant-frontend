import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDashboard } from '../../contexts/DashboardContext';

/**
 * MerchantSelector.jsx component for switching between merchant accounts
 * Used in the sidebar footer to allow users to switch between different merchant profiles
 */
const MerchantSelector = ({
                            merchants = [],
                            selectedMerchantId: propSelectedMerchantId,
                            onChange: propOnChange,
                            label = 'Merchant ID',
                            className = '',
                            style = {},
                            ...props
                          }) => {
  // Default merchants for the prototype
  const defaultMerchants = [
    { id: '5c1f8', name: 'Burger Factory 5c1f8' },
    { id: '2e8a5', name: 'Burger Barn 2e8a5' },
    { id: '0e1b3', name: 'Chicken Shack 0e1b3' },
    { id: '1d4f2', name: 'Asian Wok 1d4f2' },
    { id: 'b9e5f', name: 'Seafood Express (b9e5f)' }
  ];

  // Local state for the selected merchant (used when outside of DashboardProvider)
  const [localSelectedMerchantId, setLocalSelectedMerchantId] = useState(propSelectedMerchantId || '5c1f8');

  // Try to use the dashboard context, but don't fail if it's not available
  let dashboardContext;
  try {
    dashboardContext = useDashboard();
  } catch (error) {
    // Dashboard context not available, will use props/local state instead
    dashboardContext = null;
  }

  // Use the merchants from props or defaults
  const merchantsList = merchants.length > 0 ? merchants : defaultMerchants;

  // Determine the initially selected merchant ID
  const initialMerchantId = dashboardContext?.selectedMerchant?.id ||
      propSelectedMerchantId ||
      localSelectedMerchantId ||
      (merchantsList.length > 0 ? merchantsList[0].id : '');

  // Update local state when props change
  useEffect(() => {
    if (propSelectedMerchantId && propSelectedMerchantId !== localSelectedMerchantId) {
      setLocalSelectedMerchantId(propSelectedMerchantId);
    }
  }, [propSelectedMerchantId, localSelectedMerchantId]);

  const handleChange = (e) => {
    const newMerchantId = e.target.value;

    // Find the merchant object that corresponds to the selected ID
    const selectedMerchant = merchantsList.find(merchant => merchant.id === newMerchantId);

    // Update local state
    setLocalSelectedMerchantId(newMerchantId);

    // If dashboard context is available, update it
    if (dashboardContext?.setSelectedMerchant && selectedMerchant) {
      dashboardContext.setSelectedMerchant(selectedMerchant);
    }

    // Call the onChange prop if provided
    if (propOnChange && selectedMerchant) {
      propOnChange(newMerchantId, selectedMerchant);
    }
  };

  const containerStyle = {
    marginBottom: '10px',
    ...style
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.8)'
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    border: '1px solid #444',
    borderRadius: '5px',
    fontSize: '0.875rem',
    cursor: 'pointer',
    appearance: 'none', // Remove default arrow
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    paddingRight: '30px' // Space for the custom arrow
  };

  return (
      <div className={`merchant-selector-container ${className}`} style={containerStyle} {...props}>
        {label && <label style={labelStyle}>{label}</label>}
        <select
            className="merchant-selector"
            value={initialMerchantId}
            onChange={handleChange}
            style={selectStyle}
            aria-label="Select merchant"
        >
          {merchantsList.map(merchant => (
              <option key={merchant.id} value={merchant.id}>
                {merchant.name}
              </option>
          ))}
        </select>
      </div>
  );
};

MerchantSelector.propTypes = {
  merchants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
  ),
  selectedMerchantId: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default MerchantSelector;