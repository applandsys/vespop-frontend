"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { clearLoginData } from "@/redux/store/slices/authSlice";
import { useRouter } from 'next/navigation';
import SearchInput from "@/components/ecommerce/widgets/SearchInput";
import config from "@/config";
import {fetchSettingData} from "@/services/site/SettingData";
import {getCategories} from "@/services/ecommerce/getCategories";
import ShoppingCart from "@/components/ecommerce/widgets/ShoppingCart";
import MyWishList from "@/components/ecommerce/widgets/MyWishList";
import MyAccount from "@/components/ecommerce/widgets/MyAccount";

const CartNav = () => {
    const { token, customer } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    const router = useRouter();

    const [siteLogo, setSiteLogo] = useState('logo.png');
    const [loading, setLoading] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close dropdown if clicked outside
    useEffect(() => {

        Promise.all([
            fetchSettingData(),
            getCategories(),
        ])
            .then(([settings, categories]) => {
                if (settings?.success) {
                    setSiteLogo(settings.data.logo);
                }
            })
            .finally(() => setLoading(false));

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLogout = () => {
        // Remove token from localStorage if you stored it there
        localStorage.removeItem('token');

        // Dispatch Redux logout
        dispatch(clearLoginData());

        // Redirect to homepage after logout
        router.replace('/');
        window.location.href = '/';
    };

    if (loading) return <div className="p-4">Loading..</div>;

    return (
        <nav className="flex flex-col md:flex-row justify-between px-6">
            <div className="flex justify-center">
                <div className="flex-shrink-0 mt-4">
                    <Link href="/" >
                        <Image
                            src={`${config.publicPath}/${siteLogo}`}
                            width={120}
                            height={40}
                            alt="logo"
                            priority
                        />
                    </Link>
                </div>
            </div>

            <div className="">
                <SearchInput />
                <div className="flex  mt-6 gap-4">
                    <ShoppingCart/>
                    <MyWishList/>
                    <MyAccount/>
                </div>
            </div>
        </nav>
    );
};

export default CartNav;