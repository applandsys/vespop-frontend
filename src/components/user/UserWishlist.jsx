"use client";

import React from "react";
import Image from "next/image";
import config from "@/config";


export default function UserWishlist({wishlistItems}) {
    return (
        <div className="p-4 max-w-6xl mx-auto">
            {wishlistItems.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
                    Your wishlist is empty.
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                    {wishlistItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 hover:bg-gray-50"
                        >
                            {/* Product Info */}
                            <div className="flex items-center">
                                <Image
                                    width={50}
                                    height={50}
                                    src={`${config.publicPath}/images/products/${item.product.images[0].name}`}
                                    alt={item.product.images[0].altText} className="w-16 h-16 object-cover rounded-md border" />

                                <div className="ml-4">
                                    <p className="font-medium text-gray-800">{item.product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        ${item.product.sellPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                                    Move to Cart
                                </button>
                                <button className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
