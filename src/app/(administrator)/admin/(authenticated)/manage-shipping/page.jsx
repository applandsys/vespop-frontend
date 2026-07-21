import React from 'react';
import ShippingCostAdmin from "@/components/admin/ecommerce/shipping/ShippingCostAdmin";

const ManageShipping = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Shipping Rates</h1>
                <p className="text-sm text-gray-500">Configure location-based shipping options, flat rates, and free shipping thresholds.</p>
            </div>
            <ShippingCostAdmin/>
        </div>
    );
};

export default ManageShipping;