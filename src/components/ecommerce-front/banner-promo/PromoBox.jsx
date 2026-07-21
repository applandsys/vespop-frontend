"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchBannerBySlug } from "@/services/site/BannerData";
import { getImageUrl } from "@/utils/R2Resolver";

const PromoBox = () => {
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchBannerBySlug("promo")
            .then((json) => {
                if (json.success) {
                    setBanners(json.data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const latestBanners = [...banners]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);

    if (loading) return <div className="p-4 text-center">Fetching Data...</div>;

    // Same structure as BrandCarousel - no wrapping div with padding
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {latestBanners.map((item, index) => (
                <Link
                    key={item.id}
                    href={item.url || "#"}
                    className="relative aspect-[16/9] rounded-xl overflow-hidden group cursor-pointer block"
                >
                    <Image
                        src={`${getImageUrl(item.image)}`}
                        alt={item.title_text}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                        <div className="transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                            {item.sub_text && (
                                <span className="inline-block bg-[#F48722] text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
                                    {item.sub_text}
                                </span>
                            )}
                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                {item.title_text}
                            </h3>
                            <p className="text-sm text-white/90 line-clamp-2">
                                {item.description || "Shop now and save big!"}
                            </p>
                            <span className="inline-flex items-center gap-1 mt-3 text-white text-sm font-semibold group-hover:gap-2 transition-all">
                                {item.url_text || "Shop Now"}
                                <span>→</span>
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PromoBox;