"use client";

import React from 'react';
import EcommerceHeader from "@/components/layouts/ecommerce/EcommerceHeader";
import {usePathname} from "next/navigation";

const Header = () => {

    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    return (
        <>
            {hasWord ?  "" : (<EcommerceHeader/>)}
        </>
    );
};

export default Header;