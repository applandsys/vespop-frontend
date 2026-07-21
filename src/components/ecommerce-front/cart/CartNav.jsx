"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CartIcon from "@/components/icons/ShoppingCartIcon";
import UserIcon from "@/components/icons/UserIcon";
import { useSelector } from "react-redux";
import Link from "next/link";
import { HomeIcon, PowerIcon,  XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux';
import { clearLoginData } from "@/redux/store/slices/authSlice";
import { useRouter } from 'next/navigation';
import {fetchSettingData} from "@/services/site/SettingData";
import {getCategories} from "@/services/ecommerce/getCategories";
import SearchInput from "@/components/ecommerce-front/widgets/SearchInput";
import WishListCount from "@/components/ecommerce-front/widgets/WishListCount";
import CartDropdown from "@/components/ecommerce-front/cart/CartDropdown";
import {getImageUrl} from "@/utils/R2Resolver";

const CartNav = () => {
    const { token, customer } = useSelector((state) => state.auth);
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.length;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    const router = useRouter();

    const [siteLogo, setSiteLogo] = useState(null);
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

    // Added font-poppins to the loading fallback text
    if (loading) return <div className="p-4 font-poppins">Loading..</div>;

    return (
        // Added font-poppins here to ensure all nested elements inherit the font
        <nav className="flex flex-col lg:flex-row items-center justify-between font-poppins">
            {/* Logo Section - Responsive */}
            <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src={`${getImageUrl(siteLogo)}`}
                        width={180}
                        height={100}
                        alt="logo"
                        priority
                    />
                </Link>
            </div>

            {/* Icons Section - Responsive */}
            <div className="w-full lg:w-auto">
                <div className="flex justify-end w-full mb-2">
                    <SearchInput />
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-3 lg:gap-6 text-[#323232] font-normal">
                    {/* Cart */}
                    <div
                        className="hover:text-black flex items-center relative group cursor-pointer"
                        onClick={() => setShowCart(!showCart)}
                    >
                        {/* Changed to flex and items-center to align icon and badge horizontally */}
                        <div className="flex items-center gap-1">
                            <CartIcon className="h-5 w-5 text-[#323232] transition-colors"/>
                        </div>
                        <span className="ml-2 hidden sm:block text-[12px]">Shopping Cart</span>

                        <div className="ml-2">
                            <span
                                className="bg-[#ffe5e8] text-[#323232] text-[10px] font-semibold rounded-full w-[23px] h-[23px] flex items-center justify-center">
                                {cartCount}
                            </span>
                        </div>

                        {/* Desktop Dropdown */}
                        <div className="hidden lg:block absolute right-0 top-10">
                            {showCart && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
                                    <CartDropdown onClose={handleCloseCart}/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        {/* Wishlist */}
                        <WishListCount/>
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
                    <div className="relative flex items-center group font-poppins" ref={dropdownRef}>
                        {!customer ? (
                            <div className="flex items-center text-[12px] font-poppins">
                                <Link
                                    href="/auth/login"
                                    className="text-[#323232] hover:underline"
                                >
                                    Sign In
                                </Link>
                                <span className="mx-1 text-[#323232]">or</span>
                                <Link
                                    href="/auth/signup"
                                    className="text-[#323232] hover:underline"
                                >
                                    Create an Account
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div
                                    onClick={toggleDropdown}
                                    className="flex items-center cursor-pointer group"
                                >
                                    {/*<UserIcon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-blue-600 transition-colors"/>*/}
                                    <UserIcon className="h-5 w-5 text-[#323232] transition-colors"/>
                                    <button className="hover:text-blue-600 flex items-center">
                                        <span className="ml-2 hidden sm:block text-[12px]">Account</span>
                                    </button>
                                </div>

                                {isOpen && (
                                    <div
                                        className="absolute right-0 mt-2 lg:mt-[150px] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                                        <div
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <HomeIcon className="h-4 w-4 mr-3"/>
                                            <Link
                                                href={customer.role==='admin' ? '/admin/dashboard': '/user/dashboard'}
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