"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import config from '@/config';

const images = [
    {
        title: "Don't miss Amazing Grocery Deal",
        subtTitle: "Sign up for the daily news letter",
        path: `${config.publicPath}/images/slider/slider-1.png`,
    },
    {
        title: "Fresh Vegetables Big Discount",
        subtTitle: "Save upto 50% off on your first order",
        path: `${config.publicPath}/images/slider/slider-2.png`,
    },
];

export default function ImgSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-3xl">
            {images.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === current ? "opacity-100 z-2" : "opacity-0 z-0"
                    }`}
                >
                    {/* Text Layer */}
                    <div className="absolute w-full md:w-1/2 inset-0 flex justify-center text-left ml-4 sm:ml-10 z-10 flex-col">
                        <h1 className="text-gray-950 md:text-6xl font-bold drop-shadow-lg mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                            {item.title}
                        </h1>
                        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700">
                            {item.subtTitle}
                        </h2>
                    </div>

                    {/* Background Image */}
                    <Image
                        src={item.path}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                    />
                </div>
            ))}

            {/* Left Arrow */}
            <button
                onClick={() =>
                    setCurrent((prev) => (prev - 1 + images.length) % images.length)
                }
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-2 shadow-lg z-3"
            >
                <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
            </button>

            {/* Right Arrow */}
            <button
                onClick={() =>
                    setCurrent((prev) => (prev + 1) % images.length)
                }
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-2 shadow-lg z-3"
            >
                <ArrowRightIcon className="h-6 w-6 text-gray-800" />
            </button>
        </div>
    );
}