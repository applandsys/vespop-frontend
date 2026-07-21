"use client";

import React, {useEffect, useState} from 'react';
import PaidSupplier from "@/components/admin/ecommerce/supplier/PaidSupplier";
import {fetchSupplierPaid} from "@/services/admin/SupplierPayment";
import { CheckCircle } from "lucide-react";

const PaidPaymentPage = () => {
    const [supplierPaid,setSupplierPaid ] = useState([]);

    useEffect(()=>{
        fetchSupplierPaid().then(res=>{setSupplierPaid(res)}).catch(error=>{console.log(error)});
    }, []);

    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    Supplier Payments
                </h1>
                <p className="text-sm text-gray-500 mt-1">View history of completed payments made to suppliers.</p>
            </div>
            
            <PaidSupplier paids={supplierPaid}/>
        </div>
    );
};

export default PaidPaymentPage;
