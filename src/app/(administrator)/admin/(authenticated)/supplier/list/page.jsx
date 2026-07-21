"use client";

import React, {useEffect, useState} from 'react';
import AllSupplier from "@/components/admin/ecommerce/supplier/AllSupplier";
import AddEditSupplier from "@/components/admin/ecommerce/supplier/AddEditSupplier";
import {getAlSupplier} from "@/services/admin/getAlSupplier";
import config from "@/config";
import { Truck } from "lucide-react";

const SupplierListPage = () => {

    const [supplier, setSupplier] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);

    const fetchSupplierData = () => {
        getAlSupplier().then(r => setSupplier(r)).catch(e => console.error(e));
    };

    useEffect(() => {
        fetchSupplierData();
    }, []);

    const handleDelete = async (supplierId) => {
        if (!confirm("Are you sure you want to delete this supplier?")) return;

        try {
            const res = await fetch(
                `${config.apiBaseUrl}/supplier/${supplierId}`,
                { method: "DELETE" }
            );

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);

            setSupplier(prev => prev.filter(s => s.id !== supplierId));
        } catch (e) {
            console.error(e);
            alert("Failed to delete supplier");
        }
    };

    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <Truck className="w-8 h-8 text-indigo-500" />
                    Suppliers
                </h1>
                <p className="text-sm text-gray-500 mt-1">Manage and view all your inventory suppliers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                    <AddEditSupplier 
                        editingSupplier={editingSupplier} 
                        setEditingSupplier={setEditingSupplier} 
                        fetchSupplier={fetchSupplierData} 
                    />
                </div>
                <div className="md:col-span-3">
                    <AllSupplier 
                        supplier={supplier} 
                        handleDelete={handleDelete} 
                        setEditingSupplier={setEditingSupplier} 
                    />
                </div>
            </div>
        </div>
    );
};

export default SupplierListPage;
