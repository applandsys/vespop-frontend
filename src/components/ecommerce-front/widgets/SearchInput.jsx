"use client";

import React, {useEffect, useState, useRef} from 'react';
import {getCategories} from "@/services/ecommerce/getCategories";
import {useRouter} from "next/navigation";

const SearchInput = () => {
    const router = useRouter();
    const dropdownRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSelectedQuery] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        getCategories().then(res => setCategories(res)).finally()
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCategorySelect = (slug, name) => {
        setSelectedCategory(slug);
        setIsDropdownOpen(false);
    };

    const handleChangeInput = (e) => {
        setSelectedQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedCategory);
        if(selectedCategory != null){
            router.push(`/category/${selectedCategory}?search=${searchQuery}`);
        } else {
            console.log("mor kisu nai");
        }
    };

    // Get the display name for the selected category
    const getSelectedCategoryName = () => {
        if (selectedCategory === "all") return "All Categories";
        const category = categories.find(cat => cat.slug === selectedCategory);
        return category ? category.name : "All Categories";
    };

    return (
        <>
            <div className="flex items-center gap-9 font-poppins">
                <div className="text-[12px] text-[#323232]">Outlets</div>
                <div className="bg-[#232323] h-[30px] w-[160px] flex items-center px-[10px]">
                    <form onSubmit={handleSubmit} className="flex w-full items-center">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search"
                            onChange={handleChangeInput}
                            className="flex-1 min-w-0 text-[12px] text-white bg-transparent placeholder-white outline-none border-none"
                        />
                        <button type="submit" aria-label="Search" className="shrink-0 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-4 w-4"
                            >
                                <circle cx="9" cy="9" r="6.5" />
                                <line x1="18" y1="18" x2="13.8" y2="13.8" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            {/* Add global styles for scrollbar */}
            <style jsx global>{`
                .category-dropdown-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .category-dropdown-scrollbar::-webkit-scrollbar-track {
                    background: #fafafa;
                    border-radius: 3px;
                }
                .category-dropdown-scrollbar::-webkit-scrollbar-thumb {
                    background: #b8b8b8;
                    border-radius: 3px;
                }
                .category-dropdown-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #dbd9d9;
                }
            `}</style>
        </>
    );
};

export default SearchInput;