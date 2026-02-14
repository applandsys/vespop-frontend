"use client";

import React from 'react';
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";
import CommonCard from "@/components/ui/CommonCard";
import UserWishlist from "@/components/user/UserWishlist";

export default function UserWishlistPage(props) {

    const { token, customer } = GetCustomerData();

    const wishlistItems = [
        {
            id: 1,
            name: "Nike Air Sneakers",
            price: 129.99,
            image: "https://via.placeholder.com/80",
        },
        {
            id: 2,
            name: "Apple Watch Series 9",
            price: 399.0,
            image: "https://via.placeholder.com/80",
        },
        {
            id: 3,
            name: "Leather Backpack",
            price: 89.5,
            image: "https://via.placeholder.com/80",
        },
    ];

    return (
        <>
            <div className="mx-4">
                <CommonCard title="Wishlist">
                    <div className="w-full ">
                        <UserWishlist wishlistItems={wishlistItems}/>
                    </div>
                </CommonCard>
            </div>
        </>
    );
}
