"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import config from "@/config";
import { fetchBannerBySlug } from "@/services/site/BannerData";

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

    return (
        <div className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden">
            {banners.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <div className="absolute w-full md:w-1/2 inset-0 flex justify-center text-left ml-4 sm:ml-10 z-20 flex-col pointer-events-none">
                        <h1
                            className="text-[1.3rem] lg:text-6xl font-bold drop-shadow-lg mb-2 text-center md:text-left lg:text-left w-full text-black">
                            {item.title_text}
                        </h1>
                        <div className="relative text-wrap flex-wrap py-4 px-6">
                            <h2
                                className="ext-base text-[15px] sm:text-xl md:text-xl max-w-md mb-6 text-center md:text-left lg:text-left  text-black">
                                {item.sub_text}
                            </h2>
                        </div>
                    </div>
                    <Image
                        src={`${config.publicPath}/images/banners/${item.image}`}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                        priority={index === 0}
                    />
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-lg z-10"
            >
                <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-lg z-10"
            >
                <ArrowRightIcon className="h-6 w-6 text-gray-800" />
            </button>
        </div>
    );
}
