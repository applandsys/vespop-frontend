"use client";

import React from 'react';
import ParcelTrackingCard from "@/components/ecommerce-front/user/ParcelTrackingCard";

const OrderTrackingPage = ({params}) => {
    const id = params.id;

    const trackingData = {
        "courier": "REDX",
        "consignmentId": "RX987654321",
        "tracking": {
            "currentStatus": "IN_TRANSIT",
            "estimatedDelivery": "2026-04-18",
            "timeline": [
                {
                    "status": "PICKED_UP",
                    "message": "Parcel picked up by courier",
                    "location": "Dhaka Hub",
                    "time": "2026-04-15T10:30:00Z"
                },
                {
                    "status": "IN_TRANSIT",
                    "message": "Parcel is on the way",
                    "location": "Gazipur",
                    "time": "2026-04-16T08:15:00Z"
                }
            ]
        }
    };

    return (
        <div>
            <ParcelTrackingCard data={trackingData} />
        </div>
    );
};

export default OrderTrackingPage;