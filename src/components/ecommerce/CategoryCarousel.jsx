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

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((item, index) => (
                    <Link href={`/category/${item.slug}`}
                        key={index}
                        className="relative group overflow-hidden "
                    >
                        {/* Image */}

                        <Image
                            src={`${config.publicPath}/images/categories/${item.image}`}
                            alt="..."
                            width={60}
                            height={60}
                            className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-110"
                        />


                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                            <h3 className="text-white text-xl font-semibold tracking-widest uppercase">
                                {item.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
