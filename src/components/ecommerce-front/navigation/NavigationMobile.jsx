'use client';

import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

import { fetchSettingData } from "@/services/site/SettingData";
import { getCategories } from "@/services/ecommerce/getCategories";
import { getImageUrl } from "@/utils/R2Resolver";

export default function NavigationMobile() {

    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [siteLogo, setSiteLogo] = useState('logo.png');
    const [siteSetting, setSiteSetting] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Add error handling for API calls
        Promise.all([
            fetchSettingData().catch(err => {
                console.error("Error fetching settings:", err);
                return { success: false };
            }),
            getCategories().catch(err => {
                console.error("Error fetching categories:", err);
                return [];
            }),
        ])
            .then(([settings, categoriesData]) => {
                if (settings?.success) {
                    setSiteLogo(settings.data.logo || 'logo.png');
                    setSiteSetting(settings.data);
                }
                setCategories(categoriesData || []);
            })
            .catch(err => {
                console.error("Error loading data:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    // Don't return loading state, just show minimal UI
    if (loading) {
        return (
            <nav className="block lg:hidden">
                <div className="flex justify-between items-center p-3 bg-white shadow-sm">
                    <button className="p-2 rounded-md hover:bg-gray-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-8"></div>
                </div>
            </nav>
        );
    }

    return (
        <>
            {/* Only show on mobile/tablet - hidden on large screens */}
            <nav className="block lg:hidden relative">

                {/* Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* ================= SIDEBAR ================= */}
                <div
                    className={`fixed top-0 left-0 h-screen w-[85%] max-w-[350px] bg-white shadow-lg z-50
                          transform transition-transform duration-300 ease-in-out
                          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                          flex flex-col`}
                >

                    {/* ===== Header (Fixed) ===== */}
                    <div className="flex items-center justify-between p-4 border-b shrink-0">
                        <Link href="/" onClick={() => setIsOpen(false)}>
                            {siteLogo && (
                                <Image
                                    src={getImageUrl(siteLogo)}
                                    width={120}
                                    height={40}
                                    alt="logo"
                                    priority
                                />
                            )}
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white text-xl bg-green-700 rounded-full p-1 hover:bg-green-200 transition-colors"
                            aria-label="Close menu"
                        >
                            <IoClose />
                        </button>
                    </div>

                    {/* ===== Scrollable Content ===== */}
                    <div className="flex-1 overflow-y-auto px-4 pb-6">

                        {/* Search */}
                        <div className="my-4">
                            <input
                                type="text"
                                placeholder="Search for items..."
                                className="w-full px-4 py-2 border rounded-full text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>

                        {/* Categories */}
                        <div className="mb-2 font-semibold text-sm text-green-700 flex items-center gap-2">
                            <FiMenu className="w-4 h-4" />
                            Browse Categories
                        </div>

                        <ul className="space-y-2 text-sm mb-4">
                            {categories.length > 0 ? (
                                categories.slice(0, 10).map((item, idx) => (
                                    <li key={idx} className="border-b py-2">
                                        <Link
                                            href={`/category/${item.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-2 hover:pl-1 transition-all"
                                        >
                                            {item.image && (
                                                <Image
                                                    src={getImageUrl(item.image)}
                                                    alt={item.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 rounded object-cover"
                                                />
                                            )}
                                            <span className="text-xs font-semibold text-gray-700 hover:text-green-500">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 text-xs">No categories found</li>
                            )}
                        </ul>

                        {/* Static Links */}
                        <ul className="space-y-2 text-sm">
                            <li className="border-b py-2 cursor-pointer hover:pl-1 transition-all">
                                <Link href="/" onClick={() => setIsOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li className="border-b py-2 cursor-pointer hover:pl-1 transition-all">
                                <Link href="/about" onClick={() => setIsOpen(false)}>
                                    About
                                </Link>
                            </li>
                            <li className="border-b py-2 cursor-pointer hover:pl-1 transition-all">
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    Contact
                                </Link>
                            </li>
                            <li className="border-b py-2 cursor-pointer hover:pl-1 transition-all">
                                <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                                    Wishlist
                                </Link>
                            </li>
                            <li className="border-b py-2 cursor-pointer hover:pl-1 transition-all">
                                <Link href="/order/tracking" onClick={() => setIsOpen(false)}>
                                    Order Tracking
                                </Link>
                            </li>
                        </ul>

                        {/* Account Links */}
                        <div className="mt-6 border-t pt-4 text-sm space-y-2 text-gray-700">
                            <Link href="/user/signup" onClick={() => setIsOpen(false)}>
                                <div className="hover:text-green-600 cursor-pointer transition-colors">
                                    Sign Up
                                </div>
                            </Link>
                            <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                <div className="hover:text-green-600 cursor-pointer transition-colors">
                                    Log In
                                </div>
                            </Link>
                            <div className="font-medium text-green-700 mt-2">
                                {siteSetting.phone || 'Call Us'}
                            </div>
                        </div>

                        {/* Social */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-500 mb-2">Follow Us</p>
                            <div className="flex gap-3">
                                {siteSetting.facebook_url && (
                                    <a
                                        href={siteSetting.facebook_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full transition-all duration-200"
                                        aria-label="Facebook"
                                    >
                                        <FaFacebookF size={14} />
                                    </a>
                                )}
                                <a
                                    href="#"
                                    className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full transition-all duration-200"
                                    aria-label="Twitter"
                                >
                                    <FaTwitter size={14} />
                                </a>
                                {siteSetting.instagram_url && (
                                    <a
                                        href={siteSetting.instagram_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full transition-all duration-200"
                                        aria-label="Instagram"
                                    >
                                        <FaInstagram size={14} />
                                    </a>
                                )}
                                <a
                                    href="#"
                                    className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full transition-all duration-200"
                                    aria-label="Pinterest"
                                >
                                    <FaPinterestP size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= MOBILE MENU BUTTON ================= */}
                <div className="flex justify-between items-center p-3 bg-white shadow-sm">
                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="Open menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Mobile Logo */}
                    <Link href="/">
                        {siteLogo && (
                            <Image
                                src={getImageUrl(siteLogo)}
                                width={100}
                                height={32}
                                alt="logo"
                                priority
                            />
                        )}
                    </Link>

                    {/* Mobile Icons Placeholder */}
                    <div className="w-8"></div>
                </div>
            </nav>
        </>
    );
}