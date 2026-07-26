"use client";

import React, {useState} from "react";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import axios from "axios";
import config from "@/config";
import {clearLoginData, setLoginData} from "@/redux/store/slices/authSlice";
import LoginForm from "@/components/auth/LoginForm";
import {HomeIcon, PowerIcon} from "@heroicons/react/24/outline";
import {UserIcon} from "@heroicons/react/16/solid";

export default function AccountSidebarMobile({ isOpen, onClose }) {
    const { token, customer } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const type = "customer";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/customer/auth/login`,
                { email, password }
            );

            dispatch(
                setLoginData({
                    token: response.data.token,
                    customer: response.data.sanitizedCustomer,
                })
            );

            if (response.data.token) {
                type === "user"
                    ? router.push("/admin/dashboard")
                    : router.back();
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearLoginData());
        router.replace('/');
        window.location.href = '/';
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-lg
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 mb-2">
                    <h2 className="font-semibold text-base text-gray-900">
                        {customer ? `Hi, ${customer.name}` : "My Account"}
                    </h2>
                    <button onClick={onClose} aria-label="Close">
                        <FiX className="w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {!customer ? (
                        <LoginForm type="customer" />
                    ): (
                        <div className="flex flex-col">
                            <Link
                                href="/user/profile"
                                onClick={onClose}
                                className="block py-4 text-[13px] font-medium text-gray-700 hover:text-blue-600 border-b border-gray-100 transition-colors"
                            >
                                Account Details
                            </Link>
                            <Link
                                href="/user/addresses"
                                onClick={onClose}
                                className="block py-4 text-[13px] font-medium text-gray-700 hover:text-blue-600 border-b border-gray-100 transition-colors"
                            >
                                Addresses
                            </Link>
                            <Link
                                href="/user/reset-password"
                                onClick={onClose}
                                className="block py-4 text-[13px] font-medium text-gray-700 hover:text-blue-600 border-b border-gray-100 transition-colors"
                            >
                                Reset Your Password
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left py-4 text-[13px] font-medium text-gray-700 hover:text-red-600 transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}