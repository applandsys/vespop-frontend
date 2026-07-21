"use client";

import React, {useEffect, useState} from 'react';
import BannerUploadForm from "@/components/admin/ecommerce/BannerUploadForm";
import {fetchBanner} from "@/services/ecommerce/FetchBanner";
import BannerList from "@/components/admin/ecommerce/BannerList";
import {Card, CardHeader, CardTitle , CardContent } from "@/components/ui/shadcn/card";


export default function BannerSetting() {
    const [banners, setBanners] = useState([]);
    const [editBannerId, setEditBannerId] = useState(null);

    const loadBanners = async () => {
        const res = await fetchBanner();
        setBanners(res.data);
    };

    useEffect(() => {
        loadBanners();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div>
                <BannerUploadForm
                    bannerId={editBannerId}
                    onSuccess={() => {
                        setEditBannerId(null);
                        loadBanners();
                    }}
                    onCancel={() => setEditBannerId(null)}
                />
            </div>
            <div className="lg:col-span-2">
                <BannerList
                    banners={banners}
                    onEdit={(id) => setEditBannerId(id)}
                    onRefresh={loadBanners}
                />
            </div>
        </div>
    );
}

