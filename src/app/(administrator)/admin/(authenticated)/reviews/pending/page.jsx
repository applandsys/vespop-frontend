"use client";

import React from 'react';
import PendingReviews from "@/components/admin/ecommerce/reviews/PendingReviews";
import { Clock } from "lucide-react";

const PendingReviewPage = () => {
    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <Clock className="w-8 h-8 text-orange-500" />
                    Pending Reviews
                </h1>
                <p className="text-sm text-gray-500 mt-1">Review and moderate customer product ratings before they go live.</p>
            </div>
            <PendingReviews/>
        </div>
    );
};

export default PendingReviewPage;