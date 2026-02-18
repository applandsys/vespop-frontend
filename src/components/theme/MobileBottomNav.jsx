import React from 'react';
import {FiHeart, FiHome, FiSearch, FiUser} from "react-icons/fi";
import {BsCollection} from "react-icons/bs";

const MobileBottomNav = () => {
    return (
        <>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
                <div className="flex items-center justify-between px-6 py-2 relative">
                    <button className="flex flex-col items-center text-xs">
                        <FiHome  className="h-6 w-6" />
                        <span>Home</span>
                    </button>
                    <button className="flex flex-col items-center text-xs">
                        <FiSearch className="h-6 w-6" />
                        <span>Search</span>
                    </button>
                    <div className="flex flex-col items-center text-xs">
                        <BsCollection  className="h-6 w-6" />
                        <span>Collection</span>
                    </div>
                    <button className="flex flex-col items-center text-xs">
                        <FiHeart  className="h-6 w-6" />
                        <span>Wishlist</span>
                    </button>
                    <button className="flex flex-col items-center text-xs">
                        <FiUser  className="h-6 w-6" />
                        <span>Account</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default MobileBottomNav;