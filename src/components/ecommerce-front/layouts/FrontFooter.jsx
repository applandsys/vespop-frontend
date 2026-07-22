"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchSettingData } from "@/services/site/SettingData";


export default function FrontFooter() {
    const pathname = usePathname();
    const hasWord = pathname?.includes('admin') || false;
    const [siteInfo,setSiteInfo] = useState([])

    useEffect(() => {
        fetchSettingData()
            .then((setting) => {
                if (setting?.data) {
                    setSiteInfo(setting.data)
                }
            })
            .catch((error) => {
                console.error("Error fetching settings:", error);
            });
    }, []);

    // Admin footer
    if (hasWord) {
        return (
            <footer className="container mx-auto mt-12">
                <hr />
                <div className="container flex flex-col md:flex-row justify-between bottom-footer mt-4">
                    <div className="py-4 text-center md:text-left">
                        <div className="text-xs">© 2026  {siteInfo.site_name}. All rights reserved</div>
                    </div>
                </div>
            </footer>
        );
    }

    // Main footer
    return (
        <footer className="mt-12 bg-white border-t border-gray-200">
            <div className="picture-like-container">
                <div className="content-max-width">

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12">

                        {/* Column 1 - Logo, Info, Social Icons & Download App */}
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                {siteInfo.site_name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                {siteInfo.site_name} is an e-commerce platform dedicated to providing safe and reliable food to every home.
                            </p>
                            <div className="space-y-2 text-sm text-gray-500">
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {siteInfo.address}
                                </p>
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {siteInfo.phone}
                                </p>
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {siteInfo.email}
                                </p>
                            </div>

                            {/* Social Media Icons - Below Address */}
                            <div className="mt-6">
                                <p className="text-sm font-semibold text-gray-800 mb-3">Follow Us :</p>
                                <div className="flex gap-3">
                                    {/* Facebook */}
                                    <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                                        </svg>
                                    </Link>
                                    {/* Twitter */}
                                    <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#1DA1F2] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.46-11.706c0-.21-.003-.42-.015-.63a9.935 9.935 0 002.441-2.54z"/>
                                        </svg>
                                    </Link>
                                    {/* Instagram */}
                                    <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#E4405F] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                        </svg>
                                    </Link>
                                    {/* LinkedIn */}
                                    <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#0077B5] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.778-.773 1.778-1.729V1.729C24 .774 23.205 0 22.225 0z"/>
                                        </svg>
                                    </Link>
                                    {/* YouTube */}
                                    <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#FF0000] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <svg className="w-5 h-5 text-gray-600 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Download App Section - Below Social Icons */}
                            <div className="mt-6">
                                <p className="text-sm font-semibold text-gray-800 mb-3">Download App on Mobile :</p>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08l.01.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                        </svg>
                                        <span className="text-xs">Google Play</span>
                                    </button>
                                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 15.36 5.68 9.24 8.1 8.6c1.31-.27 2.55.87 3.35.87.79 0 2.28-1.08 3.85-.92.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.27-2.15 3.81.03 2.96 2.58 3.96 2.61 3.97-.02.08-.41 1.41-1.35 2.79l.01.01zM14.5 8.27c.27-1.06.97-2.05 2.03-2.63-.96-.75-2.2-1.09-3.5-.98-.28 1.35-.85 2.55-1.85 3.61 1.15.12 2.39-.24 3.32-1v0z"/>
                                        </svg>
                                        <span className="text-xs">App Store</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 - Information */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Information</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">About us</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Contact us</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Company information</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Ghorer Bazar Stories</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Terms & Conditions</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Privacy Policy</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Careers</Link></li>
                            </ul>
                        </div>

                        {/* Column 3 - Shop By */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Shop By</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Oil & Ghee</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Honey</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Dates</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Spices</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Nuts & Seeds</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Beverage</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Functional Foods</Link></li>
                            </ul>
                        </div>

                        {/* Column 4 - Support */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Support Center</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">How to Order</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Order Tracking</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Payment</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Shipping</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">FAQ</Link></li>
                            </ul>
                        </div>

                        {/* Column 5 - Consumer Policy */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">Consumer Policy</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Happy Return</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Refund Policy</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Exchange</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Cancellation</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Pre-Order</Link></li>
                                <li><Link href="#" className="text-gray-500 hover:text-[#F48722] transition">Extra Discount</Link></li>
                            </ul>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Copyright and Payment Image Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 py-6">
                        {/* Copyright */}
                        <div className="text-center lg:text-left">
                            <p className="text-sm text-gray-500">
                                Copyright © 2026  {siteInfo.site_name}
                            </p>
                        </div>

                        {/* Payment Image - Increased Size */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/footer-payment-method.png"
                                width={600}
                                height={120}
                                alt="Payment Methods"
                                className="h-[120px] w-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}