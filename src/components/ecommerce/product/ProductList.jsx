'use client';

import React, { useEffect, useState } from "react";
import {fetchFeaturedProducts, fetchProductsBySlug} from "@/services/ecommerce/GetProducts";
import ProductGridCard from "@/components/ecommerce/product/ProducGridCard";

const ProductList = ({headLine}) => {
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [hotProducts, setHotProducts] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetchFeaturedProducts()
            .then((data) => setFeaturedProduct(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));

        fetchProductsBySlug('hot-products')
        .then((data) => setHotProducts(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));

        fetchProductsBySlug('most-popular')
            .then((data) => setMostPopular(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));

    }, []);


    if (loading) return <div className="p-4">Loading products...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error.message || error}</div>;

    return (
        <div className="mx-10">
            <div className="">
                <div className="w-full py-10">
                    <div className="flex items-center justify-center gap-6">
                        <span className="h-px w-32 bg-black"></span>

                        <h2 className="text-sm font-bold tracking-widest uppercase">
                            New Arrivals
                        </h2>

                        <span className="h-px w-32 bg-black"></span>
                    </div>

                    <div className="mt-3 flex justify-center">
                        <a
                            href="#"
                            className="text-sm text-gray-700 underline underline-offset-4 hover:text-black"
                        >
                            View All
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
                    {featuredProduct && featuredProduct.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;