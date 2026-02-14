"use client";

import React, {useEffect, useState} from 'react';
import BannerUploadForm from "@/components/admin/ecommerce/BannerUploadForm";
import {fetchBanner} from "@/services/ecommerce/FetchBanner";
import BannerList from "@/components/admin/ecommerce/BannerList";


const BannerSetting = () => {

    const [banners, setBanners] = useState([]);

    const getBanners = async () => {
        fetchBanner().then(res=>{setBanners(res.data)});
    }

    useEffect(() => {
        fetchBanner().then(res=>{setBanners(res.data)});
    }, []);


    return (

        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-3 gap-2 px-2">
                    <div className="col-span-1">
                        <BannerUploadForm getBanners={getBanners} />
                    </div>

                    <div className="col-span-2">
                       <BannerList banners={banners} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerSetting;
