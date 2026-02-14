"use client";

import React, {useEffect, useState} from 'react';
import CategoryButton from "@/components/ecommerce/BrowsAllCat";
import Link from "next/link";

const Navigation = () => {


    return (
        <>
            <nav>
                <div className="flex justify-between items-center w-full">
                    <div className="flex w-full">
                        <CategoryButton/>
                        <div className="flex items-center px-4">
                            <div className="hidden md:flex space-x-8">
                                <Link href="/"
                                      className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
                                <Link href="/about"
                                      className="text-gray-600 hover:text-blue-600 font-medium">About</Link>
                                <Link href="/contact"
                                   className="text-gray-600 hover:text-blue-600 font-medium">Contact</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;