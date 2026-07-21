"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Undo2, History, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const PurchaseReturnList = ({ returns = [], page, totalPages, onPageChange, loading }) => {
    
    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <History className="w-5 h-5 text-orange-500" />
                    Return Ledger
                </CardTitle>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    <Undo2 className="w-3 h-3 mr-1" />
                    Inventory Reversals
                </Badge>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px] relative">
                    {loading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-2 text-orange-600">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <span className="text-sm font-medium text-gray-600">Loading history...</span>
                            </div>
                        </div>
                    )}
                    
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[180px] font-semibold text-gray-600">Date & Time</TableHead>
                                <TableHead className="font-semibold text-gray-600">Product Name</TableHead>
                                <TableHead className="w-[120px] text-center font-semibold text-gray-600">Returned Qty</TableHead>
                                <TableHead className="font-semibold text-gray-600">Return Reason / Note</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {returns.length > 0 ? (
                                returns.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-medium text-gray-500 text-xs">
                                            {formatDate(item.createdAt)}
                                        </TableCell>
                                        <TableCell className="font-semibold text-gray-800">
                                            {item.inventory?.product?.name || "Unknown Product"}
                                        </TableCell>
                                        <TableCell className="text-center font-bold text-rose-600">
                                            {Math.abs(item.quantity)}
                                        </TableCell>
                                        <TableCell className="text-gray-600 italic text-sm">
                                            {item.note || "No reason provided"}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : !loading && (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Undo2 className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No purchase returns found</p>
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
        </Card>
    );
};

export default PurchaseReturnList;