"use client";

import React, {useEffect, useState} from 'react';
import WishListIcon from "@/components/icons/WishListIcon";
import {fetchWishList} from "@/services/ecommerce/FetchWishList";
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";

const WishListCount = () => {
    const [wishListCount, setWishListCount] = useState(0);
    const { token } = GetCustomerData();

    useEffect(() => {
        fetchWishList(token).then(res=>setWishListCount(res.response.length)).catch(console.error);
    }, []);

    return (
        <>
            <div className="hover:text-blue-600 flex items-center relative group">
                <div className="relative">
                    <WishListIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-blue-600 transition-colors"/>
                    {wishListCount > 0 && (
                        <span
                            className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold px-1 rounded-full min-w-[18px] text-center">
                                    {wishListCount}
                                </span>
                    )}
                </div>
                <span className="ml-2 hidden sm:block text-sm lg:text-base">Wishlist</span>
            </div>
        </>
    );
};

export default WishListCount;