import React from 'react';
import Card from './Card'; // Use the common Card component
import { formatCurrency, formatPercentage, formatNumber } from '../../utils/numberFormatter';
// Optional: If using MUI icons
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { Box, Typography, Avatar } from '@mui/material'; // MUI components


// Represents one of the KPI cards on the dashboard
// TODO: Implement detailed styling from mockup
// TODO: Handle icon mapping based on title or prop

const StatCard = ({ title, value, change, iconName, formatType = 'number', changeDirection = 'positive' }) => {
    let formattedValue = value;
    if (formatType === 'currency') {
        formattedValue = formatCurrency(value);
    } else if (formatType === 'percentage') {
        // Assuming 'change' contains the percentage value if formatType is 'percentage'
        formattedValue = formatPercentage(value);
    } else if (formatType === 'minutes') {
         formattedValue = `${value.toFixed(1)} min`;
    } else {
         formattedValue = formatNumber(value);
    }

    const isPositive = changeDirection === 'positive';

    // Placeholder for icon rendering - replace with actual icons (e.g., MUI or Font Awesome)
    const renderIcon = () => {
        // Map iconName to actual icon component/element
        // Example using simple text placeholder:
        const iconMap = {
            'dollar-sign': '$',
            'shopping-bag': 'Bag',
            'receipt': 'Rct',
            'clock': 'Clk'
        };
        return <div style={{ /* Style the icon container */ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>{iconMap[iconName] || '?'}</div>;
    };

    const changeStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        color: isPositive ? 'var(--grab-green)' : '#e74c3c', // Use CSS Vars
    };

    const arrowStyle = { marginRight: '5px' };

    return (
        <Card style={{ borderTop: `4px solid ${isPositive ? 'var(--grab-green)' : '#e74c3c'}` /* Adjust border color logic */ }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '14px', color: 'var(--grab-dark-gray)' }}>{title}</div>
                {renderIcon()}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, margin: '10px 0' }}>
                {formattedValue}
            </div>
            {change && (
                <div style={changeStyle}>
                    {/* Replace with actual up/down arrow icon */}
                    <span style={arrowStyle}>{isPositive ? '↑' : '↓'}</span>
                    {/* Assuming 'change' is the percentage text */}
                    {change}
                </div>
            )}
        </Card>
    );
};

export default StatCard;