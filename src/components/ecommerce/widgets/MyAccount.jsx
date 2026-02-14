"use client";

import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import {UserIcon} from "@heroicons/react/16/solid";
import {HomeIcon, PowerIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {fetchSettingData} from "@/services/site/SettingData";
import {getCategories} from "@/services/ecommerce/getCategories";
import {clearLoginData} from "@/redux/store/slices/authSlice";
import {router} from "next/dist/client";
import {useRouter} from "next/navigation";

const MyAccount = () => {
    const { token, customer } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const dispatch = useDispatch();
    const router = useRouter();
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearLoginData());
        router.replace('/');
        window.location.href = '/';
    };
    return (
        <div>
            <div className="relative flex " ref={dropdownRef}>
                {!customer ? (
                    <div className="flex justify-center">
                        <Link
                            href="/auth/login"
                            className="hover:text-blue-600 flex transition-colors"
                        >
                            <span className="mr-2 hidden sm:block text-xs mt-1"> Sign In </span>
                        </Link>
                        <div className="text-xs mt-1">
                            or
                        </div>
                        <Link
                            href="/auth/signup"
                            className="hover:text-blue-600 flex transition-colors"
                        >
                            <span className="ml-2 hidden sm:block text-xs mt-1"> Create an Account</span>
                        </Link>
                    </div>
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
    );
};

export default MyAccount;