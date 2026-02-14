"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function CategoryNavbar({ categories = [] }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    // Build category tree
    const categoryTree = useMemo(() => {
        const parents = categories.filter((cat) => cat.parentId === null);

        return parents.map((parent) => ({
            ...parent,
            children: categories.filter(
                (cat) => cat.parentId === parent.id
            ),
        }));
    }, [categories]);

    return (
        <nav className="bg-black shadow-md border-b text-white">
            <div className="max-w-7xl mx-auto px-4">

                {/* Top Bar */}
                <div className="flex justify-between items-center h-14">

                    {/* Mobile Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-gray-700"
                    >
                        ☰
                    </button>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-8">

                        {categoryTree.map((parent) => (
                            <li
                                key={parent.id}
                                className="relative group"
                            >
                                <Link
                                    href={`/category/${parent.slug}`}
                                    className="font-medium text-white hover:text-gray-300 transition flex items-center gap-1"
                                >
                                    {parent.name}
                                    {/*{parent.children.length > 0 && <span>▼</span>}*/}
                                </Link>

                                {/* Desktop Dropdown */}
                                {parent.children.length > 0 && (
                                    <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg border-b border-gray-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <ul className="py-2">
                                            {parent.children.map((child) => (
                                                <li key={child.id}>
                                                    <Link
                                                        href={`/category/${child.slug}`}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}

                    </ul>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden pb-4">
                        <ul className="space-y-2">

                            {categoryTree.map((parent) => (
                                <li key={parent.id}>
                                    <div
                                        className="flex justify-between items-center py-2 font-medium text-gray-700 cursor-pointer"
                                        onClick={() =>
                                            setOpenDropdown(
                                                openDropdown === parent.id ? null : parent.id
                                            )
                                        }
                                    >
                                        <Link href={`/category/${parent.slug}`}>
                                            {parent.name}
                                        </Link>

                                        {parent.children.length > 0 && (
                                            <span>
                        {openDropdown === parent.id ? "−" : "+"}
                      </span>
                                        )}
                                    </div>

                                    {/* Mobile Dropdown */}
                                    {openDropdown === parent.id &&
                                        parent.children.length > 0 && (
                                            <ul className="pl-4 space-y-1">
                                                {parent.children.map((child) => (
                                                    <li key={child.id}>
                                                        <Link
                                                            href={`/category/${child.slug}`}
                                                            className="block py-1 text-sm text-gray-600"
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                </li>
                            ))}

                        </ul>
                    </div>
                )}

            </div>
        </nav>
    );
}
