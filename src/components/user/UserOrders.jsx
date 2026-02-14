"use client";

import React from "react";
import Link from "next/link";
import {getHumanDate} from "@/utils/getHumanDate";

export default function UserOrders({orderList}) {
    return (
        <div className="mx-auto">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {orderList.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{getHumanDate(order.createdAt)}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{order._count.orderItems}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">৳ {order.totalAmount}</td>
                            <td className="px-6 py-4">
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
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link href={`/user/orders/detail/${order.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
