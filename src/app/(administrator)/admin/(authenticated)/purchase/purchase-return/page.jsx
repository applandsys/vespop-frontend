"use client";

import React, { useEffect, useState } from "react";
import PurchaseReturnList from "@/components/admin/ecommerce/PurchaseReturnList";
import { fetchPurchaseReturns } from "@/services/admin/PurchaseReturnService";

const PurchaseReturnPage = () => {
    const [returns, setReturns] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchPurchaseReturns(page, limit);
            if (res?.data) {
                setReturns(res.data);
                setTotalPages(res.meta.totalPages);
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
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Purchase Return History</h1>
                <p className="text-sm text-gray-500 mt-1">Review the historical ledger of all stock returned to suppliers.</p>
            </div>

            <PurchaseReturnList
                returns={returns}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                loading={loading}
            />
        </div>
    );
};

export default PurchaseReturnPage;
