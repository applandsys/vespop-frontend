"use client";

import React, { useEffect, useState } from 'react';
import { getAllCourier } from "@/services/admin/Courer";
import CourierList from "@/components/admin/ecommerce/CourierList";
import CourierAddForm from "@/components/admin/ecommerce/CourierAddForm.jsx";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import { ChevronLeft } from "lucide-react";

const CourierEditPage = () => {
    const params = useParams();
    const router = useRouter();
    const courierId = params.courierId;
    
    const [couriers, setCouriers] = useState([]);

    const fetchCourier = () => {
        getAllCourier().then(res => { setCouriers(res) });
    }

    useEffect(() => {
        fetchCourier();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => router.push('/admin/api-integration/courier')}
                    className="h-8 w-8"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Integration</h1>
                    <p className="text-sm text-gray-500">Update configuration details for this courier.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1">
                    <CourierAddForm courierId={courierId} fetchCourier={fetchCourier} />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <CourierList couriers={couriers} fetchCourier={fetchCourier} />
                </div>
            </div>
        </div>
    );
};

export default CourierEditPage;
