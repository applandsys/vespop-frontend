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
                <div className="flex w-full md:hidden">
                    <NavigationMobile 
                        setClose={setClose} 
                        isOpen={isOpen} 
                        onOpenAccount={() => setIsOpenAccount(true)}
                        onOpenCart={() => setIsOpenCart(true)}
                    />
                    <AccountSidebarMobile
                        isOpen={isOpenAccount}
                        onClose={() => setIsOpenAccount(false)}
                    />
                    <CartSidebarMobile isOpen={isOpenCart} onClose={() => setIsOpenCart(false)}/>
                </div>
                {/* Top part before navigation */}
                <div className="mt-3 mb-2 max-w-[1200px] mx-auto px-4 relative z-[60]">
                    <div className="hidden md:block">
                        <CartNav />
                    </div>
                </div>
                <div className="hidden md:block relative z-50">
                  <NavigationDropdown/>
                </div>
            </header>
        </>
    );
};

export default EcommerceHeader;