"use client";

import React, {useEffect, useState} from 'react';
import ProductBrandList from "@/components/admin/product/ProductBrandList";
import {fetchAllProductBrand} from "@/services/ecommerce/ProductBrand";
import ProductBrandAddEditForm from "@/components/admin/ecommerce/ProductBrandAddEditForm";
import { Tag } from "lucide-react";

const ProductCategory = () => {

    const [productBrandList, setProductBrandList] = useState([]);
    const [editingBrand, setEditingBrand] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllProductBrand().then(res=>{
            setProductBrandList(res);
        }).catch(err=>setError(err));
    }, []);


    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <Tag className="w-8 h-8 text-indigo-500" />
                    Product Brands
                </h1>
                <p className="text-sm text-gray-500 mt-1">Manage and view all brands available for your products.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                    <ProductBrandAddEditForm 
                        setProductBrandList={setProductBrandList} 
                        editingBrand={editingBrand} 
                        setEditingBrand={setEditingBrand} 
                    />
                </div>
                <div className="md:col-span-3">
                    <ProductBrandList 
                        brandList={productBrandList} 
                        setProductBrandList={setProductBrandList}
                        setEditingBrand={setEditingBrand} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;