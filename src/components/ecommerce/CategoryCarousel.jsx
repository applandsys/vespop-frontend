"use client";

import config from '@/config';
import React, {useEffect,  useState} from "react";
import Image from "next/image";
import {getCategories} from "@/services/ecommerce/getCategories";
import Link from "next/link";

export default function CategoryCarousel() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCategories().then((res) => {setCategories(res)}).catch(error => setError(error)).finally(setLoading(false));
    }, []);

    if (loading) {
        return (
            <p className="text-center mt-10 text-gray-600">
                Loading order details...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center mt-10 text-gray-600">
                {JSON.stringify(error)}
            </p>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {categories
                    .filter(item => item.hasLocation === true)
                    .map((item, index) => (
                        <Link
                            href={`/category/${item.slug}`}
                            key={index}
                            className="relative group overflow-hidden"
                        >
                            <Image
                                src={`${config.publicPath}/images/categories/${item.image}`}
                                alt={item.name}
                                width={600}
                                height={600}
                                className="w-full h-[160px] md:h-[260px] object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                                <h3 className="text-white text-sm md:text-xl font-semibold tracking-widest uppercase text-center px-2">
                                    {item.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
            </div>
        </section>
    );
}
