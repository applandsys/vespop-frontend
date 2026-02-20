"use client";

import Image from "next/image";
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {fetchSettingData} from "@/services/site/SettingData";

export default function Footer (){
    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    const [siteSetting, setSiteSetting] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Close dropdown if clicked outside
    useEffect(() => {
        fetchSettingData().then((json) => {
            if (json.success) {
                setSiteSetting(json.data);
            }
        }).catch(error => setError(error)
        ).finally(setLoading(false));
    }, []);


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
                                <p><Link href="/pages/terms-contidion" className="hover:underline">Terms & Conditions</Link></p>
                                <p><Link href="/pages/privacy-policy" className="hover:underline">Privacy Policy</Link></p>
                                <p><Link href="/pages/shopping-return" className="hover:underline">Shopping & Return</Link></p>
                                <p><Link href="/pages/help-center" className="hover:underline">Help Center</Link></p>
                            </div>
                        </div>

                        {/* Column 5 — Address */}
                        <div>
                            <div className="text-gray-400 font-thin mb-4">Bangladesh</div>
                            <div className="text-sm text-gray-600 space-y-2">
                                <div className="text-sm font-medium">{siteSetting.site_name}</div>
                                <p>
                                    {siteSetting.address}
                                </p>
                                <p>{siteSetting.email}</p>
                                <p>{siteSetting.phone}</p>
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
                                    src={`/images/icons/icon${i + 1}.svg`}
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