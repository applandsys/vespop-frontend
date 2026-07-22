"use client";

import { PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import SmallCard from "@/components/common/SmallCard";
import config from '@/config';
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchBannerBySlug } from "@/services/site/BannerData";
import { fetchSettingData } from "@/services/site/SettingData";
import { getImageUrl } from "@/utils/R2Resolver";
import ExampleWidget from "@/components/common/ExampleWidget";

export default function Footer() {
    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);
    const [siteLogo, setSiteLogo] = useState(null);
    const [siteSetting, setSiteSettings] = useState([]);
    const [siteInfo,setSiteInfo] = useState({});

    useEffect(() => {
        setLoading(true);
        fetchBannerBySlug("footer-promo")
            .then((json) => {
                if (json.success) setBanners(json.data);
                if (json.success) setSiteInfo(json?.data);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));

        fetchSettingData().then((setting) => {
            setSiteLogo(setting.data.logo);
        }).catch((error) => {});


        fetchSettingData().then((setting) => {
            setSiteSettings(setting.data);
        });
    }, []);

    if (loading) return <div className="p-4">Loading Data ...</div>;

    return (
        <>
            {hasWord ? (
                // Full-width Admin Footer
                <footer className="w-full mt-12 bg-white px-6 md:px-12 lg:px-24">
                    <hr />
                    <div className="w-full flex flex-col md:flex-row justify-between mt-4">
                        <div className="py-4 text-center md:text-left">
                            <div className="text-xs text-gray-500">
                                © 2026 {siteSetting?.site_name || "Site Name"}. All rights reserved
                            </div>
                        </div>
                    </div>
                </footer>
            ) : (
                // Full-width Main Footer (Fixed 'class' to 'className')
                <footer className="w-full bg-white text-[#222222] font-sans px-6 py-12 md:px-12 lg:px-24 border-t ">
                    <div className=" mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">Navigate</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Shop</Link></li>
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">About</Link></li>
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Contact</Link></li>
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Store Locator</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">Social</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-gray-600 transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-gray-600 transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-gray-600 transition-colors">Tiktok</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">My Account</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Sign In / Register</Link></li>
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">My Orders</Link></li>
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Wishlist</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">Legal</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Terms & Conditions</Link></li>
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Shipping & Returns</Link></li>
                                <li><Link href="#" className="hover:text-gray-600 transition-colors">Help Center</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2 lg:ml-auto text-left">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">Bangladesh</h3>
                            <div className="text-sm space-y-4 max-w-sm">
                                <p className="leading-relaxed text-gray-700">
                                    {siteInfo.address}
                                </p>
                                <div>
                                    <a href={`mailto:${siteInfo.email}`} className="underline hover:text-gray-600 transition-colors block mb-2">
                                        {siteInfo.email}
                                    </a>
                                    <div className="flex flex-wrap gap-x-2">
                                        <a href={`tel:${siteInfo.phone}`} className="underline hover:text-gray-600 transition-colors">{siteInfo.phone}</a>,
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-4 flex justify-between items-center"> {/* Added items-center here */}
                        <div>© 2026 Vespop. All rights reserved.</div>
                        <div className=""> {/* Added a width class to keep the large image contained */}
                            <Image
                                src="/images/payment_method.png"
                                alt="Description of the image"
                                width={1024}
                                height={500}
                                priority
                                className="w-full h-auto" // Ensures the image scales smoothly inside its wrapper
                            />
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
}