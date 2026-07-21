import React from 'react';
import AllOrders from "@/components/admin/ecommerce/order/AllOrders";

const AdminIncompleteOrders = () => {
    return (
        <div>
            <AllOrders type="PENDING"/>
        </div>
    );
};

export default AdminIncompleteOrders;