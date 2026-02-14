"use client";

import React, { useEffect, useState } from "react";
import { GetCustomerData } from "@/services/ecommerce/GetReduxData";
import DashboardCard from "@/components/ecommerce/user/DashboardCard";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { getUserStats } from "@/services/user/GetUserStats";

function UserDashboard() {
    const { token, customer } = GetCustomerData();
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (customer?.id) {
            getUserStats(parseInt(customer.id))
                .then((data) => {
                    setUserStats(data);
                })
                .catch((err) => {
                    console.error("Failed to load stats:", err);
                })
                .finally(() => setLoading(false));
        }
    }, [customer?.id]);

    if (loading) {
        return <p className="text-gray-500">Loading stats...</p>;
    }

    if (!userStats) {
        return <p className="text-red-500">No stats available</p>;
    }

    return (
        <div className="mx-2">
            <h3 className="font-bold text-gray-500 mb-4">
                Welcome {`${customer?.first_name} ${customer?.last_name ?? ""} !`}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example debug */}
                {/* <pre>{JSON.stringify(userStats, null, 2)}</pre> */}

                <DashboardCard
                    title="All Orders"
                    value={
                        Object.values(userStats).reduce((sum, val) => sum + val, 0) // sum of all statuses
                    }
                    subtitle="Orders till date"
                    icon={<ShoppingCartIcon className="w-6 h-6" />}
                />

                <DashboardCard
                    title="Pending Orders"
                    value={userStats.PENDING}
                    subtitle="Awaiting processing"
                    icon={<ShoppingCartIcon className="w-6 h-6" />}
                />

                <DashboardCard
                    title="Completed Orders"
                    value={userStats.DELIVERED}
                    subtitle="Delivered successfully"
                    icon={<ShoppingCartIcon className="w-6 h-6" />}
                />

                <DashboardCard
                    title="Cancelled Orders"
                    value={userStats.CANCELLED}
                    subtitle="Customer cancelled"
                    icon={<ShoppingCartIcon className="w-6 h-6" />}
                />

                <DashboardCard
                    title="Shipped Orders"
                    value={userStats.SHIPPED}
                    subtitle="On the way"
                    icon={<ShoppingCartIcon className="w-6 h-6" />}
                />

                <DashboardCard
                    title="Paid Orders"
                    value={userStats.PAID}
                    subtitle="Payment received"
                    icon={<ShoppingCartIcon className="w-6 h-6" />}
                />
            </div>
        </div>
    );
}

export default UserDashboard;
