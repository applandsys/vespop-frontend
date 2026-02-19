"use client";

import { PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import SmallCard from "@/components/theme/SmallCard";
import config from '@/config';
import {usePathname} from "next/navigation";
import React from "react";

export default function Footer (){
    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    return (
        <>
            {hasWord ?  (
                <footer className="container mx-auto mt-12">
                    <hr/>
                    <div className="container flex flex-col md:flex-row justify-between bottom-footer mt-4">
                        <div className="py-4 text-center md:text-left">
                            <div className="text-xs">© 2026 Vespop.com. All rights reserved </div>
                        </div>
                    </div>
                </footer>
            ) : (
                <footer className="mx-auto mt-12 px-4 md:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="p-2">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className=" p-4">
                                    <div className="flex flex-col w-[300px]">
                                        <div className="text-gray-400 font-thin my-4">Navigate</div>
                                        <div className="text-gray-600 font-thin text-xs">
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Shop</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">About</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Contact</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" p-4">
                                    <div className="flex flex-col w-[300px]">
                                        <div className="text-gray-400 font-thin my-4">Social</div>
                                        <div className="text-gray-600 font-thin text-xs">
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Facebook</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Instagram</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">TikTok</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" p-4">
                                    <div className="flex flex-col w-[300px]">
                                        <div className="text-gray-400 font-thin my-4">My Account</div>
                                        <div className="text-gray-600 font-thin text-xs">
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Sign In / Register</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">My Orders</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Wishlist</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" p-4">
                                    <div className="flex flex-col w-[300px]">
                                        <div className="text-gray-400 font-thin my-4">Legal</div>
                                        <div className="text-gray-600 font-thin text-xs">
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Terms & Conditions</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Privacy Policy</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Shopping & Return</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                            <p className="py-1">
                                                <a href="#" className="relative inline-block group">
                                                    <span className="text-sm">Help Center</span>
                                                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end  p-4">
                            <div className="flex flex-col w-[300px]">
                                <div className="text-gray-400 font-thin my-4">Bangladesh</div>
                                <div className="text-gray-600 font-thin text-xs">
                                    <p>Sky Scrapper (9th Floor), 20 & 50, Kamal Ataturk Avenue, Banani C/A, Dhaka-1213</p>
                                    <p>cutomer@vespop.com</p>
                                    <p>+880178899900 ,
                                        +8801982333111</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 py-6">

                        <div className="w-full order-3 lg:order-1 text-gray-600">

                            <div className="flex items-center justify-between w-full">

                                {/* LEFT — Copyright */}
                                <div className="text-center lg:text-left">
                                    © 2024 Vespop.com All rights reserved
                                </div>

                                {/* RIGHT — Icons */}
                                <div className="flex flex-wrap justify-end gap-1">
                                    {Array.from({ length: 20 }, (_, i) => (
                                        <Image
                                            key={i}
                                            width={35}
                                            height={35}
                                            src={`images/icons/icon${i + 1}.svg`}
                                            alt={`payment-${i + 1}`}
                                            className="h-8 w-auto"
                                        />
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>

                </footer>
            )}
        </>
    )
};