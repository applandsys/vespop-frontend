"use client";

import React, { useState, useEffect } from "react";
import config from "@/config";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import { Switch } from "@/components/ui/shadcn/switch";

const AddEditSupplier = ({ editingSupplier, setEditingSupplier, fetchSupplier }) => {

    const [submitting, setSubmitting] = useState(false);

    const initialData = {
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
        type: "",
        logo: "",
        note: "",
        status: "ACTIVE",
    };

    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        if (editingSupplier) {
            setFormData({
                name: editingSupplier.name || "",
                address: editingSupplier.address || "",
                phone: editingSupplier.phone || "",
                email: editingSupplier.email || "",
                password: "",
                type: editingSupplier.type || "",
                logo: editingSupplier.logo || "",
                note: editingSupplier.note || "",
                status: editingSupplier.status || "ACTIVE",
            });
        } else {
            resetForm();
        }
    }, [editingSupplier]);

    const resetForm = () => {
        setFormData(initialData);
        if (setEditingSupplier) setEditingSupplier(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleActive = () => {
        setFormData(prev => ({
            ...prev,
            status: prev.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const method = editingSupplier ? "PUT" : "POST";
        const url = editingSupplier
            ? `${config.apiBaseUrl}/supplier/${editingSupplier.id}`
            : `${config.apiBaseUrl}/supplier`;

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.error || "Request failed");
            }

            toast.success(
                editingSupplier
                    ? "Supplier updated successfully!"
                    : "Supplier created successfully!"
            );

            if (fetchSupplier) {
                fetchSupplier();
            }
            
            resetForm();
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-bold">
                    {editingSupplier ? "Update Supplier" : "Create Supplier"}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Supplier Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Address</Label>
                        <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                            <Input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Type</Label>
                            <Input
                                type="text"
                                name="type"
                                placeholder="e.g., Electronics"
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder={editingSupplier ? "(Leave blank to keep unchanged)" : ""}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Note</Label>
                        <Input
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-between items-center py-2 border-t mt-4">
                        <Label className="text-sm font-semibold text-gray-700">
                            Active Status
                        </Label>
                        
                        <button
                            type="button"
                            onClick={handleToggleActive}
                            className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                formData.status === "ACTIVE" ? "bg-green-500" : "bg-gray-300"
                            }`}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                    formData.status === "ACTIVE" ? "translate-x-5" : ""
                                }`}
                            />
                        </button>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {submitting ? 'Submitting...' : (editingSupplier ? 'Update' : 'Submit')}
                        </Button>
                        {editingSupplier && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                disabled={submitting}
                                className="w-full flex-1"
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddEditSupplier;