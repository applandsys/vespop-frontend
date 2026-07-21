"use client";

import React, { useEffect, useState } from "react";
import { getAllProductsStock } from "@/services/admin/getProductStock";
import { addStock } from "@/services/admin/addProductStock";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Badge } from "@/components/ui/shadcn/badge";
import { PackagePlus, Package } from "lucide-react";

const ProductStock = () => {
    const [productStock, setProductStock] = useState([]);
    
    // Modal State
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProductStock();
    }, []);

    const fetchProductStock = async () => {
        try {
            const res = await getAllProductsStock();
            setProductStock(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const triggerAddStockModal = (productId, variantKey, name) => {
        setSelected({ productId, variantKey, name });
        setQuantity("");
        setOpen(true);
    };

    const handleAddStock = async () => {
        if (!quantity || Number(quantity) <= 0) {
            toast.error("Please enter a valid quantity");
            return;
        }
        
        try {
            setSubmitting(true);
            await addStock({
                productId: selected.productId,
                productVariantId: selected.variantKey === "no-variant" ? null : Number(selected.variantKey),
                quantity: Number(quantity),
            });
            
            toast.success("Stock added successfully!");
            setOpen(false);
            setQuantity("");
            await fetchProductStock();
        } catch (err) {
            console.error(err);
            toast.error("Failed to add stock");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Package className="w-5 h-5 text-indigo-500" />
                    Product Stock Inventory
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[60px] font-semibold text-gray-600">SL</TableHead>
                                <TableHead className="font-semibold text-gray-600">Product Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Variant</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Total Stock</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Reserved</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Available</TableHead>
                                <TableHead className="w-[120px] font-semibold text-gray-600 text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productStock.length > 0 ? (
                                productStock.flatMap((product, index) => 
                                    Object.entries(product.variants).map(([vKey, variant], vIndex) => {
                                        const available = variant.stock - variant.reserved;
                                        return (
                                            <TableRow key={`${product.productId}-${vKey}`} className="hover:bg-gray-50/50 transition-colors">
                                                <TableCell className="font-medium text-gray-500">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-semibold text-gray-800">
                                                        {product.productName}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                                                        {variant.variantName}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center font-medium text-blue-600">
                                                    {variant.stock}
                                                </TableCell>
                                                <TableCell className="text-center font-medium text-orange-500">
                                                    {variant.reserved}
                                                </TableCell>
                                                <TableCell className="text-center font-bold text-green-600">
                                                    {available}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        onClick={() => triggerAddStockModal(product.productId, vKey, `${product.productName} - ${variant.variantName}`)}
                                                        className="h-8 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                    >
                                                        <PackagePlus className="w-3.5 h-3.5 mr-1" /> Add Stock
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Package className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No inventory records found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="bg-white w-[400px] rounded-xl shadow-2xl p-6 relative">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-bold mb-1 text-gray-800 flex items-center gap-2">
                            <PackagePlus className="w-5 h-5 text-indigo-500" />
                            Add Stock
                        </h3>
                        
                        <p className="text-sm text-gray-500 mb-5 pb-4 border-b">
                            {selected?.name}
                        </p>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">Quantity to Add</Label>
                            <Input
                                type="number"
                                placeholder="Enter quantity..."
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="1"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleAddStock}
                                disabled={submitting}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                {submitting ? "Confirming..." : "Confirm Stock Add"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default ProductStock;
