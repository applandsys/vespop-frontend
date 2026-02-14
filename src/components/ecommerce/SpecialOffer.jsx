"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import config from "@/config";
import {fetchBannerBySlug} from "@/services/site/BannerData";

const SpecialOffer = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [banners, setBanners] = useState('logo.png');

    useEffect(() => {
        fetchBannerBySlug('promo').then((json) => {
            if (json.success) {
                setBanners(json.data);
            }
        }).catch(error => setError(error)
        ).finally(setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Fetching Data ...</div>;

    return (
        <section className="w-full bg-white py-6 sm:py-10">
            <div className="mx-auto max-w-7xl px-4">
                <div className="relative">
                    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                        <div className="lg:w-1/2">
                            <div className="relative h-56 w-full overflow-hidden rounded-lg group sm:h-72 md:h-96">
                                {banners?.[0]?.image && (
                                    <Image
                                        src={`${config.publicPath}/images/banners/${banners?.[0]?.image ?? ''}`}
                                        alt="Promotional Banner"
                                        fill
                                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                    )
                                }
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="relative h-56 w-full overflow-hidden rounded-lg group sm:h-72 md:h-96">
                                {banners?.[0]?.image && (
                                    <Image
                                        src={`${config.publicPath}/images/banners/${banners?.[1]?.image ?? ''}`}
                                        alt="Promotional Banner"
                                        fill
                                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex w-full justify-center md:mt-0 md:absolute md:left-1/2 md:top-1/2 md:z-10 md:-translate-x-1/2 md:-translate-y-1/2">
                        <div className="w-full sm:max-w-sm bg-[#fefaf6] rounded-lg p-4 sm:p-6 shadow-2xl border border-[#f5f5f0] text-center">
                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="text-sm sm:text-base font-light text-gray-600 uppercase tracking-wide">
                                    Special Offer!
                                </h3>

                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                    This Week Only
                                </h2>

                                <p className="text-sm sm:text-base text-gray-600 font-light">
                                    Reserved for special occasions
                                </p>

                                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors font-medium w-full text-sm">
                                    Explore Collection
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">14-Day Returns</h4>
                            <p className="text-gray-600 text-sm mt-1">Risk-free shopping with easy returns.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                            <p className="text-gray-600 text-sm mt-1">No extra costs, just the price you see.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                            <p className="text-gray-600 text-sm mt-1">24/7 support, always here just for you.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Member Discounts</h4>
                            <p className="text-gray-600 text-sm mt-1">Special prices for our loyal customers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;
