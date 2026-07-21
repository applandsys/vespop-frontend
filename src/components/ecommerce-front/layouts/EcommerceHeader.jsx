"use client";

import React, {useEffect, useState} from 'react';

import Image from 'next/image';
import {FiMenu, FiSearch, FiShoppingBag, FiUser} from "react-icons/fi";
import NavigationMobile from "@/components/ecommerce-front/navigation/NavigationMobile";
import AccountSidebarMobile from "@/components/ecommerce-front/navigation/AccountSidebarMobile";
import {fetchSettingData} from "@/services/site/SettingData";
import CartSidebarMobile from "@/components/ecommerce-front/navigation/CartSidebarMobile";
import CartNav from "@/components/ecommerce-front/cart/CartNav";
import NavigationDropdown from "@/components/ecommerce-front/navigation/NavigationDropdown";
import config from "@/config";


const EcommerceHeader = () => {
  const [isOpenAccount,setIsOpenAccount] = useState(false);
  const [isOpenCart,setIsOpenCart] = useState(false);
  const [isOpen,setIsOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState('logo.png');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetchSettingData(),
        ])
            .then(([settings, categories]) => {
                if (settings?.success) {
                    setSiteLogo(settings.data.logo);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Loading..</div>;

  const setClose = () =>{
      setIsOpen(false);
  }

    return (
        <>
            <header className="mx-auto">
                <div className="flex  md:hidden">
                    <NavigationMobile setClose={setClose} isOpen={isOpen}/>
                    <AccountSidebarMobile
                        isOpen={isOpenAccount}
                        onClose={() => setIsOpenAccount(false)}
                    />
                    <CartSidebarMobile isOpen={isOpenCart} onClose={() => setIsOpenCart(false)}/>
                </div>
                <div className="md:hidden md:mx-[200px] py-2 border-b bg-white border-2 border-blue-600">
                    <div className="flex items-center justify-between">
                        {/* LEFT — Hamburger + Search */}
                        <div className="flex items-center gap-3">
                            {/* Hamburger */}
                            {!isOpen && (
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="p-1"
                                >
                                    <FiMenu className="h-6 w-6"/>
                                </button>
                            )}

                            {/* Search Icon */}
                            <button onClick={() => setIsOpen(true)}
                                    className="p-1">
                                <FiSearch className="h-6 w-6"/>
                            </button>

                        </div>

                        {/* CENTER — Logo */}
                        <div className="flex justify-center">
                            <Image
                                src={`${config.publicPath}/${siteLogo}`}
                                width={120}
                                height={40}
                                alt="logo"
                                priority
                            />
                        </div>

                        {/* RIGHT — User + Cart */}
                        <div className="flex items-center gap-3">
                            <button className="p-1"    onClick={() => setIsOpenAccount(prev=>!prev)}>
                                <FiUser className="h-6 w-6"/>
                            </button>
                            <button className="p-1 relative" onClick={() => setIsOpenCart(prev=>!prev)}>
                                <FiShoppingBag className="h-6 w-6"/>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Top part before navigation */}
                <div className="mt-3 mb-2 md:mx-[360px] relative z-[60]">
                    <div className="hidden md:block mx-2">
                        <CartNav />
                    </div>
                </div>
                <div className="relative z-50">
                  <NavigationDropdown/>
                </div>
            </header>
        </>
    );
};

export default EcommerceHeader;