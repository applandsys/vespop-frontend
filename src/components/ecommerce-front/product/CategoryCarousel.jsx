"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { getCategories } from "@/services/ecommerce/getCategories";
import Link from "next/link";
import { getImageUrl } from "@/utils/R2Resolver";

export default function CategoryCarousel() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);
    const autoScrollInterval = useRef(null);

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    // Auto-scroll every 3 seconds
    useEffect(() => {
        if (categories.length === 0) return;

        autoScrollInterval.current = setInterval(() => {
            scroll("next");
        }, 3000);

        return () => {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current);
            }
        };
    }, [categories.length]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        const scrollAmount = 220;
        const currentScroll = scrollRef.current.scrollLeft;
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        let newScroll;
        if (direction === "next") {
            newScroll = currentScroll + scrollAmount;
            if (newScroll >= maxScroll) {
                newScroll = 0;
            }
        } else {
            newScroll = currentScroll - scrollAmount;
            if (newScroll <= 0) {
                newScroll = maxScroll;
            }
        }

        scrollRef.current.scrollTo({
            left: newScroll,
            behavior: "smooth",
        });
    };

    // Stop auto-scroll when user manually scrolls
    const handleManualScroll = () => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
            setTimeout(() => {
                autoScrollInterval.current = setInterval(() => {
                    scroll("next");
                }, 3000);
            }, 10000);
        }
    };

    if (loading) {
        return (
            <div className="w-full mx-auto">
                <div className="flex gap-4 overflow-x-auto px-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="min-w-[120px] w-[120px] md:min-w-[140px] md:w-[140px]">
                            <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded mt-2 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">Error loading categories</p>;
    }

    if (!categories?.length) {
        return <p className="text-center w-full">No categories found</p>;
    }

    return (
        <div className="w-full mx-auto">
            {/* Title */}
            {/* Carousel Container with Buttons */}
            <div className="relative">
                {/* Left Scroll Button */}
                <button
                    onClick={() => scroll("prev")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-600 hover:text-white rounded-full p-2 shadow-lg transition-all duration-300"
                    aria-label="Previous category"
                    style={{ left: '-10px' }}
                >
                    <ArrowLeftIcon className="h-5 w-5 text-gray-700 hover:text-white" />
                </button>

                {/* Carousel - ADDED px-8 FOR PADDING LEFT AND RIGHT */}
                <div
                    ref={scrollRef}
                    onScroll={handleManualScroll}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-2 px-8"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {categories.map((cat) => (
                        <Link href={`/category/${cat.slug}`} key={cat.id} className="snap-start">
                            <div className="min-w-[120px] w-[120px] md:min-w-[140px] md:w-[140px] group/card cursor-pointer">
                                {/* Square Box */}
                                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group-hover/card:scale-105">
                                    <Image
                                        src={getImageUrl(cat.image)}
                                        alt={cat.name}
                                        width={140}
                                        height={140}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Category Info */}
                                <div className="text-center mt-3">
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate px-1">
                                        {cat.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {cat._count?.products || 0} Items
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Right Scroll Button */}
                <button
                    onClick={() => scroll("next")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-600 hover:text-white rounded-full p-2 shadow-lg transition-all duration-300"
                    aria-label="Next category"
                    style={{ right: '-10px' }}
                >
                    <ArrowRightIcon className="h-5 w-5 text-gray-700 hover:text-white" />
                </button>
            </div>
        </div>
    );
}