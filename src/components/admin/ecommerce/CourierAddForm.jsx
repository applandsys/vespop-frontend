"use client";

import React, { useState, useEffect } from "react";
import config from "@/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import { Switch } from "@/components/ui/shadcn/switch";
import { Loader2, Plus, Save } from "lucide-react";

const CourierAddForm = ({ courierId, fetchCourier }) => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        api_key: "",
        username: "",
        password: "",
        storeId: "",
        secret_key: "",
        isActive: true,
        status: "active",
    });

    useEffect(() => {
        if (!courierId) return;

        const fetchCourierById = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${config.apiBaseUrl}/courier/${courierId}`);
                const result = await res.json();

                if (result.success) {
                    const data = result.data;
                    setFormData({
                        name: data.name ?? "",
                        url: data.url ?? "",
                        api_key: data.api_key ?? "",
                        username: data.username ?? "",
                        password: "", // keep empty for security
                        storeId: data.storeId ?? "",
                        secret_key: "", // keep empty for security
                        isActive: data.isActive ?? true,
                        status: data.status ?? "active",
                    });
                }
            } catch (err) {
                console.error("Failed to fetch courier", err);
                toast.error("Failed to fetch courier data");
            } finally {
                setLoading(false);
            }
        };

        fetchCourierById();
    }, [courierId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleActive = (checked) => {
        setFormData((prev) => ({
            ...prev,
            isActive: checked,
            status: checked ? "active" : "inactive",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const method = courierId ? "PUT" : "POST";
        const url = courierId
            ? `${config.apiBaseUrl}/courier/update/${courierId}`
            : `${config.apiBaseUrl}/courier`;

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.error || result?.message || "Request failed");
            }

            toast.success(courierId ? "Courier updated successfully!" : "Courier created successfully!");

            if (!courierId) {
                if (fetchCourier) fetchCourier();
                // Reset form on success create
                setFormData({
                    name: "",
                    url: "",
                    api_key: "",
                    username: "",
                    password: "",
                    storeId: "",
                    secret_key: "",
                    isActive: true,
                    status: "active",
                });
            } else {
                router.push("/admin/api-integration/courier");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Card className="w-full shadow-sm flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </Card>
        );
    }

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold text-gray-800">
                    {courierId ? "Update Integration" : "Add Integration"}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-semibold uppercase text-gray-500">Courier Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="e.g. FedEx, Pathao, DHL"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="url" className="text-xs font-semibold uppercase text-gray-500">API URL <span className="text-red-500">*</span></Label>
                        <Input
                            id="url"
                            type="url"
                            name="url"
                            placeholder="https://api.courier.com/v1"
                            value={formData.url}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="api_key" className="text-xs font-semibold uppercase text-gray-500">API Key</Label>
                        <Input
                            id="api_key"
                            type="text"
                            name="api_key"
                            placeholder="Enter API Key"
                            value={formData.api_key}
                            onChange={handleChange}
                            className="bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="secret_key" className="text-xs font-semibold uppercase text-gray-500">API Secret</Label>
                        <Input
                            id="secret_key"
                            type="password"
                            name="secret_key"
                            placeholder="Enter Secret Key"
                            value={formData.secret_key}
                            onChange={handleChange}
                            className="bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-xs font-semibold uppercase text-gray-500">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-semibold uppercase text-gray-500">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storeId" className="text-xs font-semibold uppercase text-gray-500">Store ID / Merchant ID</Label>
                        <Input
                            id="storeId"
                            type="text"
                            name="storeId"
                            placeholder="Enter Store ID"
                            value={formData.storeId}
                            onChange={handleChange}
                            className="bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 border-gray-200 mt-2">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-semibold text-gray-700">Active Status</Label>
                            <p className="text-[11px] text-gray-500">Enable or disable this integration globally.</p>
                        </div>
                        <Switch
                            checked={formData.isActive}
                            onCheckedChange={handleToggleActive}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-4"
                    >
                        {submitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                        ) : courierId ? (
                            <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                        ) : (
                            <><Plus className="w-4 h-4 mr-2" /> Create Integration</>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CourierAddForm;