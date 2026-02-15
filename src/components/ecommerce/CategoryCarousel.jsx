"use client";

import config from '@/config';
import React, {useEffect, useRef, useState} from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import clsx from 'clsx';
import {getCategories} from "@/services/ecommerce/getCategories";
import Link from "next/link";

export default function CategoryCarousel() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCategories().then((res) => {setCategories(res)}).catch(error => setError(error)).finally(setLoading(false));
    }, []);

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const scrollAmount = 110;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "next" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-end py-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => scroll("prev")}
                        aria-label="Scroll left"
                        className="bg-gray-300 hover:bg-green-600 rounded-full p-2 shadow-lg z-30"
                    >
                        <ArrowLeftIcon className="h-4 w-4 text-gray-800" />
                    </button>
                    <button
                        onClick={() => scroll("next")}
                        aria-label="Scroll right"
                        className="bg-gray-300 hover:bg-green-600 rounded-full p-2 shadow-lg z-30"
                    >
                        <ArrowRightIcon className="h-4 w-4 text-gray-800" />
                    </button>
                </div>
            </div>
            {loading && <p className="text-center">Loading...</p>}
            <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory carauselSlider"
            >
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((cat,index) => (
                        <Link href={`/category/${cat.slug}`} key={index}>
                        <div
                            key={cat.id}
                            className={clsx('snap-start min-w-[100px] rounded-lg shadow-md p-1 text-center hover:shadow-lg transition', {
                                [`bg-[${cat.color}]`]: cat.color,
                            })}
                            style={{ backgroundColor: cat.color }}
                        >
                            <div className="rounded-xl overflow-hidden">
                                <Image
                                    src={`${config.publicPath}/images/categories/${cat.image}`}
                                    alt="..."
                                    width={60}
                                    height={60}
                                    className="mx-auto w-full object-cover p-1"
                                />

                                <div className="text-center">
                                    <h2 className="text-xs font-semibold">{cat.name}</h2>
                                    <span className="text-xs">{cat._count.products} Items</span>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))
                ) : !loading && (
                    <p className="text-center w-full">No categories found</p>
                )}
            </div>
        </div>
    );
}
