"use client";

import React, {useEffect, useState} from 'react';
import {fetchSupplierDue} from "@/services/admin/SupplierPayment";
import DueSupplier from "@/components/admin/ecommerce/supplier/DueSupplier";

const DuePaymentPage = () => {
    const [supplierDue,setSupplierDue ] = useState([]);

    useEffect(()=>{
        fetchSupplierDue().then(res=>{setSupplierDue(res)}).catch(error=>{console.log(error)});
    });

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div>
                       <DueSupplier dues={supplierDue}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DuePaymentPage;
