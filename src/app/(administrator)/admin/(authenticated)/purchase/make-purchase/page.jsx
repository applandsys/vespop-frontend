"use client";

import React, { useEffect } from 'react';
import MakePurchase from "@/components/admin/ecommerce/purchase/MakePurchase";
import { allProducts } from "@/services/ecommerce/GetProducts";
import { allSupplier } from "@/services/ecommerce/FetchSupplier";

const MakePurchasePage = () => {
    const [products, setProducts] = React.useState([]);
    const [suppliers, setSuppliers] = React.useState([]);

    useEffect(() => {
        allProducts().then(products => { 
            setProducts(products || []); 
        }).catch(console.error);

        allSupplier().then(supplier => { 
            setSuppliers(supplier || []); 
        }).catch(console.error);
    }, []);

    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Purchase</h1>
                <p className="text-sm text-gray-500 mt-1">Record a new product purchase from your suppliers to update your inventory.</p>
            </div>

            <MakePurchase products={products} suppliers={suppliers} />
        </div>
    );
};

export default MakePurchasePage;
