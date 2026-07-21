"use client";

import Link from "next/link";
import { useState } from "react";
import config from "@/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { toast } from "react-toastify";
import { ShoppingBag, Edit, Undo2, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

const PurchaseList = ({ purchase = [], page, totalPages, onPageChange, loading }) => {
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [returnPurchaseId, setReturnPurchaseId] = useState(null);
    const [returnReason, setReturnReason] = useState("");
    const [returnQuantity, setReturnQuantity] = useState("");
    const [submittingReturn, setSubmittingReturn] = useState(false);

    const openReturnModal = (purchaseId) => {
        setReturnPurchaseId(purchaseId);
        setReturnReason("");
        setReturnQuantity("");
        setShowReturnModal(true);
    };

    const submitReturn = async () => {
        if (!returnReason.trim()) {
            toast.error("Please provide a return reason");
            return;
        }
        if (!returnQuantity || Number(returnQuantity) <= 0) {
            toast.error("Please provide a valid return quantity");
            return;
        }

        try {
            setSubmittingReturn(true);

            const res = await fetch(`${config.apiBaseUrl}/admin/purchase/return`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    purchaseId: returnPurchaseId,
                    reason: returnReason,
                    quantity: Number(returnQuantity),
                }),
            });
            
            if(!res.ok) {
                throw new Error("Failed to submit return");
            }

            toast.success("Return processed successfully!");
            setShowReturnModal(false);
            setReturnPurchaseId(null);
            setReturnReason("");
            setReturnQuantity("");

            // Refresh list
            onPageChange(page);
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit return");
        } finally {
            setSubmittingReturn(false);
        }
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <ShoppingBag className="w-5 h-5 text-indigo-500" />
                    Purchase History
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px] relative">
                    {loading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-2 text-indigo-600">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <span className="text-sm font-medium text-gray-600">Loading purchases...</span>
                            </div>
                        </div>
                    )}
                    
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[80px] font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Product</TableHead>
                                <TableHead className="w-[80px] text-center font-semibold text-gray-600">Qty</TableHead>
                                <TableHead className="w-[100px] font-semibold text-gray-600">Buy Price</TableHead>
                                <TableHead className="w-[100px] font-semibold text-gray-600">Sell Price</TableHead>
                                <TableHead className="w-[100px] font-semibold text-gray-600">Discount</TableHead>
                                <TableHead className="w-[80px] text-center font-semibold text-gray-600">Points</TableHead>
                                <TableHead className="w-[160px] text-right font-semibold text-gray-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {purchase.length > 0 ? (
                                purchase.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-medium text-gray-500">#{item.id}</TableCell>
                                        <TableCell className="font-semibold text-gray-800">{item.product?.name || "N/A"}</TableCell>
                                        <TableCell className="text-center font-medium text-gray-600">{item.quantity}</TableCell>
                                        <TableCell className="text-gray-600 font-medium">${item.buyPrice}</TableCell>
                                        <TableCell className="text-emerald-600 font-medium">${item.product?.sellPrice}</TableCell>
                                        <TableCell className="text-rose-500 font-medium">{item.product?.discount}%</TableCell>
                                        <TableCell className="text-center text-amber-600 font-bold">{item.product?.point || 0}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    asChild
                                                    className="h-8 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                >
                                                    <Link href={`/admin/product/edit-product/${item.product?.id}`}>
                                                        <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    onClick={() => openReturnModal(item.id)}
                                                    className="h-8 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                                                >
                                                    <Undo2 className="w-3.5 h-3.5 mr-1" /> Return
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : !loading && (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <ShoppingBag className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No purchases found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-100 p-4">
                        <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2.5 py-1 rounded-md">
                            Page <span className="text-gray-900 font-semibold">{page}</span> of <span className="text-gray-900 font-semibold">{totalPages}</span>
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(page - 1)}
                                disabled={page === 1}
                                className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(page + 1)}
                                disabled={page === totalPages}
                                className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>

            {/* RETURN MODAL */}
            {showReturnModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden">
                        <CardHeader className="bg-gray-50 border-b pb-4 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Undo2 className="h-5 w-5 text-orange-500" />
                                Return Purchase #{returnPurchaseId}
                            </CardTitle>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setShowReturnModal(false)}
                                className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Reason for Return</label>
                                    <textarea
                                        value={returnReason}
                                        onChange={(e) => setReturnReason(e.target.value)}
                                        rows={4}
                                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow resize-none"
                                        placeholder="Please explain why this purchase is being returned..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Return Quantity</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={returnQuantity}
                                        onChange={(e) => setReturnQuantity(e.target.value)}
                                        placeholder="Enter quantity to return"
                                        className="bg-white border-gray-200 focus-visible:ring-indigo-500"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowReturnModal(false)}
                                        disabled={submittingReturn}
                                        className="border-gray-200"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={submitReturn}
                                        disabled={submittingReturn}
                                        className="bg-orange-600 hover:bg-orange-700 text-white"
                                    >
                                        {submittingReturn ? (
                                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                                        ) : "Submit Return"}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Card>
    );
};

export default PurchaseList;