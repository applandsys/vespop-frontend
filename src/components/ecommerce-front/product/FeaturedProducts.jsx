'use client';
import React, {useEffect, useState} from 'react';
import ProductGridCard from "./ProducGridCard";
import {fetchFeaturedProducts, fetchProductsBySlug} from "@/services/ecommerce/GetProducts";

const FeaturedProduct = () => {

    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFeaturedProducts()
            .then((data) => setFeaturedProduct(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
                {featuredProduct && featuredProduct.map((product) => (
                    <ProductGridCard key={product.id || product.slug} product={product} />
                ))}
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-black px-8 py-4 text-white">Show More</button>
            </div>
        </>

    );
};

export default FeaturedProduct;