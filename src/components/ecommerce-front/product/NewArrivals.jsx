'use client';
import React, {useEffect, useState} from 'react';
import ProductGridCard from "./ProducGridCard";
import {fetchProductsBySlug} from "@/services/ecommerce/GetProducts";

const NewArrivals = () => {

    const [trendingProduct, setTrendingProduct] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        fetchProductsBySlug('new-arrival')
            .then((data) => setTrendingProduct(data))
            .catch((error) => console.log(error))
    }, []);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 4);
    };

    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px]">
                {trendingProduct && trendingProduct.slice(0, visibleCount).map((product) => (
                    <ProductGridCard key={product.id || product.slug} product={product} />
                ))}
            </div>
            {trendingProduct && visibleCount < trendingProduct.length && (
                <div className="flex items-center justify-center mt-6">
                    <button 
                        className="bg-black px-8 py-4 text-white hover:bg-gray-800 transition-colors"
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                </div>
            )}
        </>
        
    );
};

export default NewArrivals;