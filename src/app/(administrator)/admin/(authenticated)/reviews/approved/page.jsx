"use client";

import React from 'react';
import ApprovedReviews from "@/components/admin/ecommerce/reviews/ApprovedReviews";
import { CheckCircle } from "lucide-react";

const ApprovedReviewPage = () => {
    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    Approved Reviews
                </h1>
                <p className="text-sm text-gray-500 mt-1">View and manage customer product ratings that are currently live.</p>
            </div>
            <ApprovedReviews/>
        </div>
    );
};

export default ApprovedReviewPage;