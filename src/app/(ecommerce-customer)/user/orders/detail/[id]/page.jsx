"use client";

import React from "react";

const order = {
    id: "ORD-1001",
    date: "2025-09-25",
    status: "Delivered",
    total: 129.99,
    paymentMethod: "Credit Card",
    shippingAddress: {
        name: "John Doe",
        address: "123 Main St, Springfield, USA",
        phone: "+1 234 567 890",
    },
    items: [
        {
            id: 1,
            name: "Nike Air Sneakers",
            qty: 1,
            price: 89.99,
            image: "https://via.placeholder.com/60",
        },
        {
            id: 2,
            name: "Leather Wallet",
            qty: 2,
            price: 20,
            image: "https://via.placeholder.com/60",
        },
    ],
};

export default function OrderDetail() {
    return (
        <div className="p-4 max-w-5xl mx-auto">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Details
            </h2>

            {/* Order Info */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium text-gray-800">{order.id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-800">{order.date}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                                order.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "Shipped"
                                        ? "bg-blue-100 text-blue-700"
                                        : order.status === "Processing"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                            }`}
                        >
              {order.status}
            </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium text-gray-800">${order.total}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium text-gray-800">{order.paymentMethod}</p>
                    </div>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Shipping Address
                </h3>
                <p className="font-medium text-gray-800">{order.shippingAddress.name}</p>
                <p className="text-gray-600">{order.shippingAddress.address}</p>
                <p className="text-gray-600">{order.shippingAddress.phone}</p>
            </div>

            {/* Order Items */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Items in this Order
                </h3>
                <div className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between py-4"
                        >
                            <div className="flex items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 object-cover rounded-md border"
                                />
                                <div className="ml-4">
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-800">
                                    ${(item.price * item.qty).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    ${item.price.toFixed(2)} each
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
