"use client";

import React, {useEffect, useState} from 'react';
import NavigationMobile from "@/components/ecommerce/NavigationMobile";
import CartNav from "@/components/ecommerce/CartNav";
import Navigation from "@/components/theme/Navigation";
import Image from 'next/image';
import Link from 'next/link';
import config from "@/config";
import {fetchSettingData} from "@/services/site/SettingData";
import {FiMenu, FiSearch, FiShoppingBag, FiUser} from "react-icons/fi";
import * as PropTypes from "prop-types";
import AccountSidebarMobile from "@/components/ecommerce/AccountSidebarMobile";
import CartSidebarMobile from "@/components/ecommerce/CartSidebarMobile";


function AccountSidebar(props) {
    return null;
}

AccountSidebar.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};
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

                <div className="md:hidden px-3 py-2 border-b bg-white">
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
                <div className="mt-4">
                    <div className="hidden md:block">
                        <CartNav />
                    </div>
                </div>
                <div className="my-2 hidden md:block">
                    <Navigation/>
                </div>
            </header>
        </>
    );
};

export default EcommerceHeader;