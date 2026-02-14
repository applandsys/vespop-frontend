"use client";

import React, {useEffect, useState} from 'react';
import ProductCategoryForm from "@/components/admin/ecommerce/ProductCategoryForm";
import CategoryList from "@/components/ecommerce/admin/product/CategoryList";
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
        <>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-1  p-2">
                    <ProductCategoryForm fetchCategories={fetchCategories} categoryList={categoryList}/>
                </div>
                <div className="md:col-span-3 p-2">
                    <CategoryList categoryList={categoryList}/>
                </div>
            </div>
        </>
    );
};

export default ProductCategory;