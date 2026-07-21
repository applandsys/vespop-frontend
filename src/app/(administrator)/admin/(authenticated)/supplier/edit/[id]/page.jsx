"use client";
import React from 'react';

import AddEditSupplier from "@/components/admin/ecommerce/supplier/AddEditSupplier";

const EditSupplierPage = ({params}) => {

    const supplierId = params.id;

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <AddEditSupplier supplierId={supplierId}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSupplierPage;
