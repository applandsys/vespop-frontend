"use client";

import React, {useEffect, useState} from 'react';
import SiteSettingForm from "@/components/admin/ecommerce/SiteSettingForm";
import {fetchSettingData} from "@/services/site/SettingData";

const SiteSetting = () => {

    const [siteData, setSiteData] = useState([]);
    useEffect(() => {
        fetchSettingData().then(res=>{setSiteData(res)});
    }, []);

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <h3>Site Setting</h3>
                    <div>
                        <SiteSettingForm siteData={siteData}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteSetting;
