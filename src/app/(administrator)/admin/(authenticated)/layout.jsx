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
        <div className="flex w-full ">
            <div
                className={`
            fixed md:relative inset-y-0 left-0 z-40 w-64 bg-white border-r bordfer-gray-300
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
        `}
            >
                <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
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
