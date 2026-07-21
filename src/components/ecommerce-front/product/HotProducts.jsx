"use client";

import React, { useEffect, useState } from "react";
import { fetchProductsBySlug } from "@/services/ecommerce/GetProducts";
import WideProductCard from "./WideProductCard";

const HotProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductsBySlug('hot-products')
            .then((data) => setProducts(data || []))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4 text-center">Loading hot products...</div>;
    if (products.length === 0) return null;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">🔥 Hot Products</h2>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Limited Offer
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {products.map((product) => (
                    <WideProductCard key={product.id || product.slug} product={product} />
                ))}
            </div>
        </div>
    );
};

export default HotProducts;