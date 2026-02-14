"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import config from "@/config";
import {
    fetchProductByCatId
} from "@/services/ecommerce/GetProducts";

const ShopInstagram = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollerRef = useRef(null);

    useEffect(() => {
        fetchProductByCatId(1).then(res=>{
                    setItems(res); // ✅ ONLY API DATA
                    setLoading(false);
                }).catch(err=>setError(err));

    }, []);


    const openDetail = (slug) => {
        window.open(`/product/detail/${slug}`, "_blank", "noopener,noreferrer");
    };

    return (
        <section className="w-full bg-white py-0">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-0 px-4 py-5 md:py-6">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black">
                        Shop for Executive
                    </h2>
                    <p className="mt-3 text-lg text-black font-light">
                        Elevate your wardrobe with fresh finds today!
                    </p>
                </div>
                {/* Loading skeletons */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-0">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="relative bg-gray-200 animate-pulse aspect-[3/4]"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="relative w-full">
                        <div
                            ref={scrollerRef}
                            className="grid grid-cols-2 md:grid-cols-6 gap-0"
                        >
                            {items.map((p) => {
                                const img = p.images?.[0];
                                const src = img
                                    ? `${config.publicPath}/images/products/${img.name}`
                                    : "";

                                return (
                                    <div
                                        key={p.id}
                                        className="group relative aspect-[3/4] overflow-hidden bg-gray-100"
                                    >
                                        {/* Image */}
                                        {src ? (
                                            <Image
                                                src={src}
                                                alt={img?.altText || p.name || "Product image"}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 50vw, 16.66vw"
                                                priority={false}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                                        )}

                                        {/* Dark overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                                        {/* Detail View Button */}
                                        <button
                                            onClick={() => openDetail(p.slug)}
                                            className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white text-black py-4 text-center font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShopInstagram;