"use client";

import React, { useEffect, useState } from "react";
import config from "@/config";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Tag, Edit, Trash2 } from "lucide-react";

export default function DealList({ refresh, onEdit }) {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadDeals();
    }, [refresh]);

    const loadDeals = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${config.apiBaseUrl}/deal`);
            const data = await response.json();
            setDeals(data);
        } catch (error) {
            console.error("Failed to load deals:", error);
            toast.error("Failed to load deals");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this deal?")) return;

        try {
            const response = await fetch(`${config.apiBaseUrl}/deal/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                toast.success("Deal deleted successfully");
                loadDeals();
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to delete deal");
            }
        } catch (error) {
            console.error("Failed to delete deal:", error);
            toast.error("An error occurred");
        }
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Tag className="w-5 h-5 text-indigo-500" />
                    Deals
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="font-semibold text-gray-600">Title</TableHead>
                                <TableHead className="font-semibold text-gray-600">Discount</TableHead>
                                <TableHead className="font-semibold text-gray-600">Valid Dates</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Priority</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Status</TableHead>
                                <TableHead className="w-[150px] font-semibold text-gray-600 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center text-gray-500">Loading deals...</TableCell>
                                </TableRow>
                            ) : deals.length > 0 ? (
                                deals.map((deal) => (
                                    <TableRow key={deal.id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-medium">
                                            <div className="text-gray-900 font-bold">{deal.title}</div>
                                            <div className="text-xs text-gray-500">
                                                {deal.dealType} {deal.targetId ? `(ID: ${deal.targetId})` : ""}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-semibold text-indigo-600">
                                                {deal.discountType === "PERCENTAGE" 
                                                    ? `${deal.discountValue}%` 
                                                    : `৳ ${deal.discountValue}`}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            <div>{new Date(deal.startDate).toLocaleDateString()}</div>
                                            <div className="text-xs text-gray-400">to</div>
                                            <div>{new Date(deal.endDate).toLocaleDateString()}</div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="font-medium text-gray-900">{deal.priority}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary" className={deal.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-600"}>
                                                {deal.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    onClick={() => onEdit(deal)}
                                                    className="h-8 border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors"
                                                >
                                                    <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    onClick={() => handleDelete(deal.id)}
                                                    className="h-8 border-red-200 text-red-700 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Tag className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No deals found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
