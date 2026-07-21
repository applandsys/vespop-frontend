"use client";

import React from "react";
import ProductGridCard from "./ProducGridCard";
import WideProductCard from "./WideProductCard";

const ProductSection = ({ title, products, layout = "grid", badgeText = null, badgeColor = "red" }) => {

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {title}
                    </h2>
                </div>
                {badgeText && (
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        badgeColor === "red" ? "bg-red-100 text-red-600" :
                            badgeColor === "yellow" ? "bg-yellow-100 text-yellow-600" :
                                badgeColor === "green" ? "bg-green-100 text-green-600" :
                                    "bg-gray-100 text-gray-600"
                    }`}>
                        {badgeText}
                    </span>
                )}
            </div>

            {/* Products Grid based on layout */}
            {layout === "wide" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {products.map((product) => (
                        <WideProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductGridCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductSection;