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
            <div className="md:flex items-center border border-[#F0D8D8] rounded-md w-full px-3 py-2 hidden">
                <form onSubmit={handleSubmit} className="flex w-full items-center">

                    {/* Category Dropdown - Replaced the select */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-between text-sm font-semibold text-gray-700 outline-none min-w-[140px] pr-4 hover:text-red-600 transition-colors"
                        >
                            <span className="truncate">{getSelectedCategoryName()}</span>
                            <svg
                                className={`w-3 h-3 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto category-dropdown-scrollbar">
                                {/* All Categories Option */}
                                <div
                                    onClick={() => handleCategorySelect("all", "All Categories")}
                                    className={`px-3 py-2 cursor-pointer transition-colors text-sm border-b border-gray-50 ${
                                        selectedCategory === "all"
                                            ? 'bg-red-50 text-red-700 font-medium'
                                            : 'hover:bg-gray-50 text-gray-800'
                                    }`}
                                >
                                    All Categories
                                </div>

                                {/* Category List */}
                                {categories.length > 0 && categories.map((category, index) => (
                                    <div
                                        key={category.id}
                                        onClick={() => handleCategorySelect(category.slug, category.name)}
                                        className={`px-3 py-2 cursor-pointer transition-colors text-sm ${
                                            selectedCategory === category.slug
                                                ? 'bg-red-50 text-black-700 font-medium'
                                                : 'hover:bg-gray-50 text-gray-700'
                                        } ${index === categories.length - 1 ? '' : 'border-b border-gray-50'}`}
                                    >
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <span className="mx-2 h-5 border-l border-gray-300"></span>

                    <input
                        type="text"
                        name="search"
                        placeholder="Search for items..."
                        onChange={handleChangeInput}
                        className="flex-1 text-sm text-gray-600 placeholder-gray-400 outline-none"
                    />

                    <button className="text-gray-500 hover:text-gray-700 transition-colors" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/>
                        </svg>
                    </button>
                </form>
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