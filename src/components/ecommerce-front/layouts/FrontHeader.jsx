"use client";

import React from 'react';
import {usePathname} from "next/navigation";
import EcommerceHeader from "@/components/ecommerce-front/layouts/EcommerceHeader";

const FrontHeader = () => {

    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    return (
        <>
            {hasWord ?  "" : (<EcommerceHeader/>)}
        </>
    );
};

export default FrontHeader;