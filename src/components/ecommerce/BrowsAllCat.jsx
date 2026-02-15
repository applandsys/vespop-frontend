'use client';

import { ListBulletIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import { getCategories } from '@/services/ecommerce/getCategories';
import Link from 'next/link';
import Image from 'next/image';
import config from '@/config';

export default function CategoryButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res))
            .finally(() => setLoading(false));
    }, []);

    // Close on outside click (desktop)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (loading) return null;

    return (
        <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen((p) => !p)}
                className="flex items-center justify-between bg-[#3bb77e] hover:bg-[#198754] text-white px-4 py-3 rounded w-full md:w-64 shadow-md transition-colors"
            >
                <ListBulletIcon className="h-5 w-5 mr-2" />
                <span className="flex-1 text-center font-semibold text-sm md:text-base">
                Browse all Categories
            </span>
                <ChevronDownIcon className="h-5 w-5 ml-2" />
            </button>

            {isOpen && (
                <>
                    {/* Overlay for mobile */}
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* ONE dropdown that adapts by screen size */}
                    <div
                        className="
                        fixed md:absolute
                        bottom-0 md:bottom-auto
                        left-0 md:left-0
                        right-0 md:right-auto
                        md:mt-2
                        w-full md:w-[520px]
                        bg-white
                        z-50
                        rounded-t-xl md:rounded-md
                        shadow-xl
                        border
                        animate-slideUp md:animate-none
                        max-h-[80vh] overflow-y-auto
                    "
                    >
                        {/* Header only for mobile */}
                        <div className="md:hidden sticky top-0 z-10 bg-white border-b">
                            <div className="flex items-center justify-between px-4 h-14">
                                <h2 className="font-semibold text-base">Categories</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close categories"
                                    className="flex items-center justify-center w-10 h-10 rounded-full active:bg-gray-100"
                                >
                                    <XMarkIcon className="w-6 h-6 text-gray-700" />
                                </button>
                            </div>
                        </div>


                        {/* Categories grid */}
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categories.map((item, idx) => (
                                <Link
                                    href={`/category/${item.slug}`}
                                    key={idx}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-[#f1fcf7]"
                                >
                                    <Image
                                        src={`${config.publicPath}/images/categories/${item.image}`}
                                        alt={item.name}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                    />
                                    <span className="font-medium text-gray-700">
                                    {item.name}
                                </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
