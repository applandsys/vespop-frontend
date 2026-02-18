'use client';

import React, { useEffect, useState } from "react";
import {fetchFeaturedProducts, fetchProductsBySlug} from "@/services/ecommerce/GetProducts";
import ProductGridCard from "@/components/ecommerce/product/ProducGridCard";
import {fetchBannerBySlug} from "@/services/site/BannerData";
import LargeBanner from "@/components/theme/home/LargeBanner";

const ProductList = ({headLine}) => {
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [trendingProduct, setTrendingProduct] = useState([]);

    const [bannersOne, setBannersOne] = useState([]);
    const [bannersTwo, setBannersTwo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFeaturedProducts()
            .then((data) => setFeaturedProduct(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
        fetchProductsBySlug('trending-now')
        .then((data) => setTrendingProduct(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchBannerBySlug('home-1').then((json) => {
            if (json.success) {
                setBannersOne(json.data);
            }
        }).catch(error => setError(error)
        ).finally(setLoading(false));

        fetchBannerBySlug('home-2').then((json) => {
            if (json.success) {
                setBannersTwo(json.data);
            }
        }).catch(error => setError(error)
        ).finally(setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Loading ...</div>;

    if (error) return <div className="p-4 text-red-500">Error: {error.message || error}</div>;

    return (
        <div className="mt-4">
            <div className="mt-4 mx-4">
                <div className="w-full py-10">
                    <div className="flex items-center justify-center gap-6">
                        <span className="h-px w-32  xs:w-16 bg-black"></span>
                        <h2 className="text-sm font-semibold tracking-widest uppercase">
                            New Arrivals
                        </h2>
                        <span className="h-px w-32 xs:w-16  bg-black"></span>
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
                    {trendingProduct && trendingProduct.map((product) => (
                        <ProductGridCard key={product.id || product.slug} product={product} />
                    ))}
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-black px-8 py-4 text-white">Show More</button>
                </div>
            </div>

            <div className="mt-4">
                <LargeBanner banners={bannersOne}/>
            </div>

            <div className="mt-4">
                <div className="w-full py-10">
                    <div className="flex items-center justify-center gap-6">
                        <span className="h-px w-32  xs:w-16 bg-black"></span>
                        <h2 className="text-sm font-semibold tracking-widest uppercase">
                            Feature Products
                        </h2>
                        <span className="h-px w-32 xs:w-16  bg-black"></span>
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
                <div className="flex items-center justify-center">
                    <button className="bg-black px-8 py-4 text-white">Show More</button>
                </div>

                <div className="mt-4">
                    <LargeBanner banners={bannersTwo}/>
                </div>
            </div>
        </div>
    );
};

export default ProductList;