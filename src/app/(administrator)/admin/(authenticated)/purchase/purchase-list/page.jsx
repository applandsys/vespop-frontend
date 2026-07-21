"use client";

import React, { useEffect, useState } from "react";
import PurchaseList from "@/components/admin/ecommerce/PurchaseList";
import { fetchPurchase } from "@/services/admin/PurchaseService";

const PurchaseListPage = () => {
    const [purchase, setPurchase] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchPurchase(page, limit);
            if (res?.purchase?.data) {
                setPurchase(res.purchase.data);
                setTotalPages(res.purchase.meta.totalPages);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [page]);

    return (
        <div className="space-y-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Purchase Management</h1>
                <p className="text-sm text-gray-500 mt-1">Review inventory purchases, pricing history, and process returns.</p>
            </div>

            <PurchaseList
                purchase={purchase}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                loading={loading}
            />
        </div>
    );
};

export default PurchaseListPage;