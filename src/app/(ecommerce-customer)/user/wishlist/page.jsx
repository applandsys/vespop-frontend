"use client";

import React, {useEffect, useState} from 'react';
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";
import CommonCard from "@/components/ui/CommonCard";
import UserWishlist from "@/components/user/UserWishlist";
import {fetchWishList} from "@/services/ecommerce/FetchWishList";

export default function UserWishlistPage(props) {

    const { token, customer } = GetCustomerData();

    const [wishList,setWishList] = useState([]);

    useEffect(() => {
        fetchWishList(token).then(res=>setWishList(res.response)).catch(console.error);
    }, []);


    return (
        <>
            <div className="mx-4">
                <CommonCard title="Wishlist">
                    <div className="w-full ">
                        <UserWishlist wishlistItems={wishList}/>
                    </div>
                </CommonCard>
            </div>
        </>
    );
}
