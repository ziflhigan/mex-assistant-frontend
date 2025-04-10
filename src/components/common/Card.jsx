import React from 'react';
// Optional: If using MUI
// import MuiCard from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

// Simple custom card or wrapper around MUI Card
// TODO: Add styling based on the mockup (shadow, border-radius, padding)

const Card = ({ children, title, actions, style, ...props }) => {
  // If using MUI:
  // return (
  //   <MuiCard sx={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', ...style }} {...props}>
  //     <CardContent>
  //       {title && <Typography variant="h6" component="div" gutterBottom>{title}</Typography>}
  //       {children}
  //       {actions && <Box sx={{ mt: 2 }}>{actions}</Box>}
  //     </CardContent>
  //   </MuiCard>
  // );

  // Basic custom card example:
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px', // Example margin
    ...style,
  };

  return (
    <div style={cardStyle} {...props}>
      {title && <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', fontWeight: 600 }}>{title}</h3>}
      {children}
      {actions && <div style={{ marginTop: '15px' }}>{actions}</div>}
    </div>
  );
};

export default Card;