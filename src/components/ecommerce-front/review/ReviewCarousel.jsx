"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

const reviews = [
    {
        id: 1,
        name: "Farisha Akter Tumpa",
        title: "Entrepreneur",
        rating: 5,
        review: "I don't like ghee, but my father really loves it. So I bought some ghee for him. He said this ghee is the best he has ever had.",
        image: "/images/review/review2.jpg"
    },
    {
        id: 2,
        name: "Shahriar Khan Abir",
        title: "Service Holder",
        rating: 5,
        review: "ঘুরে আসার অভিজ্ঞতা। পণ্যের মান খুবই ভালো। সময়মতো ডেলিভারি পেয়েছি। সবার কাছে সুপারিশ করবো।",
        image: "/images/review/review3.jpg"
    },
    {
        id: 3,
        name: "Rasheda Begum",
        title: "Housewife",
        rating: 5,
        review: "আমি এই দোকান থেকে নিয়মিত কেনাকাটা করি। সবসময় ভালো পণ্য পাই। দামও সাশ্রয়ী। সেবা চমৎকার।",
        image: "/images/review/review4.jpg"
    },
    {
        id: 4,
        name: "Ayesha Khan",
        title: "Banker",
        rating: 5,
        review: "আমি খুব সন্তুষ্ট। পণ্যের মান খুবই ভালো। দ্রুত ডেলিভারি এবং ভালো সার্ভিস।",
        image: "/images/review/review1.jpg"
    },
    {
        id: 5,
        name: "Md. Ibrahim Hossain",
        title: "Businessman",
        rating: 5,
        review: "Excellent quality products and fast delivery. Customer service is very helpful.",
        image: "/images/review/review5.jpg"
    },
];

export default function ReviewCarousel() {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const autoScrollInterval = useRef(null);
    const [itemsPerView, setItemsPerView] = useState(3);
    const totalReviews = reviews.length;

    // Calculate items per view based on screen width
    useEffect(() => {
        const updateItemsPerView = () => {
            const width = window.innerWidth;
            if (width < 640) setItemsPerView(1);
            else if (width < 1024) setItemsPerView(2);
            else setItemsPerView(3);
        };

        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    const totalGroups = Math.ceil(totalReviews / itemsPerView);
    const currentGroup = Math.floor(activeIndex / itemsPerView);

    // Scroll to specific review index
    const scrollToIndex = (index) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const itemWidth = container.children[0]?.offsetWidth || 0;
        const gap = 24;
        const scrollPosition = index * (itemWidth + gap);

        container.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
        });
        setActiveIndex(index);
    };

    // Scroll to next (1 review at a time)
    const scrollToNext = () => {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= totalReviews) {
            nextIndex = 0;
        }
        scrollToIndex(nextIndex);
    };

    // Auto-scroll every 4 seconds
    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, [activeIndex]);

    const startAutoScroll = () => {
        if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = setInterval(() => {
            scrollToNext();
        }, 4000);
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

    // Render stars based on rating
    const renderStars = (rating) => {
        return (
            <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`w-5 h-5 ${i < rating ? "text-[#F48722]" : "text-gray-300"}`}
                    />
                ))}
            </div>
        );
    };

    // Calculate card width to fill exactly itemsPerView cards
    const getCardWidth = () => {
        if (itemsPerView === 1) return "w-full";
        if (itemsPerView === 2) return "w-[calc(50%-12px)]";
        return "w-[calc(33.333%-16px)]";
    };

    return (
        <div className="w-full my-12">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6 px-4 md:px-8 lg:px-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Customer Reviews</h2>
                <div className="text-right">
                    <p className="text-sm text-gray-500">★★★★★ 4.8 | 1,245+ reviews</p>
                </div>
            </div>

            {/* Review Carousel - Full width like brand section */}
            <div
                ref={scrollRef}
                onMouseEnter={stopAutoScroll}
                onMouseLeave={startAutoScroll}
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollBehavior: "smooth"
                }}
            >
                {reviews.map((review, index) => (
                    <div
                        key={review.id}
                        className={`flex-shrink-0 ${getCardWidth()} snap-start`}
                    >
                        <div className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-[#F48722] p-6 h-full mx-2">
                            <div className="flex flex-col h-full">
                                {/* Customer Image and Name Row */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                        <Image
                                            src={review.image}
                                            alt={review.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-base">
                                            {review.name}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {review.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating Stars */}
                                {renderStars(review.rating)}

                                {/* Review Text */}
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                    &quot;{review.review}&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Radio Buttons at Bottom */}
            <div className="flex justify-center gap-3 mt-8">
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
                        aria-label={`Go to review group ${groupIndex + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}