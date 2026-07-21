"use client";

import React, {useEffect, useState} from 'react';
import LargeBanner from "./LargeBanner";
import {fetchBannerBySlug} from "@/services/site/BannerData";

const HomeBannerTwo = () => {
    const [banners, setBannersOne] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBannerBySlug('home-2').then((json) => {
            if (json.success) {
                setBannersOne(json.data);
            }
        }).catch(error => setError(error)
        ).finally(setLoading(false));
    }, []);

    if (loading) return <div className="p-4">...</div>;
    return (
        <>
           <LargeBanner banners={banners} />
        </>
    );
};

export default HomeBannerTwo;