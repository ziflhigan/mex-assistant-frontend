/**
 * Mock data for top selling items
 * Data varies by merchant and time period
 */

// Top items for each merchant and time period
const mockTopItems = {
    Today: {
        '5c1f8': [
            { id: '101', name: 'Double Patty Burger', category: 'Burgers', quantity: 24, revenue: 216.00 },
            { id: '102', name: 'Crispy Chicken Sandwich', category: 'Sandwiches', quantity: 18, revenue: 153.00 },
            { id: '103', name: 'Regular Fries', category: 'Sides', quantity: 22, revenue: 77.00 },
            { id: '104', name: 'Chocolate Milkshake', category: 'Beverages', quantity: 15, revenue: 78.75 },
            { id: '105', name: 'Cheesy Bacon Fries', category: 'Sides', quantity: 12, revenue: 69.00 },
            { id: '106', name: 'Veggie Burger', category: 'Burgers', quantity: 9, revenue: 72.00 },
            { id: '107', name: 'Onion Rings', category: 'Sides', quantity: 11, revenue: 54.89 },
            { id: '108', name: 'Cola', category: 'Beverages', quantity: 20, revenue: 50.00 },
            { id: '109', name: "Kid's Meal", category: 'Combos', quantity: 8, revenue: 55.92 },
            { id: '110', name: 'Ice Cream Sundae', category: 'Desserts', quantity: 9, revenue: 42.30 }
        ],
        '2e8a5': [
            { id: '201', name: 'Barn Burger Special', category: 'Burgers', quantity: 19, revenue: 171.00 },
            { id: '202', name: 'BBQ Bacon Burger', category: 'Burgers', quantity: 15, revenue: 139.50 },
            { id: '203', name: 'Curly Fries', category: 'Sides', quantity: 18, revenue: 63.00 },
            { id: '204', name: 'Vanilla Shake', category: 'Beverages', quantity: 12, revenue: 54.00 },
            { id: '205', name: 'Southwest Salad', category: 'Salads', quantity: 8, revenue: 55.92 },
            { id: '206', name: 'Cheese Sticks', category: 'Appetizers', quantity: 10, revenue: 44.90 },
            { id: '207', name: 'Grilled Chicken Sandwich', category: 'Sandwiches', quantity: 11, revenue: 93.50 },
            { id: '208', name: 'Lemonade', category: 'Beverages', quantity: 14, revenue: 41.86 },
            { id: '209', name: 'Kids Chicken Nuggets', category: 'Kids Menu', quantity: 7, revenue: 34.93 },
            { id: '210', name: 'Chocolate Brownie', category: 'Desserts', quantity: 6, revenue: 29.94 }
        ],
        '0e1b3': [
            { id: '301', name: 'Spicy Chicken Bucket', category: 'Chicken', quantity: 18, revenue: 197.10 },
            { id: '302', name: 'Crispy Chicken Wings', category: 'Chicken', quantity: 22, revenue: 165.00 },
            { id: '303', name: 'Chicken Sandwich', category: 'Sandwiches', quantity: 19, revenue: 142.50 },
            { id: '304', name: 'Coleslaw', category: 'Sides', quantity: 16, revenue: 48.00 },
            { id: '305', name: 'Mashed Potatoes', category: 'Sides', quantity: 15, revenue: 52.35 },
            { id: '306', name: 'Biscuits', category: 'Sides', quantity: 12, revenue: 30.00 },
            { id: '307', name: 'Gravy', category: 'Sides', quantity: 11, revenue: 21.89 },
            { id: '308', name: 'Family Meal', category: 'Combos', quantity: 8, revenue: 119.92 },
            { id: '309', name: 'Pepsi', category: 'Beverages', quantity: 17, revenue: 42.33 },
            { id: '310', name: 'Chicken Tenders', category: 'Chicken', quantity: 14, revenue: 83.86 }
        ],
        '1d4f2': [
            { id: '401', name: 'Beef Fried Rice', category: 'Rice', quantity: 22, revenue: 175.78 },
            { id: '402', name: 'Special Chow Mein', category: 'Noodles', quantity: 20, revenue: 159.80 },
            { id: '403', name: 'Spring Rolls', category: 'Appetizers', quantity: 24, revenue: 71.76 },
            { id: '404', name: 'Sweet & Sour Chicken', category: 'Chicken', quantity: 18, revenue: 169.74 },
            { id: '405', name: 'Kung Pao Chicken', category: 'Chicken', quantity: 16, revenue: 151.84 },
            { id: '406', name: 'Beef with Broccoli', category: 'Beef', quantity: 14, revenue: 132.86 },
            { id: '407', name: 'Vegetable Stir Fry', category: 'Vegetables', quantity: 10, revenue: 79.90 },
            { id: '408', name: 'Wonton Soup', category: 'Soups', quantity: 12, revenue: 47.88 },
            { id: '409', name: 'Steamed Rice', category: 'Rice', quantity: 22, revenue: 54.78 },
            { id: '410', name: 'Green Tea', category: 'Beverages', quantity: 15, revenue: 37.35 }
        ],
        'b9e5f': [
            { id: '501', name: 'Grilled Fish Platter', category: 'Fish', quantity: 20, revenue: 239.80 },
            { id: '502', name: 'Shrimp Scampi', category: 'Seafood', quantity: 16, revenue: 223.84 },
            { id: '503', name: 'Seafood Soup', category: 'Soups', quantity: 14, revenue: 111.86 },
            { id: '504', name: 'Calamari', category: 'Appetizers', quantity: 18, revenue: 161.82 },
            { id: '505', name: 'Fish and Chips', category: 'Fish', quantity: 22, revenue: 219.78 },
            { id: '506', name: 'Lobster Roll', category: 'Sandwiches', quantity: 12, revenue: 179.40 },
            { id: '507', name: 'Clam Chowder', category: 'Soups', quantity: 17, revenue: 118.83 },
            { id: '508', name: 'Garlic Bread', category: 'Sides', quantity: 24, revenue: 71.76 },
            { id: '509', name: 'House Salad', category: 'Salads', quantity: 14, revenue: 83.86 },
            { id: '510', name: 'Lemonade', category: 'Beverages', quantity: 20, revenue: 59.80 }
        ],
        'default': [
            { id: '101', name: 'Double Patty Burger', category: 'Burgers', quantity: 24, revenue: 216.00 },
            { id: '102', name: 'Crispy Chicken Sandwich', category: 'Sandwiches', quantity: 18, revenue: 153.00 },
            { id: '103', name: 'Regular Fries', category: 'Sides', quantity: 22, revenue: 77.00 },
            { id: '104', name: 'Chocolate Milkshake', category: 'Beverages', quantity: 15, revenue: 78.75 },
            { id: '105', name: 'Cheesy Bacon Fries', category: 'Sides', quantity: 12, revenue: 69.00 }
        ]
    },
    Week: {
        '5c1f8': [
            { id: '101', name: 'Double Patty Burger', category: 'Burgers', quantity: 87, revenue: 783.00 },
            { id: '102', name: 'Crispy Chicken Sandwich', category: 'Sandwiches', quantity: 65, revenue: 552.50 },
            { id: '103', name: 'Regular Fries', category: 'Sides', quantity: 59, revenue: 206.50 },
            { id: '104', name: 'Chocolate Milkshake', category: 'Beverages', quantity: 42, revenue: 220.50 },
            { id: '105', name: 'Cheesy Bacon Fries', category: 'Sides', quantity: 38, revenue: 218.50 },
            { id: '106', name: 'Veggie Burger', category: 'Burgers', quantity: 32, revenue: 256.00 },
            { id: '107', name: 'Onion Rings', category: 'Sides', quantity: 30, revenue: 149.70 },
            { id: '108', name: 'Cola', category: 'Beverages', quantity: 53, revenue: 132.50 },
            { id: '109', name: "Kid's Meal", category: 'Combos', quantity: 28, revenue: 195.72 },
            { id: '110', name: 'Ice Cream Sundae', category: 'Desserts', quantity: 25, revenue: 117.50 }
        ],
        '2e8a5': [
            { id: '201', name: 'Barn Burger Special', category: 'Burgers', quantity: 72, revenue: 648.00 },
            { id: '202', name: 'BBQ Bacon Burger', category: 'Burgers', quantity: 58, revenue: 539.40 },
            { id: '203', name: 'Curly Fries', category: 'Sides', quantity: 65, revenue: 227.50 },
            { id: '204', name: 'Vanilla Shake', category: 'Beverages', quantity: 40, revenue: 180.00 },
            { id: '205', name: 'Southwest Salad', category: 'Salads', quantity: 32, revenue: 223.68 },
            { id: '206', name: 'Cheese Sticks', category: 'Appetizers', quantity: 37, revenue: 166.13 },
            { id: '207', name: 'Grilled Chicken Sandwich', category: 'Sandwiches', quantity: 45, revenue: 382.50 },
            { id: '208', name: 'Lemonade', category: 'Beverages', quantity: 50, revenue: 149.50 },
            { id: '209', name: 'Kids Chicken Nuggets', category: 'Kids Menu', quantity: 28, revenue: 139.72 },
            { id: '210', name: 'Chocolate Brownie', category: 'Desserts', quantity: 22, revenue: 109.78 }
        ],
        '0e1b3': [
            { id: '301', name: 'Spicy Chicken Bucket', category: 'Chicken', quantity: 62, revenue: 679.42 },
            { id: '302', name: 'Crispy Chicken Wings', category: 'Chicken', quantity: 78, revenue: 585.00 },
            { id: '303', name: 'Chicken Sandwich', category: 'Sandwiches', quantity: 65, revenue: 487.50 },
            { id: '304', name: 'Coleslaw', category: 'Sides', quantity: 55, revenue: 165.00 },
            { id: '305', name: 'Mashed Potatoes', category: 'Sides', quantity: 50, revenue: 174.50 },
            { id: '306', name: 'Biscuits', category: 'Sides', quantity: 45, revenue: 112.50 },
            { id: '307', name: 'Gravy', category: 'Sides', quantity: 40, revenue: 79.60 },
            { id: '308', name: 'Family Meal', category: 'Combos', quantity: 30, revenue: 449.70 },
            { id: '309', name: 'Pepsi', category: 'Beverages', quantity: 60, revenue: 149.40 },
            { id: '310', name: 'Chicken Tenders', category: 'Chicken', quantity: 55, revenue: 329.45 }
        ],
        '1d4f2': [
            { id: '401', name: 'Beef Fried Rice', category: 'Rice', quantity: 75, revenue: 599.25 },
            { id: '402', name: 'Special Chow Mein', category: 'Noodles', quantity: 68, revenue: 543.32 },
            { id: '403', name: 'Spring Rolls', category: 'Appetizers', quantity: 80, revenue: 239.20 },
            { id: '404', name: 'Sweet & Sour Chicken', category: 'Chicken', quantity: 62, revenue: 585.04 },
            { id: '405', name: 'Kung Pao Chicken', category: 'Chicken', quantity: 55, revenue: 522.50 },
            { id: '406', name: 'Beef with Broccoli', category: 'Beef', quantity: 48, revenue: 455.52 },
            { id: '407', name: 'Vegetable Stir Fry', category: 'Vegetables', quantity: 35, revenue: 279.65 },
            { id: '408', name: 'Wonton Soup', category: 'Soups', quantity: 42, revenue: 167.58 },
            { id: '409', name: 'Steamed Rice', category: 'Rice', quantity: 70, revenue: 173.60 },
            { id: '410', name: 'Green Tea', category: 'Beverages', quantity: 45, revenue: 112.05 }
        ],
        'b9e5f': [
            { id: '501', name: 'Grilled Fish Platter', category: 'Fish', quantity: 68, revenue: 815.32 },
            { id: '502', name: 'Shrimp Scampi', category: 'Seafood', quantity: 55, revenue: 769.45 },
            { id: '503', name: 'Seafood Soup', category: 'Soups', quantity: 50, revenue: 399.50 },
            { id: '504', name: 'Calamari', category: 'Appetizers', quantity: 65, revenue: 584.35 },
            { id: '505', name: 'Fish and Chips', category: 'Fish', quantity: 72, revenue: 719.28 },
            { id: '506', name: 'Lobster Roll', category: 'Sandwiches', quantity: 40, revenue: 598.00 },
            { id: '507', name: 'Clam Chowder', category: 'Soups', quantity: 58, revenue: 404.26 },
            { id: '508', name: 'Garlic Bread', category: 'Sides', quantity: 75, revenue: 223.50 },
            { id: '509', name: 'House Salad', category: 'Salads', quantity: 48, revenue: 287.52 },
            { id: '510', name: 'Lemonade', category: 'Beverages', quantity: 60, revenue: 179.40 }
        ],
        'default': [
            { id: '101', name: 'Double Patty Burger', category: 'Burgers', quantity: 87, revenue: 783.00 },
            { id: '102', name: 'Crispy Chicken Sandwich', category: 'Sandwiches', quantity: 65, revenue: 552.50 },
            { id: '103', name: 'Regular Fries', category: 'Sides', quantity: 59, revenue: 206.50 },
            { id: '104', name: 'Chocolate Milkshake', category: 'Beverages', quantity: 42, revenue: 220.50 },
            { id: '105', name: 'Cheesy Bacon Fries', category: 'Sides', quantity: 38, revenue: 218.50 }
        ]
    },
    Month: {
        '5c1f8': [
            { id: '101', name: 'Double Patty Burger', category: 'Burgers', quantity: 348, revenue: 3132.00 },
            { id: '102', name: 'Crispy Chicken Sandwich', category: 'Sandwiches', quantity: 260, revenue: 2210.00 },
            { id: '103', name: 'Regular Fries', category: 'Sides', quantity: 236, revenue: 826.00 },
            { id: '104', name: 'Chocolate Milkshake', category: 'Beverages', quantity: 168, revenue: 882.00 },
            { id: '105', name: 'Cheesy Bacon Fries', category: 'Sides', quantity: 152, revenue: 874.00 },
            { id: '106', name: 'Veggie Burger', category: 'Burgers', quantity: 128, revenue: 1024.00 },
            { id: '107', name: 'Onion Rings', category: 'Sides', quantity: 120, revenue: 598.80 },
            { id: '108', name: 'Cola', category: 'Beverages', quantity: 212, revenue: 530.00 },
            { id: '109', name: "Kid's Meal", category: 'Combos', quantity: 112, revenue: 782.88 },
            { id: '110', name: 'Ice Cream Sundae', category: 'Desserts', quantity: 100, revenue: 470.00 }
        ],
        '0e1b3': [
            { id: '301', name: 'Spicy Chicken Bucket', category: 'Chicken', quantity: 248, revenue: 2717.68 },
            { id: '302', name: 'Crispy Chicken Wings', category: 'Chicken', quantity: 312, revenue: 2340.00 },
            { id: '303', name: 'Chicken Sandwich', category: 'Sandwiches', quantity: 260, revenue: 1950.00 },
            { id: '304', name: 'Coleslaw', category: 'Sides', quantity: 220, revenue: 660.00 },
            { id: '305', name: 'Mashed Potatoes', category: 'Sides', quantity: 200, revenue: 698.00 },
            { id: '306', name: 'Biscuits', category: 'Sides', quantity: 180, revenue: 450.00 },
            { id: '307', name: 'Gravy', category: 'Sides', quantity: 160, revenue: 318.40 },
            { id: '308', name: 'Family Meal', category: 'Combos', quantity: 120, revenue: 1798.80 },
            { id: '309', name: 'Pepsi', category: 'Beverages', quantity: 240, revenue: 597.60 },
            { id: '310', name: 'Chicken Tenders', category: 'Chicken', quantity: 220, revenue: 1317.80 }
        ],
        'default': [
            { id: '101', name: 'Double Patty Burger', category: 'Burgers', quantity: 348, revenue: 3132.00 },
            { id: '102', name: 'Crispy Chicken Sandwich', category: 'Sandwiches', quantity: 260, revenue: 2210.00 },
            { id: '103', name: 'Regular Fries', category: 'Sides', quantity: 236, revenue: 826.00 },
            { id: '104', name: 'Chocolate Milkshake', category: 'Beverages', quantity: 168, revenue: 882.00 },
            { id: '105', name: 'Cheesy Bacon Fries', category: 'Sides', quantity: 152, revenue: 874.00 }
        ]
    },
    Year: {
        '5c1f8': [
            { id: '101', name: 'Double Patty Burger', category: 'Burgers', quantity: 4176, revenue: 37584.00 },
            { id: '102', name: 'Crispy Chicken Sandwich', category: 'Sandwiches', quantity: 3120, revenue: 26520.00 },
            { id: '103', name: 'Regular Fries', category: 'Sides', quantity: 2832, revenue: 9912.00 },
            { id: '104', name: 'Chocolate Milkshake', category: 'Beverages', quantity: 2016, revenue: 10584.00 },
            { id: '105', name: 'Cheesy Bacon Fries', category: 'Sides', quantity: 1824, revenue: 10488.00 },
            { id: '106', name: 'Veggie Burger', category: 'Burgers', quantity: 1536, revenue: 12288.00 },
            { id: '107', name: 'Onion Rings', category: 'Sides', quantity: 1440, revenue: 7185.60 },
            { id: '108', name: 'Cola', category: 'Beverages', quantity: 2544, revenue: 6360.00 },
            { id: '109', name: "Kid's Meal", category: 'Combos', quantity: 1344, revenue: 9394.56 },
            { id: '110', name: 'Ice Cream Sundae', category: 'Desserts', quantity: 1200, revenue: 5640.00 }
        ],
        '0e1b3': [
            { id: '301', name: 'Spicy Chicken Bucket', category: 'Chicken', quantity: 2976, revenue: 32612.16 },
            { id: '302', name: 'Crispy Chicken Wings', category: 'Chicken', quantity: 3744, revenue: 28080.00 },
            { id: '303', name: 'Chicken Sandwich', category: 'Sandwiches', quantity: 3120, revenue: 23400.00 },
            { id: '304', name: 'Coleslaw', category: 'Sides', quantity: 2640, revenue: 7920.00 },
            { id: '305', name: 'Mashed Potatoes', category: 'Sides', quantity: 2400, revenue: 8376.00 },
            { id: '306', name: 'Biscuits', category: 'Sides', quantity: 2160, revenue: 5400.00 },
            { id: '307', name: 'Gravy', category: 'Sides', quantity: 1920, revenue: 3820.80 },
            { id: '308', name: 'Family Meal', category: 'Combos', quantity: 1440, revenue: 21585.60 },
            { id: '309', name: 'Pepsi', category: 'Beverages', quantity: 2880, revenue: 7171.20 },
            { id: '310', name: 'Chicken Tenders', category: 'Chicken', quantity: 2640, revenue: 15813.60 }
        ],
        'default': [
            { id: '101', name: 'Double Patty Burger', category: 'Burgers', quantity: 4176, revenue: 37584.00 },
            { id: '102', name: 'Crispy Chicken Sandwich', category: 'Sandwiches', quantity: 3120, revenue: 26520.00 },
            { id: '103', name: 'Regular Fries', category: 'Sides', quantity: 2832, revenue: 9912.00 },
            { id: '104', name: 'Chocolate Milkshake', category: 'Beverages', quantity: 2016, revenue: 10584.00 },
            { id: '105', name: 'Cheesy Bacon Fries', category: 'Sides', quantity: 1824, revenue: 10488.00 }
        ]
    }
};

// Helper function to get top items by merchant and time period
export const getTopItemsByMerchant = (merchantId, timePeriod) => {
    // Get the data for the specified time period
    const periodData = mockTopItems[timePeriod] || mockTopItems['Week'];

    // Get the data for the specified merchant or use default
    return periodData[merchantId] || periodData['default'];
};

export default mockTopItems;