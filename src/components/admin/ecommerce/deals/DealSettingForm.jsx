"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Tag, X } from "lucide-react";

export default function DealSettingForm({ initialData, onSubmit, onCancel }) {
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        discountType: "PERCENTAGE",
        discountValue: "",
        dealType: "ALL",
        targetId: "",
        startDate: "",
        endDate: "",
        priority: "1",
        isActive: "true"
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().slice(0, 16) : "",
                endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().slice(0, 16) : "",
                isActive: initialData.isActive ? "true" : "false",
                targetId: initialData.targetId ? initialData.targetId.toString() : "",
                priority: initialData.priority ? initialData.priority.toString() : "1"
            });
        } else {
            resetForm();
        }
    }, [initialData]);

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            discountType: "PERCENTAGE",
            discountValue: "",
            dealType: "ALL",
            targetId: "",
            startDate: "",
            endDate: "",
            priority: "1",
            isActive: "true"
        });
    };

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            ...form,
            discountValue: parseFloat(form.discountValue) || 0,
            targetId: form.targetId ? parseInt(form.targetId) : null,
            priority: parseInt(form.priority) || 1,
            isActive: form.isActive === "true",
            startDate: new Date(form.startDate).toISOString(),
            endDate: new Date(form.endDate).toISOString(),
        };

        await onSubmit(payload);
        
        if (!initialData) {
            resetForm();
        }
        setSubmitting(false);
    };

    const handleCancel = () => {
        resetForm();
        if (onCancel) onCancel();
    };

    return (
        <Card className="w-full shadow-sm border-gray-200 sticky top-4">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center justify-between text-gray-800">
                    <span className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-indigo-500" />
                        {initialData ? "Edit Deal" : "Create Deal"}
                    </span>
                    {initialData && (
                        <Button variant="ghost" size="icon" type="button" onClick={handleCancel} className="h-6 w-6 text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Deal Title *</Label>
                            <Input
                                value={form.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                placeholder="e.g. Eid Flash Sale"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={String(form.isActive)}
                                onValueChange={(v) => handleChange("isActive", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {String(form.isActive) === "true" ? "Active" : "Inactive"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                            value={form.description || ""}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Brief description"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Discount Type *</Label>
                            <Select
                                value={form.discountType}
                                onValueChange={(v) => handleChange("discountType", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                                    <SelectItem value="FLAT">Flat Amount ($/৳)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Discount Value *</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={form.discountValue}
                                onChange={(e) => handleChange("discountValue", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Deal Type *</Label>
                            <Select
                                value={form.dealType}
                                onValueChange={(v) => handleChange("dealType", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Products</SelectItem>
                                    <SelectItem value="CATEGORY">Specific Category</SelectItem>
                                    <SelectItem value="PRODUCT">Specific Product</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Target ID</Label>
                            <Input
                                type="number"
                                value={form.targetId || ""}
                                onChange={(e) => handleChange("targetId", e.target.value)}
                                placeholder="ID (If specific)"
                                disabled={form.dealType === "ALL"}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date & Time *</Label>
                            <Input
                                type="datetime-local"
                                value={form.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date & Time *</Label>
                            <Input
                                type="datetime-local"
                                value={form.endDate}
                                onChange={(e) => handleChange("endDate", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Priority</Label>
                        <Input
                            type="number"
                            value={form.priority}
                            onChange={(e) => handleChange("priority", e.target.value)}
                            placeholder="Priority (Higher is more important)"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        {initialData && (
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="w-full"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                        >
                            {submitting ? "Saving..." : initialData ? "Update Deal" : "Create Deal"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
