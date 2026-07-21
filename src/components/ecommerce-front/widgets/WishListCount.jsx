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
            {/* Added font-poppins and text-[12px] here to inherit font and size globally */}
            <div className="hover:text-black flex items-center relative group font-poppins text-[12px] text-[#323232]">
                <WishListIcon className="h-[18px] w-[19px] text-[#323232] transition-colors"/>
                <span className="ml-2 hidden sm:block">My Wish List</span>
            </div>
        </>
    );
};

export default WishListCount;