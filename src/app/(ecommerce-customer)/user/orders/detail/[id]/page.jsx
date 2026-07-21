"use client";

import React, { useEffect, useState } from "react";
import { fetchOrderById } from "@/services/ecommerce/orderService";
import {generateInvoicePdf} from "@/utils/generateInvoicePdf";
import {fetchSettingData} from "@/services/site/SettingData";
import Image from "next/image";
import config from "@/config";
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";

export default function OrderDetail({ params }) {
    const id = params.id;
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const [siteLogo, setSiteLogo] = useState(null);
    const [siteSetting, setSiteSetting] = useState(null);

    const { token, customer } = GetCustomerData();

    useEffect(() => {
        fetchOrderById(id,token)
            .then((response) => {
                setOrderDetail(response.data);
            })
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchSettingData().then((settings) => {
                if (settings?.success) {
                    setSiteLogo(settings.data.logo);
                    setSiteSetting(settings.data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading order...</div>;
    }

    if (!orderDetail) {
        return <div className="p-6 text-center text-red-500">Order not found</div>;
    }

    const {
        id: orderId,
        createdAt,
        status,
        totalAmount,
        orderItems,
    } = orderDetail;

    const statusColor = {
        PENDING: "bg-yellow-100 text-yellow-700",
        PAID: "bg-blue-100 text-blue-700",
        SHIPPED: "bg-indigo-100 text-indigo-700",
        DELIVERED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <div>
                <Image
                    src={`${config.publicPath}/${siteLogo}`}
                    width={120}
                    height={40}
                    alt="logo"
                    priority
                />
            </div>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() =>
                        generateInvoicePdf(orderDetail, {
                            ...siteSetting,
                            logo: `${config.publicPath}/${siteSetting.logo}`,
                        })
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                >
                    Download Invoice
                </button>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Details
            </h2>

            {/* Order Info */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium text-gray-800">
                            #{orderId}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-800">
                            {new Date(createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[status] || "bg-gray-100 text-gray-700"}`}
                        >
                            {status}
                        </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium text-gray-800">
                            ৳{totalAmount.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Items in this Order
                </h3>

                <div className="divide-y divide-gray-200">
                    {orderItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between py-4"
                        >
                            <div>
                                <p className="font-medium text-gray-800">
                                    {item.product?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-medium text-gray-800">
                                    ৳{(item.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    ৳{item.price.toFixed(2)} each
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Total */}
                <div className="flex justify-end pt-4 border-t mt-4">
                    <p className="text-lg font-semibold text-gray-800">
                        Total: ৳{totalAmount.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}