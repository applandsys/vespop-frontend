"use client";

import { useEffect, useState } from "react";

const ProfitSummary = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${config.apiBaseUrl}/account/profit`)
            .then((res) => res.json())
            .then((res) => {
                if (!res.success) throw new Error("Failed to load profit");
                setData(res.data);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="p-4 rounded bg-gray-100 animate-pulse">
                Loading profit report...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 rounded bg-red-100 text-red-700">
                {error}
            </div>
        );
    }

    const { totalIncome, totalExpense, profit } = data;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
                title="Total Income"
                value={totalIncome}
                color="text-green-600"
            />
            <StatCard
                title="Total Expense"
                value={totalExpense}
                color="text-red-600"
            />
            <StatCard
                title="Net Profit"
                value={profit}
                color={profit >= 0 ? "text-green-700" : "text-red-700"}
                highlight
            />
        </div>
    );
};

const StatCard = ({ title, value, color, highlight }) => (
    <div
        className={`p-5 rounded-lg shadow-sm border ${
            highlight ? "bg-gray-50" : "bg-white"
        }`}
    >
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>
            ৳ {Number(value).toLocaleString()}
        </p>
    </div>
);

export default ProfitSummary;