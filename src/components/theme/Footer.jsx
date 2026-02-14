"use client";

import { PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import SmallCard from "@/components/theme/SmallCard";
import config from '@/config';
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import {fetchBannerBySlug} from "@/services/site/BannerData";
import {fetchSettingData} from "@/services/site/SettingData";

export default function Footer (){
    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);
    const [siteLogo, setSiteLogo] = useState('logo.png');


    useEffect(() => {
        setLoading(true);
        fetchBannerBySlug("footer-promo")
            .then((json) => {
                if (json.success) setBanners(json.data);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
        fetchSettingData().then((setting) => {
            setSiteLogo(setting.data.logo)
        }).catch((error) => {});

    }, []);

    if (loading) return <div className="p-4">Loading Data ...</div>;

    return (
        <>
            {hasWord ?  (
                <footer className="container mx-auto mt-12">
                    <hr/>
                    <div className="container flex flex-col md:flex-row justify-between bottom-footer mt-4">
                        <div className="py-4 text-center md:text-left">
                            <div className="text-xs">© 2026 Bdhoms.com. All rights reserved </div>
                        </div>
                    </div>
                </footer>
            ) : (
                <footer className="mx-auto mt-12 px-4 md:px-8">
                    <div className="mt-6">
                        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-xl overflow-hidden">
                            <Image
                                src={`${config.publicPath}/images/banners/${banners[0]?.image}`}
                                fill
                                alt="Promo banner - Get your daily needs from OmniNest"
                                className="object-cover object-[75%_center] sm:object-[65%_center] md:object-center"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
                                priority
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent md:from-white/90 md:via-white/70 md:to-transparent"></div>

                            <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12">
                                <div className="text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                                    <h1 className="text-gray-900 text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 font-quicksand leading-tight">
                                        <span className="lg:hidden">{banners[0]?.title_text}</span>
                                        <span className="hidden lg:block">{banners[0]?.title_text}</span>
                                    </h1>
                                    <h2 className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
                                       {banners[0]?.sub_text}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 my-8 sm:my-12">
                        <SmallCard>
                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                                <Image
                                    src="/images/best_price.svg"
                                    width={48}
                                    height={48}
                                    alt="Best price icon"
                                    className="w-10 h-10 sm:w-12 sm:h-12"
                                />
                            </div>
                            <div className="ml-3 flex flex-col">
                                <h6 className="text-sm font-bold text-gray-800">Best prices & offers</h6>
                                <p className="text-gray-500 text-xs mt-1">Orders ৳500 or more</p>
                            </div>
                        </SmallCard>

                        <SmallCard>
                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                                <Image
                                    src="/images/free_delivery.svg"
                                    width={48}
                                    height={48}
                                    alt="Free delivery icon"
                                    className="w-10 h-10 sm:w-12 sm:h-12"
                                />
                            </div>
                            <div className="ml-3 flex flex-col">
                                <h6 className="text-sm font-bold text-gray-800">Free delivery</h6>
                                <p className="text-gray-500 text-xs mt-1">24/7 amazing services</p>
                            </div>
                        </SmallCard>

                        <SmallCard>
                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                                <Image
                                    src="/images/deal.svg"
                                    width={48}
                                    height={48}
                                    alt="Great deal icon"
                                    className="w-10 h-10 sm:w-12 sm:h-12"
                                />
                            </div>
                            <div className="ml-3 flex flex-col">
                                <h6 className="text-sm font-bold text-gray-800">Great daily deal</h6>
                                <p className="text-gray-500 text-xs mt-1">When you sign up</p>
                            </div>
                        </SmallCard>

                        <SmallCard>
                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                                <Image
                                    src="/images/network.svg"
                                    width={48}
                                    height={48}
                                    alt="Wide network icon"
                                    className="w-10 h-10 sm:w-12 sm:h-12"
                                />
                            </div>
                            <div className="ml-3 flex flex-col">
                                <h6 className="text-sm font-bold text-gray-800">Wide Network</h6>
                                <p className="text-gray-500 text-xs mt-1">Mega Discounts</p>
                            </div>
                        </SmallCard>

                        <SmallCard>
                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                                <Image
                                    src="/images/easy_return.svg"
                                    width={48}
                                    height={48}
                                    alt="Easy returns icon"
                                    className="w-10 h-10 sm:w-12 sm:h-12"
                                />
                            </div>
                            <div className="ml-3 flex flex-col">
                                <h6 className="text-sm font-bold text-gray-800">Easy returns</h6>
                                <p className="text-gray-500 text-xs mt-1">Within 30 days</p>
                            </div>
                        </SmallCard>
                    </div>

                    <div className="big-footer">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 my-8 sm:my-12">
                            <div className="p-4">
                                <Image
                                    src={`${config.publicPath}/${siteLogo}`}
                                    width={120}
                                    height={50}
                                    alt="BdHoms Logo"
                                    className="mb-3"
                                />
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Your trusted partner for daily grocery needs. Quality products, best prices.
                                </p>
                            </div>

                            <div className="p-4">
                                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Company</h4>
                                <ul className="text-sm space-y-2">
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">About Us</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Delivery Information</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Privacy Policy</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Terms & Conditions</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Contact Us</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Support Center</Link></li>
                                </ul>
                            </div>

                            <div className="p-4">
                                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Account</h4>
                                <ul className="text-sm space-y-2">
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Sign In</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">View Cart</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">My Wishlist</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Track My Order</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Help Ticket</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Shipping Details</Link></li>
                                </ul>
                            </div>

                            <div className="p-4">
                                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Corporate</h4>
                                <ul className="text-sm space-y-2">
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Become a Vendor</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Affiliate Program</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Farm Business</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Farm Careers</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Our Suppliers</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Accessibility</Link></li>
                                </ul>
                            </div>

                            <div className="p-4">
                                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Popular</h4>
                                <ul className="text-sm space-y-2">
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Milk & Flavoured Milk</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Butter and Margarine</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Eggs Substitutes</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Marmalades</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Sour Cream and Dips</Link></li>
                                    <li><Link href="#" className="text-gray-600 hover:text-green-500 transition-colors">Tea & Kombucha</Link></li>
                                </ul>
                            </div>

                            <div className="p-4">
                                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Payment Methods</h4>
                                <p className="text-sm text-gray-600 mb-4">Secure payment options available</p>
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    <Image
                                        src="/images/payment-method.png"
                                        width={200}
                                        height={60}
                                        alt="Payment Methods"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-8"/>

                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 py-6">
                        <div className="text-center lg:text-left order-3 lg:order-1">
                            <div className="text-sm text-gray-600">
                                © 2026 Bdhoms.com. All rights reserved
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 items-center order-2">
                            <div className="flex items-center">
                                <div className="flex items-center justify-center mr-3 bg-green-100 p-2 rounded-full">
                                    <PhoneIcon className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-base text-green-600 font-bold">01969865256</div>
                                    <div className="text-xs text-gray-500">Working 8:00 - 22:00</div>
                                </div>
                            </div>

                            {/*<div className="flex items-center">*/}
                            {/*    <div className="flex items-center justify-center mr-3 bg-green-100 p-2 rounded-full">*/}
                            {/*        <PhoneIcon className="h-4 w-4 text-green-600" />*/}
                            {/*    </div>*/}
                            {/*    <div className="flex flex-col">*/}
                            {/*        <div className="text-base text-green-600 font-bold">+88 0196 9865256</div>*/}
                            {/*        <div className="text-xs text-gray-500">24/7 Support Center</div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                        <div className="flex flex-col items-center lg:items-start order-1 lg:order-3">
                            <div className="flex items-center mb-2">
                                <span className="mr-4 text-sm text-gray-600 font-medium">Follow Us</span>
                                <div className="flex space-x-3">
                                    {['facebook', 'instagram', 'pinterest', 'twitter', 'youtube'].map((social) => (
                                        <div key={social} className="bg-gray-100 p-1 rounded-lg hover:bg-green-100 transition-colors">
                                            <Image
                                                src={`${config.publicPath}/images/social_icons/${social}.png`}
                                                width={20}
                                                height={20}
                                                alt={`${social} social media`}
                                                className="h-5 w-5 hover:scale-110 transition-transform"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 text-center lg:text-left">
                                Up to 15% discount on your first subscription
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </>
    )
};