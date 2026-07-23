'use client';
import React, {useEffect, useState} from 'react';
import ProductGridCard from "./ProducGridCard";
import {fetchProductsBySlug} from "@/services/ecommerce/GetProducts";

const NewArrivals = () => {

    const [trendingProduct, setTrendingProduct] = useState([]);

    useEffect(() => {
        fetchProductsBySlug('new-arrival')
            .then((data) => setTrendingProduct(data))
            .catch((error) => setError(error))
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
                {trendingProduct && trendingProduct.map((product) => (
                    <ProductGridCard key={product.id || product.slug} product={product} />
                ))}
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-black px-8 py-4 text-white">Show More</button>
            </div>
        </>
        
    );
};

export default NewArrivals;