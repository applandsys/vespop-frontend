"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AdminMenu from '@/jsons/AdminMenu.json';
import {iconMap} from "@/utils/iconMapper.js";
import {fetchSettingData} from "@/services/site/SettingData";
import {fetchColorSettingData} from "@/services/site/ColorSettingData";
import Image from 'next/image';
import {getImageUrl} from "@/utils/R2Resolver";

const AdminSidebar = () => {

    const [currentDropdown, setCurrentDropdown] = useState(null);
    const [siteLogo, setSiteLogo] = useState('');
    const [menuColors, setMenuColors] = useState({ primaryColor: '', hoverColor: '' });

    const renderIcon = (iconName) => {
        if (!iconName) return null;
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-5 h-5 mr-2" /> : null;
    };

    useEffect(() => {
        fetchSettingData().then((settings) => { setSiteLogo(settings.data.logo);}).catch(error => console.log(error));
        fetchColorSettingData()
            .then((res) => {
                if (res.success) {
                    setMenuColors({
                        primaryColor: res.data.primaryColor,
                        hoverColor: res.data.hoverColor,
                    });
                }
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div
            className="h-screen overflow-y-auto thin-scrollbar super-thin"
            style={{
                backgroundColor: menuColors.primaryColor || undefined,
                "--admin-hover-color": menuColors.hoverColor || undefined,
            }}
        >
            <div className="fixed  w-full flex items-center px-3 py-2 text-xl font-bold">
                <Image
                    src={`${getImageUrl(siteLogo)}`}
                    width={80}
                    height={60}
                    alt="logo"
                    priority
                    className="h-[60px] w-auto"
                />
            </div>
            <hr />
            <div className="space-y-1 mt-12 relative pt-6">
                {AdminMenu.map((menuItem) => (
                    menuItem.items.length === 0 ? (
                        <Link
                            key={menuItem.section}
                            href={menuItem.href}
                            className="flex items-center font-semibold p-2 rounded hover:bg-[var(--admin-hover-color)]"
                        >
                            {renderIcon(menuItem.icon)}
                            {menuItem.section}
                        </Link>
                    ) : (
                        <div key={menuItem.section} className="dropdown">
                            <button
                                className={`w-full flex items-center justify-between font-semibold p-2 rounded hover:bg-[var(--admin-hover-color)] ${currentDropdown === menuItem.section ? "bg-[var(--admin-hover-color)]" : ""}`}
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
                                        className="flex items-center mt-2 p-1 rounded text-sm hover:bg-[var(--admin-hover-color)]"
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