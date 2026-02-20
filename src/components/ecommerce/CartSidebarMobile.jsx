"use client";

import React from "react";
import { FiX } from "react-icons/fi";
import {useSelector} from "react-redux";
import LoginForm from "@/components/auth/LoginForm";
import CartList from "@/components/ecommerce/CartList";

export default function CartSidebarMobile({ isOpen, onClose }) {
    const { token, customer } = useSelector((state) => state.auth);

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
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-semibold text-lg">My Cart</h2>
                    <button onClick={onClose}>
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {!customer ? (
                        <>
                            <h6>Please Login or Signup</h6>
                            <LoginForm type="customer" />
                        </>

                    ): (
                        <>
                           <CartList/>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}