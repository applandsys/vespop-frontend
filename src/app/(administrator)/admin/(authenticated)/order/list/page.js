"use client";

import React from 'react';
import AllOrders from "@/components/admin/ecommerce/order/AllOrders.jsx";
import { ShoppingCart } from "lucide-react";

const AdminOrders = () => {
    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <ShoppingCart className="w-8 h-8 text-indigo-500" />
                    Order Management
                </h1>
                <p className="text-sm text-gray-500 mt-1">View, track, and manage all customer orders.</p>
            </div>
            <AllOrders />
        </div>
    );
};

export default AdminOrders;