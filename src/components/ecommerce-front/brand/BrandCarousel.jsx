"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const brands = [
    { id: 1, image: "/images/brand/brand1.png", alt: "Brand 1" },
    { id: 2, image: "/images/brand/brand2.png", alt: "Brand 2" },
    { id: 3, image: "/images/brand/brand3.png", alt: "Brand 3" },
    { id: 4, image: "/images/brand/brand4.png", alt: "Brand 4" },
    { id: 5, image: "/images/brand/brand5.png", alt: "Brand 5" },
    { id: 6, image: "/images/brand/brand1.png", alt: "Brand 6" },
    { id: 7, image: "/images/brand/brand2.png", alt: "Brand 7" },
    { id: 8, image: "/images/brand/brand3.png", alt: "Brand 8" },
];

export default function BrandCarousel() {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const autoScrollInterval = useRef(null);
    const [itemsPerView, setItemsPerView] = useState(4);
    const totalBrands = brands.length;

    // Calculate items per view based on screen width
    useEffect(() => {
        const updateItemsPerView = () => {
            const width = window.innerWidth;
            if (width < 768) setItemsPerView(2);
            else setItemsPerView(4);
        };

        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    // Calculate total groups for radio buttons
    const totalGroups = Math.ceil(totalBrands / itemsPerView);
    const currentGroup = Math.floor(activeIndex / itemsPerView);

    // Scroll to specific brand index (1 card at a time)
    const scrollToIndex = (index) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const itemWidth = container.children[0]?.offsetWidth || 0;
        const gap = 16; // gap-4 = 16px
        const scrollPosition = index * (itemWidth + gap);

        container.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
        });
        setActiveIndex(index);
    };

    // Scroll to next (1 card at a time - NOT a group)
    const scrollToNext = () => {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= totalBrands) {
            nextIndex = 0;
        }
        scrollToIndex(nextIndex);
    };

    // Scroll to previous (1 card at a time - NOT a group)
    const scrollToPrev = () => {
        let prevIndex = activeIndex - 1;
        if (prevIndex < 0) {
            prevIndex = totalBrands - 1;
        }
        scrollToIndex(prevIndex);
    };

    // Auto-scroll every 3 seconds
    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, [activeIndex]);

    const startAutoScroll = () => {
        if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = setInterval(() => {
            scrollToNext();
        }, 3000);
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
            autoScrollInterval.current = null;
        }
    };

    const handleDotClick = (groupIndex) => {
        const targetIndex = groupIndex * itemsPerView;
        scrollToIndex(targetIndex);
        stopAutoScroll();
        setTimeout(() => {
            startAutoScroll();
        }, 5000);
    };

    return (
        <div className="w-full my-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4 px-4 md:px-8 lg:px-12">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Our Brands</h2>
                <Link
                    href="/brands"
                    className="text-[#F48722] hover:text-[#d4711a] font-semibold text-xs md:text-sm flex items-center gap-1"
                >
                    SEE ALL →
                </Link>
            </div>

            {/* Brand Carousel - Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                onMouseEnter={stopAutoScroll}
                onMouseLeave={startAutoScroll}
                className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollBehavior: "smooth"
                }}
            >
                {brands.map((brand, index) => (
                    <div
                        key={brand.id}
                        className="flex-shrink-0 w-[calc(50%-8px)] md:w-[calc(25%-12px)] snap-start group cursor-pointer"
                    >
                        <div className="p-2">
                            <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 hover:border-[#F48722] overflow-hidden">
                                <div className="relative w-full h-[75px] md:h-[95px] bg-gray-50 overflow-hidden">
                                    <Image
                                        src={brand.image}
                                        alt={brand.alt}
                                        fill
                                        className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Radio Buttons at Bottom - One per group */}
            <div className="flex justify-center gap-3 mt-6">
                {Array.from({ length: totalGroups }).map((_, groupIndex) => (
                    <button
                        key={groupIndex}
                        onClick={() => handleDotClick(groupIndex)}
                        onMouseEnter={stopAutoScroll}
                        onMouseLeave={startAutoScroll}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            currentGroup === groupIndex
                                ? "w-8 bg-[#F48722]"
                                : "w-2 bg-gray-300 hover:bg-[#F48722]"
                        }`}
                        aria-label={`Go to group ${groupIndex + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}