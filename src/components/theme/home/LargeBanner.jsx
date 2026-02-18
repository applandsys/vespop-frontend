"use client";

import React, {useEffect, useState} from 'react';
import config from '@/config';
import Image from 'next/image';

const PromoCards = ({banners}) => {

    return (
        <div className="">
            {banners.length && banners.map((banner, index) => (
                <div
                    key={index}
                    className={`bg-[${banner.backgroundColor}]`}
                >
                    <Image
                        src={`${config.publicPath}/images/banners/${banner.image}`}
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

export default PromoCards;
