"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/layouts/admin/AdminHeader";
import {ToastContainer} from "react-toastify";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const { token } = useSelector((state) => state.auth);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

    useEffect(() => {
        if (!token) {
            router.replace("/admin");
        }
    }, [token, router]);

    if (!token) return null;

    const toggleSidebar = () => {
        if (window.innerWidth >= 768) {
            setDesktopSidebarOpen(!desktopSidebarOpen);
        } else {
            setMobileSidebarOpen(!mobileSidebarOpen);
        }
    };

    return (
        <div className="flex w-full min-h-screen">
            <div
                className={`
            fixed md:relative inset-y-0 left-0 z-40 bg-white border-r border-gray-300
            transform transition-all duration-300 overflow-hidden
            ${mobileSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
            md:translate-x-0 ${desktopSidebarOpen ? "md:w-64" : "md:w-0 md:border-none"}
        `}
            >
                <div className="w-64 h-full">
                    <AdminSidebar closeSidebar={() => setMobileSidebarOpen(false)} />
                </div>
            </div>
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader onToggleSidebar={toggleSidebar} />
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                    <ToastContainer />
                </main>
            </div>
        </div>

    );
}
