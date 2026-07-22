"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import config from "@/config";
import { fetchBannerBySlug } from "@/services/site/BannerData";
import { getImageUrl } from "@/utils/R2Resolver";

export default function ImgSlider() {
    const [current, setCurrent] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchBannerBySlug("slider")
            .then((json) => {
                if (json.success) setBanners(json.data);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    const nextSlide = () => {
        if (banners.length === 0) return;
        setCurrent((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        if (banners.length === 0) return;
        setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    };

    if (loading) return <div className="p-4">Fetching Data ...</div>;
    if (banners.length === 0) return null;

    return (
        /* The container now breaks out to full screen width. Height is completely auto. */
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw] overflow-hidden shadow-lg bg-gray-50">
            {banners.map((item, index) => {
                const isActive = index === current;
                return (
                    <div
                        key={index}
                        className={`transition-opacity duration-1000 ${
                            isActive
                                ? "opacity-100 relative z-10 block"
                                : "opacity-0 absolute inset-0 z-0 hidden"
                        }`}
                    >
                        {/* Text Overlay */}
                        <div className="absolute w-full md:w-1/2 inset-0 flex justify-center text-left ml-4 sm:ml-10 z-20 flex-col pointer-events-none">
                            {/*<h1 className="text-[1.3rem] lg:text-4xl xl:text-5xl font-bold drop-shadow-lg mb-2 text-center md:text-left text-black">*/}
                            {/*    {item.title_text}*/}
                            {/*</h1>*/}
                            <div className="relative text-wrap flex-wrap py-4 px-6">
                                {/*<h2 className="text-base text-[15px] sm:text-xl md:text-lg max-w-md mb-6 text-center md:text-left text-black">*/}
                                {/*    {item.sub_text}*/}
                                {/*</h2>*/}
                            </div>
                        </div>

                        {/* By using standard unstyled img tags (or Next.js without 'fill'),
                          the layout respects width: 100% and height: auto perfectly.
                        */}
                        <img
                            src={`${getImageUrl(item.image)}`}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-auto block pointer-events-none"
                        />
                    </div>
                );
            })}

            {/* Navigation Controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-lg z-30"
            >
                <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-lg z-30"
            >
                <ArrowRightIcon className="h-6 w-6 text-gray-800" />
            </button>
        </div>
    );
}