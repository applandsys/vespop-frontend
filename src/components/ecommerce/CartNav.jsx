"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CartIcon from "@/components/icons/ShoppingCartIcon";
import UserIcon from "@/components/icons/UserIcon";
import CartDropdown from "@/components/ecommerce/CartDropdown";
import { useSelector } from "react-redux";
import Link from "next/link";
import { HomeIcon, PowerIcon,  XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux';
import { clearLoginData } from "@/redux/store/slices/authSlice";
import { useRouter } from 'next/navigation';
import SearchInput from "@/components/ecommerce/widgets/SearchInput";
import config from "@/config";
import {fetchSettingData} from "@/services/site/SettingData";
import {getCategories} from "@/services/ecommerce/getCategories";
import WishListCount from "@/components/ecommerce/widgets/WishListCount";

const CartNav = () => {
    const { token, customer } = useSelector((state) => state.auth);
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.length;
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

    const handleCloseCart = () => {
        setShowCart(false);
    };

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
        <nav className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 lg:px-6 lg:py-3">
            {/* Logo Section - Responsive */}
            <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src={`${config.publicPath}/${siteLogo}`}
                        width={120}
                        height={40}
                        alt="logo"
                        priority
                    />
                </Link>
            </div>

            {/* Search Section - Responsive */}
            <div className="w-full lg:w-2/3 xl:w-1/2 flex-1 max-w-2xl">
                <div className="flex items-center rounded-md w-full px-3 py-2">
                    <SearchInput />
                </div>
            </div>

            {/* Icons Section - Responsive */}
            <div className="w-full lg:w-auto">
                <div className="flex items-center justify-between lg:justify-end lg:space-x-6 text-gray-700 font-medium">
                    {/* Wishlist */}
                   <WishListCount/>

                    {/* Cart */}
                    <div
                        className="hover:text-blue-600 flex items-center relative group cursor-pointer"
                        onClick={() => setShowCart(!showCart)}
                    >
                        <div className="relative">
                            <CartIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-blue-600 transition-colors"/>
                            {cartCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold px-1 rounded-full min-w-[18px] text-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span className="ml-2 hidden sm:block text-sm lg:text-base">Cart</span>

                        {/* Desktop Dropdown */}
                        <div className="hidden lg:block absolute right-0 top-10">
                            {showCart && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
                                    <CartDropdown onClose={handleCloseCart}/>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Full Screen Modal */}
                    {showCart && (
                        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h3 className="text-lg font-semibold">Your Cart</h3>
                                    <button
                                        onClick={handleCloseCart}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <CartDropdown onClose={handleCloseCart}/>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Account */}
                    <div className="relative flex items-center group" ref={dropdownRef}>
                        {!customer ? (
                            <Link
                                href="/auth/login"
                                className="hover:text-blue-600 flex items-center transition-colors"
                            >
                                <UserIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600"/>
                                <span className="ml-2 hidden sm:block text-sm lg:text-base">Login</span>
                            </Link>
                        ) : (
                            <>
                                <div
                                    onClick={toggleDropdown}
                                    className="flex items-center cursor-pointer group"
                                >
                                    <UserIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-blue-600 transition-colors"/>
                                    <button className="hover:text-blue-600 flex items-center">
                                        <span className="ml-2 hidden sm:block text-sm lg:text-base">Account</span>
                                    </button>
                                </div>

                                {isOpen && (
                                    <div
                                        className="absolute right-0 mt-2 lg:mt-[150px] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                                        <div
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <HomeIcon className="h-4 w-4 mr-3"/>
                                            <Link
                                                href="/user/dashboard"
                                                className="text-gray-600 hover:text-blue-600 font-medium"
                                            >
                                                Dashboard
                                            </Link>
                                        </div>

                                        <div
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <UserIcon className="h-4 w-4 mr-3"/>
                                            Profile
                                        </div>

                                        <div className="border-t border-gray-100 my-1"></div>

                                        <div
                                            onClick={handleLogout}
                                            className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            <PowerIcon className="h-4 w-4 mr-3"/>
                                            Logout
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CartNav;