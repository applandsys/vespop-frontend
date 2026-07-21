"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/config";
import { GetCustomerData } from "@/services/ecommerce/GetReduxData";

export default function OrderSuccess() {
    const params = useSearchParams();
    const orderId = params.get("orderId");
    const { token } = GetCustomerData();

    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId || !token) return;

        axios
            .get(`${config.apiBaseUrl}/customer/orderbyid/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((res) => {
                setOrderDetail(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Order fetch error:", err);
                setLoading(false);
            });
    }, [orderId, token]);

    if (loading) {
        return (
            <p className="text-center mt-10 text-gray-600">
                Loading order details...
            </p>
        );
    }

    if (!orderDetail) {
        return (
            <p className="text-center mt-10 text-red-600">
                Order not found.
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-10">

                {/* Success Icon */}
                <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Order Successful!
                </h1>
                <p className="text-center text-gray-600 mt-2">
                    Thank you for your purchase.
                </p>

                {/* Order Summary */}
                <div className="mt-6 bg-gray-100 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Order ID</span>
                        <span className="font-medium">
                            #{orderDetail.id}
                        </span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Status</span>
                        <span
                            className={`font-medium ${
                                orderDetail.status === "PENDING"
                                    ? "text-amber-600"
                                    : "text-green-600"
                            }`}
                        >
                            {orderDetail.status}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="font-bold text-gray-900">
                            ৳{orderDetail.totalAmount}
                        </span>
                    </div>
                </div>

                {/* Product List */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                        Ordered Products
                    </h2>

                    <div className="space-y-4">
                        {orderDetail.orderItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-start border-b pb-3 last:border-b-0"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {item.product.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-medium text-gray-900">
                                        ৳{item.price * item.quantity}
                                    </p>

                                    {item.product.discountPrice && (
                                        <p className="text-xs text-green-600">
                                            Discount applied
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between mt-4 font-semibold text-gray-800">
                        <span>Total</span>
                        <span>৳{orderDetail.totalAmount}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/user/orders"
                        className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition text-center"
                    >
                        View Orders
                    </a>

                    <a
                        href="/"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition text-center"
                    >
                        Continue Shopping
                    </a>
                </div>
            </div>
        </div>
    );
}
