"use client";

import React from 'react';
import SitePostForm from "@/components/admin/ecommerce/SitePostForm";

const SitePosts = () => {
    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <SitePostForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SitePosts;
