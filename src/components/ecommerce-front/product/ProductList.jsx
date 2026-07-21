'use client';

import React, { useEffect, useState } from "react";
import { fetchFeaturedProducts, fetchProductsBySlug } from "@/services/ecommerce/GetProducts";
import ProductGridCard from "@/components/ecommerce/product/ProducGridCard";
import WideProductCard from "@/components/ecommerce/product/WideProductCard";

const ProductList = () => {

    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [hotProducts, setHotProducts] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            fetchFeaturedProducts(),
            fetchProductsBySlug('hot-products'),
            fetchProductsBySlug('most-popular')
        ])
            .then(([featured, hot, popular]) => {
                setFeaturedProduct(featured || []);
                setHotProducts(hot || []);
                setMostPopular(popular || []);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4 text-center">Loading products...</div>;
    if (error) return <div className="p-4 text-red-500 text-center">Error: {error.message || error}</div>;

    return (
        <div className="mt-4">
            {/* Featured Products - Grid Layout */}
            {featuredProduct.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {featuredProduct.map((product) => (
                            <ProductGridCard key={product.id || product.slug} product={product} />
                        ))}
                    </div>
                </div>
            )}

            {/* Hot Products - WIDE CARD DESIGN (2 cards per row) */}
            {hotProducts.length > 0 && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">🔥 Hot Products</h2>
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                            Limited Offer
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {hotProducts.map((product) => (
                            <WideProductCard key={product.id || product.slug} product={product} />
                        ))}
                    </div>
                </div>
            )}

            {/* Most Popular - Grid Layout */}
            {mostPopular.length > 0 && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">⭐ Most Popular</h2>
                        <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">
                            Best Sellers
                        </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {mostPopular.map((product) => (
                            <ProductGridCard key={product.id || product.slug} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;