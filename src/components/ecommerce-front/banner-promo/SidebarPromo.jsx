"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchBannerBySlug } from "@/services/site/BannerData";
import { getImageUrl } from "@/utils/R2Resolver";

const SidebarPromo = ({ slug = "home-sidebar-promo" }) => {
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchBannerBySlug(slug)
            .then((json) => {
                if (json.success) {
                    setBanners(json.data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setBanners([]);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    const latestBanner = [...banners]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 1)[0];

    if (loading) {
        return (
            <div className="w-full h-full min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] bg-gray-100 animate-pulse ">
            </div>
        );
    }

    if (!latestBanner) {
        return (
            <div className="w-full h-full min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] bg-gray-100  flex items-center justify-center">
                <p className="text-gray-400 text-sm">No promo banner</p>
            </div>
        );
    }

    return (
        <Link href={latestBanner.url || "#"} className="block w-full h-full">
            <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]  overflow-hidden group shadow-lg">
                <Image
                    src={getImageUrl(latestBanner.image)}
                    alt={latestBanner.title_text || "Promo"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    {latestBanner.sub_text && (
                        <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1  mb-2">
                            {latestBanner.sub_text}
                        </span>
                    )}
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2">
                        {latestBanner.title_text}
                    </h3>
                    <span className="inline-block bg-white text-gray-900 px-4 py-2  text-sm font-semibold hover:bg-gray-100 transition">
                        {latestBanner.url_text || "Shop Now"} →
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default SidebarPromo;