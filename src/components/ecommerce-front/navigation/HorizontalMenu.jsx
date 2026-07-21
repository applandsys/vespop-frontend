"use client";

import {useEffect, useRef, useState} from "react";
import {getNavigation} from "@/services/navigation/NavigationService";

/**
 * Recursive menu item
 */
function MenuItem({ item }) {
    const hasChildren = item.childrens && item.childrens.length > 0;
    const [open, setOpen] = useState(false);

    return (
        <li
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <a
                href={item.url || "#"}
                className={`px-4 py-2 flex items-center gap-2 hover:text-blue-600 ${
                    item.cssClasses || ""
                }`}
                style={{ color: item.textColor || "inherit" }}
            >
                {item.label}
                {hasChildren && <span className="text-xs">▼</span>}
            </a>

            {hasChildren && open && (
                <ul className="absolute left-0 top-full min-w-[200px] bg-white shadow-lg border rounded-md z-50">
                    {item.childrens.map((child) => (
                        <MenuItem key={child.id} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
}

/**
 * Main horizontal menu
 */
export default function HorizontalMenu() {

    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        getNavigation().then(response => {
            setMenuData(response.data.data);
        })
    }, []);


    return (
        <nav className="w-full bg-white border-b">
            <ul className="flex items-center gap-2 px-4">
                {menuData.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </ul>
        </nav>
    );
}