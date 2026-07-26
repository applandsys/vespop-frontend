'use client';
import React, { useEffect, useState } from 'react';
import ProductGridCard from "@/components/ecommerce-front/product/ProducGridCard";
import { fetchProductsBySlug } from "@/services/ecommerce/GetProducts";
import Breadcrumb from "@/components/ecommerce-front/common/BreadChrumb";

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "New Arrivals", href: "/new-arrivals" },
];

const NewArrivalsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProductsBySlug('new-arrival')
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Breadcrumb items={breadcrumbItems} />
            
            <div className="max-w-[1200px] mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-900">New Arrivals</h1>
                    <p className="mt-2 text-gray-600">Check out our latest and greatest products.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">Failed to load new arrivals.</div>
                ) : products && products.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductGridCard key={product.id || product.slug} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">No new arrivals found at the moment.</div>
                )}
            </div>
        </div>
    );
};

export default NewArrivalsPage;
