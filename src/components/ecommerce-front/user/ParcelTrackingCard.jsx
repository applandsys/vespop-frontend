"use client";

import React from "react";

const statusOrder = [
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED"
];

const statusColor = {
    PICKED_UP: "bg-blue-100 text-blue-700",
    IN_TRANSIT: "bg-yellow-100 text-yellow-700",
    OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700"
};

const statusIcon = {
    PICKED_UP: "📦",
    IN_TRANSIT: "🚚",
    OUT_FOR_DELIVERY: "🛵",
    DELIVERED: "✅",
    CANCELLED: "❌"
};

const ParcelTrackingCard = ({ data }) => {
    const { courier, consignmentId, tracking } = data;

    const currentIndex = statusOrder.indexOf(tracking.currentStatus);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">

            {/* UserHeader */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-semibold">Parcel Tracking</h2>
                    <p className="text-sm text-gray-500">
                        Courier: <span className="font-medium">{courier}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        Tracking ID: <span className="font-medium">{consignmentId}</span>
                    </p>
                </div>

                <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusColor[tracking.currentStatus]}`}>
                    {statusIcon[tracking.currentStatus]}{" "}
                    {tracking.currentStatus.replaceAll("_", " ")}
                </span>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-gray-200 ml-4">

                {tracking.timeline.map((item, index) => {
                    const stepIndex = statusOrder.indexOf(item.status);

                    const isCompleted = stepIndex < currentIndex;
                    const isActive = stepIndex === currentIndex;
                    const isUpcoming = stepIndex > currentIndex;

                    return (
                        <div key={index} className="mb-8 ml-6 relative">

                            {/* 🔵 SMART DOT */}
                            <div
                                className={`absolute -left-[10px] top-1 w-4 h-4 rounded-full transition-all duration-300
                                ${
                                    isActive
                                        ? "bg-blue-600 scale-125 ring-4 ring-blue-200"
                                        : isCompleted
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                }`}
                            />

                            {/* Card */}
                            <div className={`p-4 rounded-lg border
                                ${isActive ? "border-blue-300 bg-blue-50" : "bg-gray-50"}
                            `}>
                                <div className="flex justify-between flex-wrap gap-2">
                                    <span className="font-semibold text-gray-800">
                                        {statusIcon[item.status]}{" "}
                                        {item.status.replaceAll("_", " ")}
                                    </span>

                                    <span className="text-xs text-gray-500">
                                        {new Date(item.time).toLocaleString()}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-700 mt-1">
                                    {item.message}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    📍 {item.location}
                                </p>

                                {/* ACTIVE LABEL */}
                                {isActive && (
                                    <p className="text-xs text-blue-600 font-medium mt-2">
                                        ● Current Status
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ParcelTrackingCard;