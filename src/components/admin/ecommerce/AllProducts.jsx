"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/services/admin/getAllProducts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Package, Edit, Loader2, Trash2 } from "lucide-react";
import config from "@/config";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                setProducts(res || []);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        try {
            const res = await fetch(`${config.apiBaseUrl}/admin/product/delete-product/${productId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            
            if (res.ok) {
                alert(data.message || "Product deleted successfully");
                setProducts(products.filter(p => p.id !== productId));
            } else {
                alert(data.message || "Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product.");
        }
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Package className="w-5 h-5 text-indigo-500" />
                    Product Inventory
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[400px] relative">
                    {loading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-2 text-indigo-600">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <span className="text-sm font-medium text-gray-600">Loading products...</span>
                            </div>
                        </div>
                    )}

                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[80px] font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Slug</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-right">Buy Price</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-right">Sell Price</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Discount</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-right">Discount Price</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Points</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Status</TableHead>
                                <TableHead className="w-[100px] font-semibold text-gray-600 text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-medium text-gray-500">#{product.id}</TableCell>
                                        <TableCell className="font-semibold text-gray-800">{product.name}</TableCell>
                                        <TableCell className="text-gray-500 text-sm">{product.slug}</TableCell>
                                        <TableCell className="text-right text-gray-600 font-medium">${product.buyPrice}</TableCell>
                                        <TableCell className="text-right text-emerald-600 font-medium">${product.sellPrice}</TableCell>
                                        <TableCell className="text-center text-rose-500 font-medium">
                                            {product.discount ? `${product.discount}%` : "-"}
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-indigo-600">
                                            ${product.discountPrice || product.sellPrice}
                                        </TableCell>
                                        <TableCell className="text-center text-amber-600 font-bold">{product.point || 0}</TableCell>
                                        <TableCell className="text-center">
                                            {product.visibility === "published" ? (
                                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 shadow-none">
                                                    Published
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-gray-500 bg-gray-100">
                                                    {product.visibility || "Hidden"}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    asChild
                                                    className="h-8 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                >
                                                    <Link href={`/admin/product/edit-product/${product.id}`}>
                                                        <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    onClick={() => handleDelete(product.id)}
                                                    className="h-8 border-gray-200 hover:bg-red-50 hover:text-red-600 text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : !loading && (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Package className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No products found</p>
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

export default AllProducts;