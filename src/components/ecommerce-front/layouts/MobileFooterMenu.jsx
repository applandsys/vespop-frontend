"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    Squares2X2Icon,
    UserIcon,
} from "@heroicons/react/24/outline";

const menu = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Search", href: "/", icon: MagnifyingGlassIcon },
    { name: "Collection", href: "/category/all", icon: Squares2X2Icon },
    { name: "Account", href: "/user/dashboard", icon: UserIcon },
];

export default function MobileFooterMenu() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
            <ul className="grid grid-cols-4">
                {menu.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`flex flex-col items-center justify-center py-2 text-xs transition
                                      ${isActive ? "text-black font-medium" : "text-gray-400 hover:text-black"}
                                    `}
                            >
                                <Icon className="h-6 w-6 mb-0.5" />
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}