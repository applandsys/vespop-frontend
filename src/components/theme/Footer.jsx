"use client";

import Image from "next/image";
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
                <footer className="mx-auto mt-12 px-4">

                    {/* TOP SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                        {/* Column 1 — Navigate */}
                        <div>
                            <div className="text-gray-400 font-thin mb-4">Navigate</div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><a href="#" className="hover:underline">Shop</a></p>
                                <p><a href="#" className="hover:underline">About</a></p>
                                <p><a href="#" className="hover:underline">Contact</a></p>
                            </div>
                        </div>

                        {/* Column 2 — Social */}
                        <div>
                            <div className="text-gray-400 font-thin mb-4">Social</div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><a href="#" className="hover:underline">Facebook</a></p>
                                <p><a href="#" className="hover:underline">Instagram</a></p>
                                <p><a href="#" className="hover:underline">TikTok</a></p>
                            </div>
                        </div>

                        {/* Column 3 — Account */}
                        <div>
                            <div className="text-gray-400 font-thin mb-4">My Account</div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><a href="#" className="hover:underline">Sign In / Register</a></p>
                                <p><a href="#" className="hover:underline">My Orders</a></p>
                                <p><a href="#" className="hover:underline">Wishlist</a></p>
                            </div>
                        </div>

                        {/* Column 4 — Legal */}
                        <div>
                            <div className="text-gray-400 font-thin mb-4">Legal</div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><a href="#" className="hover:underline">Terms & Conditions</a></p>
                                <p><a href="#" className="hover:underline">Privacy Policy</a></p>
                                <p><a href="#" className="hover:underline">Shopping & Return</a></p>
                                <p><a href="#" className="hover:underline">Help Center</a></p>
                            </div>
                        </div>

                        {/* Column 5 — Address */}
                        <div>
                            <div className="text-gray-400 font-thin mb-4">Bangladesh</div>
                            <div className="text-sm text-gray-600 space-y-2">
                                <p>
                                    Sky Scrapper (9th Floor), 20 & 50, Kamal Ataturk Avenue,
                                    Banani C/A, Dhaka-1213
                                </p>
                                <p>customer@vespop.com</p>
                                <p>+880178899900, +8801982333111</p>
                            </div>
                        </div>

                    </div>

                    {/* BOTTOM SECTION */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-8 text-gray-600">

                        {/* Copyright */}
                        <div className="text-center lg:text-left">
                            © 2026 Vespop.com All rights reserved
                        </div>

                        {/* Payment Icons */}
                        <div className="hidden md:flex flex-wrap justify-center lg:justify-end gap-1">
                            {Array.from({ length: 20 }, (_, i) => (
                                <Image
                                    key={i}
                                    width={35}
                                    height={35}
                                    src={`images/icons/icon${i + 1}.svg`}
                                    alt={`payment-${i + 1}`}
                                    className="h-7 w-auto"
                                />
                            ))}
                        </div>

                    </div>

                </footer>

            )}
        </>
    )
};