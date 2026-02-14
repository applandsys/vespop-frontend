
"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import UiCard from "@/components/theme/common/UiCard";
import RoundedButton from "@/components/ui/RoundedButton";
import CustomerReviews from "@/components/ecommerce/product/CustomerReviews";

const MoreDetail = ({product}) => {
    const [activeTab, setActiveTab] = useState("description");

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="mt-6">
            <UiCard className="p-4 md:p-6">
                {/* Mobile-friendly tabs - UPDATED WITH LIGHT ASH COLOR */}
                <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-2 -mx-1 px-1">
                    <button
                        onClick={() => handleTabClick("description")}
                        className={`whitespace-nowrap px-3 py-1.5 text-xs rounded-lg transition-colors ${
                            activeTab === "description"
                                ? 'bg-gray-100 text-gray-700 border border-gray-300 font-medium'
                                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => handleTabClick("additional_info")}
                        className={`whitespace-nowrap px-3 py-1.5 text-xs rounded-lg transition-colors ${
                            activeTab === "additional_info"
                                ? 'bg-gray-100 text-gray-700 border border-gray-300 font-medium'
                                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        Additional Info
                    </button>
                    <button
                        onClick={() => handleTabClick("reviews")}
                        className={`whitespace-nowrap px-3 py-1.5 text-xs rounded-lg transition-colors ${
                            activeTab === "reviews"
                                ? 'bg-gray-100 text-gray-700 border border-gray-300 font-medium'
                                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        Reviews ({product?.ratings?.length || 0})
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === "description" && (
                        <div className="max-w-none">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                                Product Description
                            </h2>
                            <div
                                className="text-gray-700 leading-8 font-light tracking-wide text-justify bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(product.description)
                                }}
                            />
                        </div>
                    )}

                    {activeTab === "additional_info" && (
                        <div className="max-w-none">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                                Additional Information
                            </h2>
                            <div
                                className="text-gray-700 leading-7 font-normal tracking-wide text-justify bg-white p-6 rounded-xl border border-gray-200"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(product.specification)
                                }}
                            />
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                                Customer Reviews ({product?.ratings?.length || 0})
                            </h2>
                            <CustomerReviews product={product}/>
                        </div>
                    )}
                </div>
            </UiCard>
        </div>
    );
};

export default MoreDetail;