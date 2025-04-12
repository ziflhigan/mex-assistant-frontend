/**
 * Mock merchants data with detailed information
 * Contains merchants used throughout the application
 */
const mockMerchants = [
  {
    id: '5c1f8',
    name: 'Burger Factory',
    type: 'Burgers',
    city_id: 'KL001',
    rating: '4.7',
    join_date: new Date('2022-05-15'),
    logo: '/api/placeholder/40/40', // Placeholder for logo
    description: 'Specializing in gourmet burgers and sides'
  },
  {
    id: '2e8a5',
    name: 'Burger Barn',
    type: 'Burgers',
    city_id: 'KL001',
    rating: '4.2',
    join_date: new Date('2022-07-22'),
    logo: '/api/placeholder/40/40',
    description: 'Home-style burgers with fresh ingredients'
  },
  {
    id: '0e1b3',
    name: 'Chicken Shack',
    type: 'Chicken',
    city_id: 'SG002',
    rating: '4.5',
    join_date: new Date('2021-11-08'),
    logo: '/api/placeholder/40/40',
    description: 'Premium fried and grilled chicken options'
  },
  {
    id: '1d4f2',
    name: 'Asian Wok',
    type: 'Asian',
    city_id: 'SG002',
    rating: '4.4',
    join_date: new Date('2022-02-14'),
    logo: '/api/placeholder/40/40',
    description: 'Authentic Asian cuisine with modern twist'
  },
  {
    id: 'b9e5f',
    name: 'Seafood Express',
    type: 'Seafood',
    city_id: 'JK003',
    rating: '4.6',
    join_date: new Date('2022-09-01'),
    logo: '/api/placeholder/40/40',
    description: 'Fresh seafood delivered fast'
  }
];

// Helper function to get merchant by ID
export const getMerchantById = (id) => {
  return mockMerchants.find(merchant => merchant.id === id) || mockMerchants[0];
};

// Helper function to get all merchants
export const getAllMerchants = () => {
  return mockMerchants;
};

// Export both the array and helper functions
export default mockMerchants;