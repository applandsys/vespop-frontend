"use client";

import React, {useEffect, useRef, useState} from 'react';
import CartDropdown from "@/components/ecommerce/CartDropdown";
import {useSelector} from "react-redux";
import {MdOutlineShoppingBag} from "react-icons/md";

const ShoppingCart = () => {

    const dropdownRef = useRef();
    const cartItems = useSelector((state) => state.cart.items);
    const [showCart, setShowCart] = useState(false);
    const cartCount = cartItems.length;
    const handleCloseCart = () => {
        setShowCart(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <div
                className="hover:text-blue-600 flex items-center relative group cursor-pointer"
                onClick={() => setShowCart(!showCart)}
            >
                <div className="relative">
                    <MdOutlineShoppingBag className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-blue-600 transition-colors"/>
                    {cartCount > 0 && (
                        <span
                            className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold px-1 rounded-full min-w-[18px] text-center">
                                    {cartCount}
                        </span>
                    )}
                </div>
                <span className="ml-2 hidden sm:block text-xs">Shopping Cart</span>
                <div className="hidden lg:block absolute right-0 top-10">
                    {showCart && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
                            <CartDropdown onClose={handleCloseCart}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;