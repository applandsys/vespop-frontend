"use client";

import { useState } from "react";
import config from "@/config";
import { toast } from "react-toastify";
import DealSettingForm from "@/components/admin/ecommerce/deals/DealSettingForm";
import DealList from "@/components/admin/ecommerce/deals/DealList";

export default function DealSettingPage() {
    const [editItem, setEditItem] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleSuccess = () => {
        setEditItem(null);
        setRefresh(!refresh);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-1 lg:col-span-1">
                <DealSettingForm
                    initialData={editItem}
                    onCancel={() => setEditItem(null)}
                    onSubmit={async (payload) => {
                        try {
                            const url = editItem
                                ? `${config.apiBaseUrl}/deal/${editItem.id}`
                                : `${config.apiBaseUrl}/deal`;

                            const method = editItem ? "PUT" : "POST";

                            const response = await fetch(url, {
                                method,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(payload),
                            });

                            if (!response.ok) {
                                const errData = await response.json();
                                throw new Error(errData.error || "Failed to save deal");
                            }

                            toast.success(editItem ? "Deal updated successfully" : "Deal created successfully");
                            handleSuccess();
                        } catch (err) {
                            console.error(err);
                            toast.error(err.message || "Something went wrong");
                        }
                    }}
                />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
                <DealList
                    refresh={refresh}
                    onEdit={(item) => setEditItem(item)}
                />
            </div>
        </div>
    );
}