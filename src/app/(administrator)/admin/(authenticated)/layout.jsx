"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/layouts/admin/AdminHeader";

export default function AdminLayout({ children }) {

    return (
            <>
                <div className="flex h-screen w-full">
                    <div className="w-64">
                        <AdminSidebar />
                    </div>
                    <div className="flex flex-col flex-1">
                        <AdminHeader />
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </>

    );
}
