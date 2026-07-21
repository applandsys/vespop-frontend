"use client";

import React from 'react';
import Image from 'next/image';
import {getImageUrl} from "@/utils/R2Resolver";

const LargeBanner = ({banners=[]}) => {
    return (
        <div className="">
            {banners.length && banners.map((banner, index) => (
                <div
                    key={index}
                    className={`bg-[${banner.backgroundColor}]`}
                >
                    <Image
                        src={`${getImageUrl(banner.image)}`}
                        alt={banner.title_text}
                        width={1280}
                        height={800}
                        className="w-full object-contain mx-auto"
                    />
                </div>
            ))}
        </div>
    );
};

export default LargeBanner;
