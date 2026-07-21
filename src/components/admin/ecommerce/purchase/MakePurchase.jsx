"use client";

import React, { useState } from "react";
import Select from "react-select";
import config from "@/config";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import { ShoppingCart, Loader2, Calculator, Save } from "lucide-react";

const MakePurchase = ({ products = [], suppliers = [] }) => {
    const [form, setForm] = useState({
        productId: null,
        supplierId: null,
        quantity: "",
        buyPrice: "",
        paidAmount: "",
        dueAmount: "",
    });

    const [loading, setLoading] = useState(false);

    // Convert API data to react-select format
    const productOptions = products.map(p => ({
        value: p.id,
        label: p.name,
        buyPrice: p.buyPrice,
    }));

    const supplierOptions = suppliers.map(s => ({
        value: s.id,
        label: s.name,
    }));

    const isDisabled =
        !form.productId ||
        !form.supplierId ||
        !form.quantity ||
        form.dueAmount < 0;

    const calculateDue = (buyPrice, quantity, paidAmount) => {
        const price = Number(buyPrice) || 0;
        const qty = Number(quantity) || 0;
        const paid = Number(paidAmount) || 0;

        return Math.max(price * qty - paid, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            productId: form.productId?.value,
            supplierId: form.supplierId?.value,
            quantity: Number(form.quantity),
            buyPrice: Number(form.buyPrice),
            paidAmount: Number(form.paidAmount),
            dueAmount: Number(form.dueAmount),
        };

        try {
            setLoading(true);

            const res = await fetch(`${config.apiBaseUrl}/admin/purchase`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Something went wrong");
                return;
            }

            toast.success("Purchase created successfully");

            setForm({
                productId: null,
                supplierId: null,
                quantity: "",
                buyPrice: "",
                paidAmount: "",
                dueAmount: "",
            });

        } catch (err) {
            console.error(err);
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    // React-select custom styles to match Shadcn
    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#6366f1' : '#e5e7eb',
            boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
            borderRadius: '0.375rem',
            padding: '2px',
            backgroundColor: '#f9fafb',
            '&:hover': {
                borderColor: '#6366f1'
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? '#eef2ff' : 'white',
            color: state.isSelected ? 'white' : '#374151',
            cursor: 'pointer',
        })
    };

    const totalAmount = (Number(form.buyPrice) || 0) * (Number(form.quantity) || 0);

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <ShoppingCart className="w-5 h-5 text-indigo-500" />
                    Record New Purchase
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Selection */}
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label className="text-xs font-semibold uppercase text-gray-500">
                                Product <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                styles={customSelectStyles}
                                options={productOptions}
                                value={form.productId}
                                onChange={(selected) =>
                                    setForm(prev => ({
                                        ...prev,
                                        productId: selected,
                                        buyPrice: selected ? selected.buyPrice : "",
                                        dueAmount: calculateDue(
                                            selected?.buyPrice,
                                            prev.quantity,
                                            prev.paidAmount
                                        ),
                                    }))
                                }
                                placeholder="Search and select a product..."
                                isClearable
                            />
                        </div>

                        {/* Supplier Selection */}
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <Label className="text-xs font-semibold uppercase text-gray-500">
                                Supplier <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                styles={customSelectStyles}
                                options={supplierOptions}
                                value={form.supplierId}
                                onChange={(selected) =>
                                    setForm(prev => ({
                                        ...prev,
                                        supplierId: selected,
                                    }))
                                }
                                placeholder="Search and select a supplier..."
                                isClearable
                            />
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <Label htmlFor="quantity" className="text-xs font-semibold uppercase text-gray-500">
                                Quantity <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                placeholder="0"
                                value={form.quantity}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        quantity: e.target.value,
                                        dueAmount: calculateDue(
                                            prev.buyPrice,
                                            e.target.value,
                                            prev.paidAmount
                                        ),
                                    }))
                                }
                                required
                                className="bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                            />
                        </div>

                        {/* Buy Price */}
                        <div className="space-y-2">
                            <Label htmlFor="buyPrice" className="text-xs font-semibold uppercase text-gray-500">
                                Buy Price (Per Unit) <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500 font-medium">$</span>
                                <Input
                                    id="buyPrice"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={form.buyPrice}
                                    onChange={e => {
                                        setForm(prev => ({
                                            ...prev, 
                                            buyPrice: e.target.value,
                                            dueAmount: calculateDue(
                                                e.target.value,
                                                prev.quantity,
                                                prev.paidAmount
                                            )
                                        }));
                                    }}
                                    required
                                    className="pl-7 bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Financial Summary Box */}
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-4 space-y-4 mt-4">
                        <div className="flex items-center gap-2 text-indigo-700 font-semibold border-b border-indigo-100 pb-2">
                            <Calculator className="h-4 w-4" />
                            Financial Breakdown
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600 font-medium">Total Amount:</span>
                            <span className="text-lg font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            {/* Paid Amount */}
                            <div className="space-y-2">
                                <Label htmlFor="paidAmount" className="text-xs font-semibold uppercase text-indigo-600">
                                    Amount Paid
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-indigo-500 font-medium">$</span>
                                    <Input
                                        id="paidAmount"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={form.paidAmount}
                                        onChange={(e) =>
                                            setForm(prev => ({
                                                ...prev,
                                                paidAmount: e.target.value,
                                                dueAmount: calculateDue(
                                                    prev.buyPrice,
                                                    prev.quantity,
                                                    e.target.value
                                                ),
                                            }))
                                        }
                                        className="pl-7 bg-white border-indigo-200 focus-visible:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Due Amount */}
                            <div className="space-y-2">
                                <Label htmlFor="dueAmount" className="text-xs font-semibold uppercase text-rose-600">
                                    Due Balance
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-rose-500 font-medium">$</span>
                                    <Input
                                        id="dueAmount"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={form.dueAmount}
                                        onChange={e => setForm({ ...form, dueAmount: e.target.value })}
                                        className="pl-7 bg-white border-rose-200 focus-visible:ring-rose-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={loading || isDisabled}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing Purchase...</>
                            ) : (
                                <><Save className="w-4 h-4 mr-2" /> Record Purchase</>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default MakePurchase;