"use client";

import React from 'react';
import EcommerceHeader from "@/components/ecommerce-front/layouts/EcommerceHeader";
import {usePathname} from "next/navigation";

const UserHeader = () => {

    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    return (
        <>
            {hasWord ?  "" : (<EcommerceHeader/>)}
        </>
    );
};

export default UserHeader;