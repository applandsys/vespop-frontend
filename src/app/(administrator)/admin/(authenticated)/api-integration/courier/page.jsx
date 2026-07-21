"use client";

import React, { useEffect, useState } from 'react';
import { getAllCourier } from "@/services/admin/Courer";
import CourierList from "@/components/admin/ecommerce/CourierList";
import CourierAddForm from "@/components/admin/ecommerce/CourierAddForm.jsx";

const ApiIntegrationCourier = () => {
    const [couriers, setCouriers] = useState([]);

    const fetchCourier = () => {
        getAllCourier().then(res => { setCouriers(res) });
    }

    useEffect(() => {
        fetchCourier();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Courier Integrations</h1>
                <p className="text-sm text-gray-500">Manage third-party delivery services and their API configurations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1">
                    <CourierAddForm fetchCourier={fetchCourier} />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <CourierList couriers={couriers} fetchCourier={fetchCourier} />
                </div>
            </div>
        </div>
    );
};

export default ApiIntegrationCourier;
