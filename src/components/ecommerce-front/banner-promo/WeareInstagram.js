"use client";

import React, { useEffect, useState } from 'react';
import { getWidgetBySlug } from "@/services/widget/WidgetService";
import { getImageUrl } from "@/utils/R2Resolver";

export default function WeareInstagram() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [widgets, setWidgets] = useState([]);

    useEffect(() => {
        getWidgetBySlug('instagram')
            .then(res => setWidgets(res.data.data))
            .catch(console.error);
    }, []);

    // Fallback if data is empty
    if (!widgets || widgets.length === 0) {
        return <div className="text-center py-8 text-gray-500">No items available.</div>;
    }

    // Maximum items visible simultaneously on large screens
    const visibleItems = 5;

    // Fixed: Now accurately calculates max scroll index based on the fetched widgets array length
    const maxIndex = widgets.length > visibleItems ? widgets.length - visibleItems : 0;

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setCurrentIndex(0); // Loops back to the start
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else {
            setCurrentIndex(maxIndex); // Loops to the end
        }
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 py-8 relative group">
            <div className="overflow-hidden rounded-lg">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        // Fixed: Removed the accidental period after the closing bracket and bound to widgets length
                        transform: `translateX(-${currentIndex * (100 / Math.min(widgets.length, visibleItems))}%)`,
                        width: widgets.length < visibleItems ? '100%' : `${(widgets.length / visibleItems) * 100}%`
                    }}
                >
                    {widgets.map((item) => (
                        <div
                            key={item.id}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex-shrink-0 p-1 select-none"
                        >
                            <div
                                className={`relative aspect-square overflow-hidden border border-zinc-800/10 shadow-sm bg-zinc-900 ${item.cssClasses || ''}`}
                                style={{
                                    backgroundColor: item.backgroundColor || undefined,
                                    borderColor: item.borderColor || undefined
                                }}
                            >
                                <img
                                    src={getImageUrl(item.image)}
                                    alt={item.title || item.name}
                                    className="w-full h-full object-cover pointer-events-none"
                                />

                                {/* Brand watermark badge */}
                                <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] tracking-widest font-bold px-2 py-0.5 border border-white/20 uppercase">
                                    Dorjibari Demo
                                </div>

                                {item.title && item.title !== "asdf" && (
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
                                        <p className="text-sm font-semibold truncate">{item.title}</p>
                                        {item.subTitle && <p className="text-xs text-gray-300 truncate">{item.subTitle}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fixed: Now correctly checks widgets array length so arrows display when items exceed view capacity */}
            {widgets.length > visibleItems && (
                <>
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 -left-2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 transition-all focus:outline-none"
                        aria-label="Previous Slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 -right-2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 transition-all focus:outline-none"
                        aria-label="Next Slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
}