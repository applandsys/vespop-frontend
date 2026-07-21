"use client";

import React, {useEffect, useState} from "react";
import {fetchAllCategoriesZeroCount, fetchCategoryDetail} from "@/services/ecommerce/GetCategory";
import ProductCategoryForm from "@/components/admin/ecommerce/ProductCategoryForm";


const  EditCategoryPage = ({ params }) =>{

    const { slug } = params;

    const [categoryList, setCategoryList] = useState([]);

    const [categoryToEdit,setCategoryToEdits] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchCategoryDetail(slug).then((res) => setCategoryToEdits(res)).catch(console.error);
    }, []);

    const fetchCategories = () => {
        fetchAllCategoriesZeroCount().then(res=>{
            setCategoryList(res);
        }).catch(err=>console.log(err));
    }

    return (
        <>
            <div className="p-4 w-full md:w-1/2">
                <ProductCategoryForm fetchCategories={fetchCategories} categoryList={categoryList} categoryToEdit={categoryToEdit}/>
            </div>
        </>
    );
}

export default EditCategoryPage;