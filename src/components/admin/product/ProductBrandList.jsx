import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import Image from "next/image";
import { getImageUrl } from "@/utils/R2Resolver";
import { Tag, Edit, Trash2 } from "lucide-react";
import config from "@/config";
import { fetchAllProductBrand } from "@/services/ecommerce/ProductBrand";

const ProductBrandList = ({brandList, setProductBrandList, setEditingBrand}) => {

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this brand?")) return;

        try {
            const response = await fetch(`${config.apiBaseUrl}/admin/product/delete-product-brand/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedBrandList = await fetchAllProductBrand();
                setProductBrandList(updatedBrandList);
            } else {
                alert("Failed to delete brand");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting brand");
        }
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Tag className="w-5 h-5 text-indigo-500" />
                    Product Brands
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[80px] font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="w-[80px] font-semibold text-gray-600 text-center">Logo</TableHead>
                                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                                <TableHead className="w-[180px] font-semibold text-gray-600 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {brandList.length > 0 ? brandList.map((brand, index) => (
                                <TableRow key={brand.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium text-gray-500">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center items-center">
                                            <div className="w-10 h-10 overflow-hidden rounded-md border border-gray-100 shadow-sm flex items-center justify-center bg-white">
                                                <Image 
                                                    className="object-contain" 
                                                    src={`${getImageUrl(brand.logo)}`} 
                                                    alt={brand.name} 
                                                    width={32} 
                                                    height={32} 
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-800">
                                        {brand.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => setEditingBrand(brand)}
                                                className="h-8 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                            >
                                                <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => handleDelete(brand.id)}
                                                className="h-8 border-gray-200 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Tag className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No brands found</p>
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

export default ProductBrandList;