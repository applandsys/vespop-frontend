"use client";

import React, {useEffect, useState} from 'react';
import ProductCategoryForm from "@/components/admin/ecommerce/ProductCategoryForm";
import {fetchCategoriesByType} from "@/services/ecommerce/GetCategory";
import CategoryListMain from "@/components/admin/product/CategoryListMain";
import { ListTree } from "lucide-react";

const MainCategory = () => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetchCategoriesByType('main').then(res=>{
            setCategoryList(res);
        }).catch(err=>console.log(err));
    }

    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <ListTree className="w-8 h-8 text-indigo-500" />
                    Product Categories
                </h1>
                <p className="text-sm text-gray-500 mt-1">Organize your products with primary and sub-categories.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                    <ProductCategoryForm fetchCategories={fetchCategories} categoryList={categoryList}/>
                </div>
                <div className="md:col-span-3">
                    <CategoryListMain categoryList={categoryList}/>
                </div>
            </div>
        </div>
    );
};

export default MainCategory;