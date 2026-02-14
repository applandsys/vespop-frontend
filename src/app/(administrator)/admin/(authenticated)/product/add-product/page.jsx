"use client";

import ProductAddEditForm from "@/components/admin/ecommerce/ProductAddEditForm";

const AddProduct = () => {
    return (
        <div>
            <div className="flex-1 p-2">
                <div className="gap-1">
                    <h1 className="text-2xl font-semibold my-2"> Create Product </h1>
                    <ProductAddEditForm />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;