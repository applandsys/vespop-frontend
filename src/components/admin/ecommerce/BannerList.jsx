'use client'

import React from 'react';
import Image from "next/image";
import { toast } from "react-toastify";
import { getImageUrl } from "@/utils/R2Resolver";
import config from "@/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Edit, Trash2, Image as ImageIcon } from "lucide-react";

const BannerList = ({ banners, onEdit, onRefresh }) => {

    const handleDelete = async (bannerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${config.apiBaseUrl}/admin/setting/banner/${bannerId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success("Banner deleted successfully!");
                    if (onRefresh) onRefresh();
                } else {
                    toast.error("Error deleting banner!");
                }
            } catch (error) {
                toast.error("Banner Error!");
            }
        }
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <ImageIcon className="w-5 h-5 text-indigo-500" />
                    Banners
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[60px] font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Name / Slug</TableHead>
                                <TableHead className="font-semibold text-gray-600">Titles</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Image</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Status</TableHead>
                                <TableHead className="w-[150px] font-semibold text-gray-600 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banners.length > 0 ? banners.map((banner, index) => (
                                <TableRow key={banner.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium text-gray-500">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-gray-800">{banner.name}</div>
                                        <div className="text-xs text-gray-500 font-mono mt-0.5">{banner.slug}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm font-medium text-gray-700">{banner.title_text || banner.title}</div>
                                        <div className="text-xs text-gray-500">{banner.sub_title}</div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {banner.image ? (
                                            <div className="flex justify-center">
                                                <Image 
                                                    className="h-10 w-auto rounded border shadow-sm" 
                                                    src={getImageUrl(banner.image)} 
                                                    alt={banner.name} 
                                                    width={80} 
                                                    height={40} 
                                                    style={{ backgroundColor: banner.background_color || 'transparent' }}
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs">No Image</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="secondary" className={banner.is_active ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-600"}>
                                            {banner.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => onEdit(banner.id)}
                                                className="h-8 border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors"
                                            >
                                                <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => handleDelete(banner.id)}
                                                className="h-8 border-red-200 text-red-700 hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <ImageIcon className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No banners found</p>
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

export default BannerList;