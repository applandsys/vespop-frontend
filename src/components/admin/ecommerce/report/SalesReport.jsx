"use client";

import { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { getOrders } from "@/services/ecommerce/getOrders";


const SalesReport = ({type=null}) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders(type)
            .then(r => setOrders(r.data))
            .catch(console.error);
    }, []);


    const getStatusBadge = (status) => {
        const map = {
            paid: "bg-green-500",
            shipped: "bg-blue-500",
            cancel: "bg-red-500",
            return: "bg-orange-500",
            delivered: "bg-gray-600"
        };
        const color = map[status] || "bg-gray-400";
        return `<span class="${color} text-white text-xs px-2 py-1 rounded-md capitalize">${status}</span>`;
    };

    const data = orders.map((order, index) => [
        index + 1,
        order.customer?.uid ?? "",
        order.customer?.phone ?? "",
        `${order.customer?.first_name ?? ""} ${order.customer?.last_name ?? ""}`,
        `BDT ${order.totalAmount}`,
        html(getStatusBadge(order.status))
    ]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Order List</h2>
            <Grid
                columns={[
                    { name: "SL", width: "60px" },
                    { name: "Customer Id", width: "100px" },
                    { name: "Phone", width: "100px" },
                    { name: "Name", width: "180px" },
                    { name: "Total", width: "60px" },
                    { name: "Status", width: "60px" },
                ]}
                data={data}
                search
                sort
                pagination={{ limit: 10 }}
            />
        </div>
    );
};

export default SalesReport;
