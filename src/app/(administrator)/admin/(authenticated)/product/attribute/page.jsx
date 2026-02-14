"use client";
import React, {useEffect} from 'react';
import ProductAttributeForm from "@/components/admin/ecommerce/ProductAttributeForm";
import ProductAttributeList from "@/components/ecommerce/admin/product/ProductAttributeList";
import {getAttributes} from "@/services/ecommerce/getAttributes";

const ProductAttribute = () => {

    const [attributes,setAttributes] = React.useState([]);

    useEffect(() => {
        fetchAttributes();
    },[]);

    const fetchAttributes = () =>{
        getAttributes().then(res=>setAttributes(res)).catch(err=>console.log("attribute error",err));
    }

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-3 gap-2 px-2">
                    <div className="col-span-1">
                        <ProductAttributeForm fetchAttributes={fetchAttributes}/>
                    </div>

                    <div className="col-span-2">
                        <ProductAttributeList attributes={attributes} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAttribute;