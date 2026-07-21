import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import Link from "next/link";
import { Edit, Trash2, Truck } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/utils/R2Resolver";

const AllSupplier = ({ supplier = [], handleDelete, setEditingSupplier }) => {
    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Truck className="w-5 h-5 text-indigo-500" />
                    Suppliers
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[80px] font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="w-[60px] font-semibold text-gray-600 text-center">Logo</TableHead>
                                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Contact</TableHead>
                                <TableHead className="font-semibold text-gray-600">Type</TableHead>
                                <TableHead className="w-[180px] font-semibold text-gray-600 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {supplier.length > 0 ? supplier.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium text-gray-500">
                                        {item.id}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.logo ? (
                                            <div className="w-8 h-8 overflow-hidden rounded border border-gray-100 flex items-center justify-center bg-white mx-auto">
                                                <Image 
                                                    src={`${getImageUrl(item.logo)}`} 
                                                    alt={item.name} 
                                                    width={32} 
                                                    height={32} 
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">N/A</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-gray-800">{item.name}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.address}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-700">{item.phone}</div>
                                        <div className="text-xs text-gray-500">{item.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 uppercase text-[10px]">
                                            {item.type || 'Standard'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => setEditingSupplier(item)}
                                                className="h-8 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                            >
                                                <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => handleDelete(item.id)}
                                                className="h-8 border-gray-200 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Truck className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No suppliers found</p>
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

export default AllSupplier;