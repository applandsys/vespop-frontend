"use client";

import React, {useEffect, useState} from 'react';
import ProductCategoryForm from "@/components/admin/ecommerce/ProductCategoryForm";
import CategoryList from "@/components/admin/product/CategoryList";
import {fetchAllCategories, fetchAllCategoriesZeroCount} from "@/services/ecommerce/GetCategory";

const ProductCategory = () => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetchAllCategoriesZeroCount().then(res=>{
            setCategoryList(res);
        }).catch(err=>console.log(err));
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Product Categories</h1>
                <p className="text-sm text-gray-500">Create, edit, and organize product categories, subcategories, and hierarchy.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 items-start">
                <div className="md:col-span-1">
                    <ProductCategoryForm fetchCategories={fetchCategories} categoryList={categoryList}/>
                </div>
                <div className="md:col-span-3">
                    <CategoryList categoryList={categoryList}/>
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;