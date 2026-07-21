"use client";

import { useState } from "react";
import NavigationForm from "@/components/admin/navigation/NavigationForm";
import NavigationList from "@/components/admin/navigation/NavigationList";
import config from "@/config";

export default function NavigationPage() {
    const [editItem, setEditItem] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleSuccess = () => {
        setEditItem(null);
        setRefresh(!refresh);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">

            {/* LEFT SIDE - FORM */}
            <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                    {editItem ? "Edit Navigation" : "Create Navigation"}
                </h2>

                <NavigationForm
                    initialData={editItem}
                    onSubmit={async (data) => {
                        const url = editItem
                            ? `${config.apiBaseUrl}/navigation/${editItem.id}`
                            : `${config.apiBaseUrl}/navigation`;

                        const method = editItem ? "PUT" : "POST";

                        await fetch(url, {
                            method,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data),
                        });

                        handleSuccess();
                    }}
                />
            </div>

            {/* RIGHT SIDE - LIST */}
            <div className="border rounded-lg p-4 bg-white shadow-sm md:col-span-2 lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4">
                    Navigation Structure
                </h2>

                <NavigationList
                    refresh={refresh}
                    onEdit={(item) => setEditItem(item)}
                />
            </div>
        </div>
    );
}