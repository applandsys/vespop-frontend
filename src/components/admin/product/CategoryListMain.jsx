import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import { Edit, Trash2, ListTree } from "lucide-react";

const CategoryListMain = ({categoryList}) => {
    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <ListTree className="w-5 h-5 text-indigo-500" />
                    Categories
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[80px] font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Child Categories</TableHead>
                                <TableHead className="w-[180px] font-semibold text-gray-600 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryList.length > 0 ? categoryList.map((category, index) => (
                                <TableRow key={category.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium text-gray-500">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-800">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.childrens?.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {category.childrens.map((child) => (
                                                    <span key={child.id} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium border border-gray-200">
                                                        {child.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">No child categories</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                asChild
                                                className="h-8 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                            >
                                                <Link href={`/admin/product-category/edit/${category.slug}`}>
                                                    <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                                </Link>
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
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
                                            <ListTree className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No categories found</p>
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

export default CategoryListMain;