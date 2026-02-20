import React, {useEffect, useRef, useState} from 'react';
import UserIcon from "@/components/icons/UserIcon";
import {PowerIcon} from "@heroicons/react/24/outline";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {clearLoginData} from "@/redux/store/slices/authSlice";

const AdminHeader = () => {

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const dropdownRef = useRef();
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleLogout = () => {
        // Remove token from localStorage if you stored it there
        localStorage.removeItem('token');

        // Dispatch Redux logout
        dispatch(clearLoginData());

        // Redirect to login site-posts
        router.push('/auth/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <>
            <div className="w-full">
                <div className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2" ref={dropdownRef}>
                            <div onClick={toggleDropdown}>
                                <div className="flex items-center space-x-2">
                                    <UserIcon className="h-6 w-6 text-gray-600"/>
                                    <span className="text-gray-600">Administrator</span>
                                </div>
                                {isOpen && (
                                    <div
                                        className="absolute right-0 mt-[15px] w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">

                                        <div
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <UserIcon className="h-3 w-3 mx-2"/> Profile
                                        </div>

                                        <div
                                            onClick={handleLogout}
                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                        >
                                            <PowerIcon className="h-3 w-3 mx-2"/> Logout
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHeader;