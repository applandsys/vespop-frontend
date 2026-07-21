"use client";
import React, {useEffect} from 'react';

import {allSupplier} from "@/services/ecommerce/FetchSupplier";
import MakeSupplierPaymentForm from "@/components/admin/ecommerce/supplier/MakeSupplierPaymentForm";

const MakeSupplierPaymentPage = () => {

    const [suppliers, setSuppliers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(()=>{
        allSupplier().then(supplier => { setSuppliers(supplier); }).catch(console.error);
    },[]);

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <MakeSupplierPaymentForm suppliers={suppliers} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeSupplierPaymentPage;
