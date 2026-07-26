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

const AdminSidebar = ({ isCollapsed }) => {

    const [currentDropdown, setCurrentDropdown] = useState(null);
    const [siteLogo, setSiteLogo] = useState('');
    const [menuColors, setMenuColors] = useState({ primaryColor: '', hoverColor: '' });

    const renderIcon = (iconName) => {
        if (!iconName) return null;
        const Icon = iconMap[iconName];
        return Icon ? <Icon className="w-[18px] h-[18px] mr-2.5 text-gray-700" /> : null;
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
            className="flex-1 w-full overflow-y-auto thin-scrollbar super-thin"
            style={{
                backgroundColor: menuColors.primaryColor || undefined,
                "--admin-hover-color": menuColors.hoverColor || undefined,
            }}
        >
            <div className="w-full flex items-center justify-center px-3 py-2 h-[80px]">
                {!isCollapsed ? (
                    <Image
                        src={`${getImageUrl(siteLogo)}`}
                        width={80}
                        height={60}
                        alt="logo"
                        priority
                        className="h-[60px] w-auto"
                    />
                ) : (
                    <div className="font-bold text-xl px-1">Logo</div>
                )}
            </div>
            <hr />
            <div className="space-y-1 mt-4 relative pt-2 text-[14px]">
                {AdminMenu.map((menuItem) => (
                    menuItem.items.length === 0 ? (
                        <Link
                            key={menuItem.section}
                            href={menuItem.href}
                            className={`flex items-center p-2 rounded hover:bg-[var(--admin-hover-color)] ${isCollapsed ? 'justify-center' : ''}`}
                            title={isCollapsed ? menuItem.section : ''}
                        >
                            {renderIcon(menuItem.icon)}
                            {!isCollapsed && <span className="font-medium">{menuItem.section}</span>}
                        </Link>
                    ) : (
                        <div key={menuItem.section} className="dropdown">
                            <button
                                className={`w-full flex items-center p-2 rounded hover:bg-[var(--admin-hover-color)] ${isCollapsed ? 'justify-center' : 'justify-between'} ${currentDropdown === menuItem.section ? "bg-[var(--admin-hover-color)]" : ""}`}
                                onClick={() => {
                                    if (isCollapsed) return;
                                    setCurrentDropdown(
                                        currentDropdown === menuItem.section ? '' : menuItem.section
                                    );
                                }}
                                title={isCollapsed ? menuItem.section : ''}
                            >
                                <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
                                    {renderIcon(menuItem.icon)}
                                    {!isCollapsed && <span className="font-medium">{menuItem.section}</span>}
                                </div>
                                {!isCollapsed && (currentDropdown === menuItem.section ? <FaChevronUp className="w-3 h-3 opacity-70" /> : <FaChevronDown className="w-3 h-3 opacity-70" />)}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out space-y-1 ${!isCollapsed ? 'ml-6' : 'ml-0'} ${!isCollapsed && currentDropdown === menuItem.section ? "opacity-100 max-h-[300px]" : "opacity-0 max-h-0 overflow-hidden"}`}
                            >
                                {menuItem.items.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center mt-2 p-1 rounded text-sm hover:bg-[var(--admin-hover-color)]"
                                    >
                                        {renderIcon(item.icon)}
                                        {!isCollapsed && <span className="ml-2">{item.name}</span>}
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