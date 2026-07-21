"use client";

import React, { useEffect, useState } from "react";
import { fetchProductsBySlug } from "@/services/ecommerce/GetProducts";
import ProductGridCard from "./ProducGridCard";

const MostPopular = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductsBySlug('most-popular')
            .then((data) => setProducts(data || []))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4 text-center">Loading most popular...</div>;
    if (products.length === 0) return null;

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">⭐ Most Popular</h2>
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Best Sellers
                </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {products.map((product) => (
                    <ProductGridCard key={product.id || product.slug} product={product} />
                ))}
            </div>
        </div>
    );
};

export default MostPopular;