import React from 'react';
import CategoryButton from "@/components/ecommerce/BrowsAllCat";
import Link from "next/link";

const Navigation = () => {
    return (
        <>
            <nav>
                <div className="flex justify-between items-center w-full">
                    <div className="flex">
                        <div className="flex items-center px-4">
                            <div className="hidden md:flex space-x-8">
                                <Link href="/user/dashboard"
                                      className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                                <Link href="/about"
                                      className="text-gray-600 hover:text-blue-600 font-medium">Genology</Link>
                                <Link href="/contact"
                                      className="text-gray-600 hover:text-blue-600 font-medium">Reports</Link>
                                <Link href="/contact"
                                      className="text-gray-600 hover:text-blue-600 font-medium">Shop</Link>
                                <Link href="/contact"
                                      className="text-gray-600 hover:text-blue-600 font-medium">Support</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;