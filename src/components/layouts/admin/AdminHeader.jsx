import React, { useEffect, useRef, useState } from 'react';
import UserIcon from "@/components/icons/UserIcon";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearLoginData } from "@/redux/store/slices/authSlice";

const AdminHeader = ({ onToggleSidebar }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearLoginData());
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
        <div className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
            {/* Mobile Toggle */}
            <button
                onClick={onToggleSidebar}
                className="md:hidden text-gray-600"
            >
                ☰
            </button>

            <div className="ml-auto flex items-center space-x-4" ref={dropdownRef}>
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <UserIcon className="h-6 w-6 text-gray-600" />
                    <span className="text-gray-600">Administrator</span>
                </div>

                {isOpen && (
                    <div className="absolute right-4 top-14 w-40 bg-white border rounded-lg shadow-lg z-50">
                        <div className="px-4 py-2 text-sm hover:bg-gray-100">
                            Profile
                        </div>
                        <div
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center"
                        >
                            <PowerIcon className="h-4 w-4 mr-2" /> Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHeader;
