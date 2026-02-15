'use client';

import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

import { fetchSettingData } from "@/services/site/SettingData";
import { getCategories } from "@/services/ecommerce/getCategories";
import config from "@/config";

export default function NavbarLeft() {

    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [siteLogo, setSiteLogo] = useState('logo.png');
    const [siteSetting, setSiteSetting] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetchSettingData(),
            getCategories(),
        ])
            .then(([settings, categories]) => {
                if (settings?.success) {
                    setSiteLogo(settings.data.logo);
                    setSiteSetting(settings.data);
                }
                setCategories(categories || []);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Loading..</div>;

    return (
        <>
            <nav className="relative">

                {/* Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* ================= SIDEBAR ================= */}
                <div
                    className={`fixed top-0 left-0 h-screen w-[350px] bg-white border border-green-100 shadow-lg z-50
                          transform transition-transform duration-300 ease-in-out
                          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                          flex flex-col`}
                >

                    {/* ===== Header (Fixed) ===== */}
                    <div className="flex items-center justify-between p-4 border-b shrink-0">
                        <Image
                            src={`${config.publicPath}/${siteLogo}`}
                            width={120}
                            height={40}
                            alt="logo"
                            priority
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white text-xl bg-green-700 rounded-full p-1 hover:bg-green-200"
                        >
                            <IoClose />
                        </button>
                    </div>

                    {/* ===== Scrollable Content ===== */}
                    <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y px-4 pb-6">

                        {/* Search */}
                        <div className="my-4">
                            <input
                                type="text"
                                placeholder="Search for items..."
                                className="w-full px-4 py-2 border rounded-full text-sm focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Categories */}
                        <div className="mb-2 font-semibold text-sm text-green-700 flex items-center gap-2">
                            <FiMenu className="w-4 h-4" />
                            Browse Categories
                        </div>

                        <ul className="space-y-2 text-sm mb-4">
                            {categories.length > 0 ? (
                                categories.map((item, idx) => (
                                    <li key={idx} className="border-b py-2">
                                        <Link
                                            href={`/category/${item.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-2"
                                        >
                                            <Image
                                                src={`${config.publicPath}/images/categories/${item.image}`}
                                                alt={item.name}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 rounded"
                                            />
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
                            <li  className="border-b py-2 cursor-pointer">
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li className="border-b py-2 cursor-pointer">
                                <Link href="/about">
                                    About
                                </Link>
                            </li>
                            <li className="border-b py-2 cursor-pointer">
                                <Link href="/contact">
                                    Contact
                                </Link>
                            </li>
                        </ul>

                        {/* Account */}
                        <div className="mt-6 border-t pt-4 text-sm space-y-2 text-gray-700">
                            <div>Our Location</div>
                            <div>Sign Up</div>
                            <div>Log In</div>
                            <div>{siteSetting.phone}</div>
                        </div>

                        {/* Social */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-500 mb-2">Follow Us</p>
                            <div className="flex gap-3">
                                {[FaFacebookF, FaTwitter, FaInstagram, FaPinterestP].map(
                                    (Icon, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full transition"
                                        >
                                            <Icon />
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= TOP BAR ================= */}
                <div className="flex justify-between mt-2 mx-2">

                    {/* Left */}
                    <div className="flex items-center">
                        <ul className="hidden md:flex space-x-6 text-xs">
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-blue-600">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                                    Contact
                                </Link>
                            </li>
                            <li><a href="#" className="hover:text-blue-500">Wishlist</a></li>
                            <li><a href="#" className="hover:text-blue-500">Order Tracking</a></li>
                        </ul>

                        {!isOpen && (
                            <button
                                onClick={() => setIsOpen(true)}
                                className="block md:hidden ml-2"
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
                        )}
                    </div>

                    {/* Right */}
                    <div className="text-xs md:text-sm text-right">
                        Need help? Call Us:{" "}
                        <span className="text-orange-600 font-bold">
              {siteSetting.phone}
            </span>
                    </div>
                </div>

            </nav>
        </>
    );
}
