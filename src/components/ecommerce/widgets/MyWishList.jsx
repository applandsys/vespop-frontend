"use client";

import React from 'react';
import WishListIcon from "@/components/icons/WishListIcon";

const MyWishList = () => {
    const wishListCount = 1;
    return (
        <div>
            <div className="hover:text-black-600 flex items-center relative group">
                <div className="relative">
                    <WishListIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-black-600 transition-colors"/>
                        <span
                            className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs font-semibold px-1 rounded-full min-w-[18px] text-center">
                            {wishListCount}
                        </span>

                </div>
                <span className="ml-2 hidden sm:block text-xs">Wishlist</span>
            </div>
        </div>
    );
};

export default MyWishList;