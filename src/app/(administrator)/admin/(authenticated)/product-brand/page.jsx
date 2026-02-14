"use client";

import React, {useEffect, useState} from 'react';
import ProductBrandList from "@/components/ecommerce/admin/product/ProductBrandList";
import {fetchAllProductBrand} from "@/services/ecommerce/ProductBrand";
import ProductBrandAddEditForm from "@/components/admin/ecommerce/ProductBrandAddEditForm";

const ProductCategory = () => {

    const [productBrandList, setProductBrandList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllProductBrand().then(res=>{
            setProductBrandList(res);
        }).catch(err=>setError(err));
    }, []);


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-1  p-2">
                    <ProductBrandAddEditForm setProductBrandList={setProductBrandList}/>
                </div>
                <div className="md:col-span-3 p-2">
                    <ProductBrandList brandList={productBrandList}/>
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;