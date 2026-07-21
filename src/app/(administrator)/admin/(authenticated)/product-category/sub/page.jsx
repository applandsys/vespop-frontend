"use client";

import React, {useEffect, useState} from 'react';
import ProductCategoryForm from "@/components/admin/ecommerce/ProductCategoryForm";
import CategoryList from "@/components/admin/product/CategoryList";
import {fetchAllCategories, fetchAllCategoriesZeroCount, fetchCategoriesByType} from "@/services/ecommerce/GetCategory";
import CategoryListSub from "@/components/admin/product/CategoryListSub";

const SubCategory = () => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetchCategoriesByType('sub').then(res=>{
            setCategoryList(res);
        }).catch(err=>console.log(err));
    }

    const subCategories = categoryList.filter(
        (cat) => cat.parentId !== null
    );


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-1  p-2">
                    <ProductCategoryForm fetchCategories={fetchCategories} categoryList={categoryList}/>
                </div>
                <div className="md:col-span-3 p-2">
                    <CategoryListSub categoryList={subCategories}/>
                </div>
            </div>
        </>
    );
};

export default SubCategory;