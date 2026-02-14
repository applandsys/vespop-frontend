import React from 'react';
import Link from "next/link";
import {useAuth} from "@/hooks/useAuth";


const UserSidebar = ({menuList}) => {
    const { logout } = useAuth();

    return (
        <>
            <div className="xs:w-full sm:w-full md:w-1/4 bg-[#a7b3a8] block shadow-lg  rounded-lg p-4">
                <ul className="space-y-2 text-sm font-bold">
                    {
                        menuList.map((menu,index) => (
                            <li key={index} className="border-b border-[#b2c1b3] py-2 cursor-pointer hover:text-gray-200 text-white">
                                <Link href={menu.route}>{menu.name}</Link>
                            </li>
                        ))
                    }
                    <li  onClick={logout} className="border-b py-2 border-[#b2c1b3] cursor-pointer text-white hover:text-gray-200">Logout</li>
                </ul>
            </div>
        </>
    );
};

export default UserSidebar;