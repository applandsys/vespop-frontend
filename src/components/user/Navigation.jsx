"use client";

import React from 'react';
import CategoryButton from "@/components/ecommerce-front/product/BrowsAllCat";
import HorizontalMenu from "@/components/ecommerce-front/navigation/HorizontalMenu";

const Navigation = () => {


    return (
        <>
            <nav>
                <div className="flex justify-between items-center w-full">
                    <div className="flex w-full">
                        <CategoryButton/>
                        <div className="flex items-center px-4">
                            <HorizontalMenu menuData={navigation} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;