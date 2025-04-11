import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import { getMerchants } from '../../services/mockService';
import './MerchantSelector.css';

/**
 * Component for selecting a merchant to filter dashboard data
 */
const MerchantSelector = () => {
    const { selectedMerchant, setSelectedMerchant } = useDashboard();
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch merchants on component mount
    useEffect(() => {
        const fetchMerchants = async () => {
            try {
                const data = await getMerchants();
                setMerchants(data);

                // If no merchant is selected yet, select the first one
                if (!selectedMerchant && data.length > 0) {
                    setSelectedMerchant(data[0]);
                }
            } catch (error) {
                console.error('Error fetching merchants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMerchants();
    }, [selectedMerchant, setSelectedMerchant]);

    // Handle merchant selection change
    const handleChange = (e) => {
        const merchantId = e.target.value;
        const selected = merchants.find(merchant => merchant.id === merchantId);

        if (selected) {
            setSelectedMerchant(selected);
        }
    };

    if (loading) {
        return (
            <div className="merchant-selector-container">
                <label>Merchant:</label>
                <select disabled>
                    <option>Loading...</option>
                </select>
            </div>
        );
    }

    return (
        <div className="merchant-selector-container">
            <label>Merchant:</label>
            <select
                value={selectedMerchant?.id || ''}
                onChange={handleChange}
                className="merchant-selector"
            >
                {merchants.map(merchant => (
                    <option key={merchant.id} value={merchant.id}>
                        {merchant.name} ({merchant.id})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MerchantSelector;