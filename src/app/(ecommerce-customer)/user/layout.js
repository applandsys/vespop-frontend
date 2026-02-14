"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import UserSidebar from "@/components/layouts/user/UserSidebar";


export default function UserLayout({ children  }) {
    const { token, customer } = useSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            route: '/user/dashboard'
        },
        {
            id: 2,
            name: 'Profile',
            route: '/user/profile'
        },
        {
            id: 3,
            name: 'Support',
            route: '/user/support'
        },
        {
            id: 4,
            name: 'Orders',
            route: '/user/orders'
        },
        {
            id: 5,
            name: 'Wishlist',
            route: '/user/wishlist'
        }
    ]

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && !customer) {
            router.push('/');
        }
    }, [isClient, customer, router]);

    if (!isClient) {
        return null;
    }


    return (
        <div className="min-h-screen flex flex-col">
                <main className="container  mt-4 mx-auto">
                    <div className="flex flex-col md:flex-row mx-4">
                        <UserSidebar menuList={menuList}/>
                      <div className="w-full">{children}</div>
                  </div>
                </main>
        </div>
    );
}
