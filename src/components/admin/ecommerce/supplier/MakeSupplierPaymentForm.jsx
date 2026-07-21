"use client";

import React, { useState } from "react";
import config from "@/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Select from "react-select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";

const MakeSupplierPaymentForm = ({suppliers = []}) => {

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        supplierId: null,
        amount: "",
        type: 'manual',
        typeSourceId: null,
        status: 'paid',
        method: '',
        particular: ''
    });

    const supplierOptions = suppliers.map(s => ({
        value: s.id,
        label: s.name,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Map empty method to 'unknown' if needed by backend, or just send empty string
        const payload = {
            ...formData,
            method: formData.method || 'unknown'
        };

        try {
            const res = await fetch(`${config.apiBaseUrl}/supplier/payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.error || "Request failed");
            }

            toast.success('Supplier Payment successfully!');

            router.push("/admin/supplier/paid-payment");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="max-w-xl mx-auto shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold text-center text-gray-800">
                    Make Supplier Payment
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Supplier</Label>
                        <Select
                            options={supplierOptions}
                            value={supplierOptions.find(opt => opt.value === formData.supplierId) || null}
                            onChange={(selected) =>
                                setFormData(prev => ({
                                    ...prev,
                                    supplierId: selected ? selected.value : null,
                                }))
                            }
                            placeholder="Search supplier..."
                            isClearable
                            className="text-sm"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: '#e5e7eb',
                                    padding: '2px'
                                })
                            }}
                        />
                    </div>
                    
                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Amount</Label>
                        <Input
                            type="number"
                            name="amount"
                            placeholder="Enter payment amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Payment Type</Label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            >
                                <option value="manual">Manual Payment</option>
                                <option value="purchase">Purchase Payment</option>
                                <option value="refund">Refund</option>
                            </select>
                        </div>
                        
                        <div className="space-y-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Status</Label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            >
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Payment Method</Label>
                        <Input
                            type="text"
                            name="method"
                            placeholder="e.g., Cash, Bank Transfer, Mobile Money"
                            value={formData.method}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="space-y-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Particular (Note)</Label>
                        <Input
                            type="text"
                            name="particular"
                            placeholder="Add details about this payment..."
                            value={formData.particular}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        >
                            {submitting ? 'Processing Payment...' : 'Pay Supplier'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default MakeSupplierPaymentForm;