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
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!token) {
            router.replace("/admin");
        }
    }, [token, router]);

    if (!token) return null;

    return (
        <div className="flex w-full min-h-screen items-stretch">
            <div
                className={`
            fixed md:relative top-0 left-0 z-40 bg-white border-r border-gray-300
            transition-all duration-300 overflow-hidden flex flex-col
            ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 md:w-0 md:border-r-0"}
        `}
            >
                <div className="w-64 flex-1 flex flex-col">
                    <AdminSidebar closeSidebar={() => setSidebarOpen(false)} isCollapsed={false} />
                </div>
            </div>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div className="flex flex-col flex-1">
                <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-6">
                    {children}
                    <ToastContainer />
                </main>
            </div>
        </div>

    );
}
