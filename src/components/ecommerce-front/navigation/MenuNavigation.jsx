"use client";

import React from "react";
import Link from "next/link";

export default function MenuNavigation() {
    const navItems = [
        { name: "Offer Zone", href: "/offer-zone" },
        { name: "Oil & Ghee", href: "/oil-ghee" },
        { name: "Honey", href: "/honey" },
        { name: "Dates", href: "/dates" },
        { name: "Spices", href: "/spices" },
        { name: "Nuts & Seeds", href: "/nuts-seeds" },
        { name: "Beverage", href: "/beverage" },
        { name: "Rice", href: "/rice" },
        { name: "Flours & Lentils", href: "/flours-lentils" },
        { name: "Certified", href: "/certified" },  // ← Fixed: removed extra slash
        { name: "Pickle", href: "/pickle" },
    ];

    return (
        <div className="bg-[#041F1E] w-full">
            <div className="picture-like-container">
                <div className="content-max-width">
                    <ul className="flex gap-6 md:gap-8 overflow-x-auto py-3 whitespace-nowrap">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-white hover:text-[#F48722] font-medium text-sm md:text-base transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}