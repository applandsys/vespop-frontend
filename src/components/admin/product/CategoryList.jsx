import React from 'react';
import Link from "next/link";
import { getImageUrl } from "../../../utils/R2Resolver";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";

const CategoryList = ({ categoryList = [] }) => {
    return (
        <Card className="w-full">
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-bold">Categories</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Parent</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryList && categoryList.length > 0 ? (
                                categoryList.map((category, index) => (
                                    <TableRow key={category.id || index} className="hover:bg-gray-50/50">
                                        <TableCell className="font-medium text-gray-500">{index + 1}</TableCell>
                                        <TableCell className="font-semibold text-gray-800">{category.name}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                category.parent?.name ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                                            }`}>
                                                {category.parent?.name ?? 'Primary'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {category.image ? (
                                                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-150 bg-gray-50 flex items-center justify-center">
                                                    <Image 
                                                        src={getImageUrl(category.image)} 
                                                        alt={category.name}
                                                        width={32}
                                                        height={32}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400">No image</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/product-category/edit/${category.slug}`}>
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="sm">
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                        No categories found.
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

export default CategoryList;