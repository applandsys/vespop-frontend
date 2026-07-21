import React from 'react';
import AllProducts from "@/components/admin/ecommerce/AllProducts";

const ProductList = () => {
    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product List</h1>
                <p className="text-sm text-gray-500 mt-1">Manage and view all products available in your inventory.</p>
            </div>
            <AllProducts/>
        </div>
    );
};

export default ProductList;