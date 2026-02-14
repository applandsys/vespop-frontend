"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import config from "@/config";
import { fetchBannerBySlug } from "@/services/site/BannerData";

const PromoCards = () => {
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
        .slice(0, 3);

    if (loading) return <div className="p-4">Fetching Data...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBanners.map((item, index) => (
                <div
                    key={item.id}
                    className="relative aspect-[16/9] rounded-xl overflow-hidden"
                >
                    {/* Image */}
                    <Image
                        src={`${config.publicPath}/images/banners/${item.image}`}
                        alt={item.title_text}
                        fill
                        className="object-cover"
                        priority={index < 3}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                {item.title_text}
                            </h3>
                            <p className="text-sm text-white/90 mt-1">
                                {item.sub_text}
                            </p>
                        </div>

                        {item.url && (
                            <a
                                href={item.url}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm w-max"
                            >
                                {item.url_text || "Shop Now →"}
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PromoCards;
