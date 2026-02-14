"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AdminMenu from '@/jsons/AdminMenu.json';
import {iconMap} from "@/utils/iconMapper.js";

const AdminSidebar = () => {
    const [currentDropdown, setCurrentDropdown] = useState('');

    const renderIcon = (iconName) => {
        if (!iconName) return null;
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-5 h-5 mr-2" /> : null;
    };


    return (
        <div className="p-1 space-y-1 border-r border-r-green-300">
            <div className="text-xl font-bold p-[6px]">BrandName</div>
            <hr />
            <div className="space-y-1">
                {AdminMenu.map((menuItem) => (
                    menuItem.items.length === 0 ? (
                        <Link
                            key={menuItem.section}
                            href={menuItem.href}
                            className="flex items-center font-semibold p-2 bg-green-50 hover:bg-green-200 rounded"
                        >
                            {renderIcon(menuItem.icon)}
                            {menuItem.section}
                        </Link>
                    ) : (
                        <div key={menuItem.section} className="dropdown">
                            <button
                                className={`w-full flex items-center justify-between font-semibold p-2 hover:bg-green-200 rounded ${currentDropdown === menuItem.section ? "bg-green-300" : "bg-green-50"}`}
                                onClick={() => setCurrentDropdown(
                                    currentDropdown === menuItem.section ? '' : menuItem.section
                                )}
                            >
                                <div className="flex items-center">
                                    {renderIcon(menuItem.icon)}
                                    <span>{menuItem.section}</span>
                                </div>
                                {currentDropdown === menuItem.section ? <FaChevronUp /> : <FaChevronDown />}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out space-y-1 ml-6 ${currentDropdown === menuItem.section ? "opacity-100 max-h-[300px]" : "opacity-0 max-h-0 overflow-hidden"}`}
                            >
                                {menuItem.items.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center mt-2 p-1 hover:bg-green-200 rounded text-sm"
                                    >
                                        {renderIcon(item.icon)}
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default AdminSidebar;
