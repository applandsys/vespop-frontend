"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { getNavigation } from "@/services/navigation/NavigationService";

const NavigationDropdown = () => {
    const [navItems, setNavItems] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [openChildId, setOpenChildId] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        getNavigation()
            .then((res) => setNavItems(res.data || []))
            .catch(console.error);
    }, []);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpenId(null);
                setOpenChildId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav ref={navRef} className="relative z-50 w-full bg-black">
            <div className="flex h-12 items-center justify-center max-w-[1200px] mx-auto px-4">
                <ul className="hidden md:flex space-x-8 text-sm font-bold uppercase text-white">
                    {navItems.map((item) => (
                        <li key={item.id} className="relative">
                            {/* Parent */}
                            {item.childrens?.length ? (
                                <button
                                    onClick={() =>
                                        setOpenId(openId === item.id ? null : item.id)
                                    }
                                    className="flex items-center gap-1 hover:text-gray-300"
                                >
                                    {item.label}
                                    <ChevronDown size={14} />
                                </button>
                            ) : (
                                <Link
                                    href={item.url}
                                    className="hover:text-gray-300"
                                >
                                    {item.label}
                                </Link>
                            )}

                            {/* First Dropdown */}
                            {openId === item.id && item.childrens?.length > 0 && (
                                <ul className="absolute left-0 top-full mt-2 w-52 bg-white border border-gray-200 shadow-xl z-50">
                                    {item.childrens.map((child) => (
                                        <li key={child.id} className="relative">
                                            <div
                                                onClick={() =>
                                                    setOpenChildId(
                                                        openChildId === child.id
                                                            ? null
                                                            : child.id
                                                    )
                                                }
                                                className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                <Link href={child.url}>
                                                    {child.label}
                                                </Link>

                                                {child.childrens?.length > 0 && (
                                                    <ChevronRight
                                                        size={14}
                                                        className="text-gray-600"
                                                    />
                                                )}
                                            </div>

                                            {/* Second Dropdown */}
                                            {openChildId === child.id &&
                                                child.childrens?.length > 0 && (
                                                    <ul className="absolute top-0 left-full w-52 bg-white border border-gray-200 shadow-xl z-50">
                                                        {child.childrens.map((sub) => (
                                                            <li key={sub.id}>
                                                                <Link
                                                                    href={sub.url}
                                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavigationDropdown;