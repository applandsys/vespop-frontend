"use client";

import ProductAddEditForm from "@/components/admin/ecommerce/ProductAddEditForm";
import { Package } from "lucide-react";

const AddProduct = () => {
    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <Package className="w-8 h-8 text-indigo-500" />
                    Create Product
                </h1>
                <p className="text-sm text-gray-500 mt-1">Add a new product to your inventory with pricing, stock, and variations.</p>
            </div>
            <ProductAddEditForm />
        </div>
    );
};

export default AddProduct;