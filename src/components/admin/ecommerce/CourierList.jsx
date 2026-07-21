'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import config from "@/config";
import { Edit, Trash2, Box } from "lucide-react";

const CourierList = ({ couriers = [], fetchCourier }) => {
    const router = useRouter();
    const [deleting, setDeleting] = useState(null);

    const handleEdit = (courierId) => {
        router.push(`/admin/api-integration/courier/${courierId}`);
    };

    const handleDelete = async (courierId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this courier?");
        if (confirmDelete) {
            setDeleting(courierId);
            try {
                // Using config.apiBaseUrl since the backend was updated directly
                const response = await fetch(`${config.apiBaseUrl}/courier/${courierId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success("Courier deleted successfully");
                    if (fetchCourier) fetchCourier();
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    toast.error(errorData.message || "Error deleting courier");
                }
            } catch (error) {
                console.error("Error deleting courier", error);
                toast.error("Error deleting courier");
            } finally {
                setDeleting(null);
            }
        }
    };

    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Box className="w-5 h-5 text-indigo-500" />
                    Courier Integrations
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[80px] font-semibold">ID</TableHead>
                                <TableHead className="font-semibold">Courier Name</TableHead>
                                <TableHead className="w-[120px] font-semibold text-center">Status</TableHead>
                                <TableHead className="w-[180px] text-right font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {couriers.length > 0 ? (
                                couriers.map((courier, index) => (
                                    <TableRow key={courier.id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-medium text-gray-500">{index + 1}</TableCell>
                                        <TableCell className="font-semibold text-gray-800">{courier.name}</TableCell>
                                        <TableCell className="text-center">
                                            {courier.isActive ? (
                                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-gray-500 bg-gray-100">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    onClick={() => handleEdit(courier.id)}
                                                    className="h-8 border-gray-200 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                                                >
                                                    <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                                </Button>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm" 
                                                    onClick={() => handleDelete(courier.id)}
                                                    disabled={deleting === courier.id}
                                                    className="h-8"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 mr-1" /> {deleting === courier.id ? '...' : 'Delete'}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Box className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No couriers integrated</p>
                                            <p className="text-xs text-gray-400 mt-1">Add a new courier from the sidebar</p>
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
};

export default CourierList;