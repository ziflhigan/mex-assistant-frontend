import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * TimeFilter component for selecting time periods (Today, Week, Month, Year)
 * Used in the dashboard to filter data by time range
 */
const TimeFilter = ({
  options = ['Today', 'Week', 'Month', 'Year'],
  defaultValue = 'Today',
  onChange,
  className = '',
  style = {},
  ...props
}) => {
  const [activeOption, setActiveOption] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue && options.includes(defaultValue)) {
      setActiveOption(defaultValue);
    }
  }, [defaultValue, options]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  const containerStyle = {
    display: 'flex',
    backgroundColor: 'var(--grab-gray, #f7f7f7)',
    borderRadius: '20px',
    overflow: 'hidden',
    ...style
  };

  const buttonStyle = (isActive) => ({
    padding: '8px 15px',
    border: 'none',
    backgroundColor: isActive ? 'var(--grab-green, #00b14f)' : 'transparent',
    color: isActive ? 'white' : 'var(--grab-dark-gray, #4a4a4a)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: isActive ? 500 : 400,
    fontSize: '0.875rem',
    outline: 'none'
  });

  return (
    <div className={`time-filter ${className}`} style={containerStyle} {...props}>
      {options.map(option => (
        <button
          key={option}
          className={`time-filter-option ${activeOption === option ? 'active' : ''}`}
          style={buttonStyle(activeOption === option)}
          onClick={() => handleOptionClick(option)}
          aria-pressed={activeOption === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

TimeFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default TimeFilter;