"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart, updateItemQuantity } from "@/redux/store/slices/cartSlice";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/16/solid";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Image from "next/image";
import React from "react";
import config from "@/config";

const CartList = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.length;

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ).toFixed(2);

    const dispatch = useDispatch();

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleChangeQuantity = (item, newQty) => {
        const quantity = parseInt(newQty, 10);
        if (!isNaN(quantity) && quantity >= 1 && quantity <= 10) {
            dispatch(updateItemQuantity({ id: item.id, quantity }));
        } else {
            console.log("Invalid quantity, please enter a value between 1 and 10.");
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <>
            <div className="text-gray-500 flex justify-between w-full">
                <div className="text-xs font-light text-gray-600 tracking-wide">
                    There {totalItems === 1 ? "is" : "are"} {totalItems}{" "}
                    {totalItems === 1 ? "product" : "products"} in your cart, totaling $
                    {subtotal}
                </div>
                <button
                    onClick={handleClearCart}
                    className="text-xs flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                    Clear Cart <TrashIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-4">
                    <div className="hidden md:block">
                        <table className="min-w-full table-auto">
                            <thead>
                            <tr className="border-b">
                                <th className="px-2 py-2 text-left">Product</th>
                                <th className="px-2 py-2 text-center">Unit Price</th>
                                <th className="px-2 py-2 text-center">Quantity</th>
                                <th className="px-2 py-2 text-center">Subtotal</th>
                                <th className="px-2 py-2 text-center">Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="px-2 py-2 flex items-center gap-2">
                                        {/*<input type="checkbox" className="form-checkbox w-auto" />*/}
                                        {item.images.length > 0 && (
                                            <Image
                                                width={50}
                                                height={50}
                                                src={`${config.publicPath}/images/products/${item.images[0].name}`}
                                                alt={item.images[0].altText}
                                                className="h-12 object-contain"
                                            />
                                        )}
                                        <span className="text-sm font-medium text-gray-800 break-words max-w-[200px]">
                                            {item.name}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2 text-center">${item.price.toFixed(2)}</td>
                                    <td className="px-2 py-2 text-center">
                                        <div className="flex items-center gap-2 min-w-[100px]">
                                            <button
                                                onClick={() => handleChangeQuantity(item, item.quantity - 1)}
                                                className="border px-2 py-1"
                                            >
                                                -
                                            </button>
                                            <input
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleChangeQuantity(item, e.target.value)}
                                                type="number"
                                                placeholder="1"
                                                min="1"
                                                max="10"
                                                step="1"
                                                className="border rounded px-2 py-1 text-center w-full"
                                            />
                                            <button
                                                onClick={() => handleChangeQuantity(item, item.quantity + 1)}
                                                className="border px-2 py-1"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 text-center font-medium text-green-600">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-600 hover:text-red-800 font-semibold"
                                        >
                                            <TrashIcon className="h-4 w-4 text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4 bg-white">
                                <div className="flex gap-3">

                                    {item.images.length > 0 && (
                                        <Image
                                            width={80}
                                            height={80}
                                            src={`${config.publicPath}/images/products/${item.images[0].name}`}
                                            alt={item.images[0].altText}
                                            className="w-20 h-20 object-contain flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-800 text-sm break-words">
                                            {item.name}
                                        </h3>
                                        <p className="text-green-600 font-semibold mt-1">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleChangeQuantity(item, item.quantity - 1)}
                                            className="w-8 h-8 border rounded flex items-center justify-center"
                                        >
                                            -
                                        </button>
                                        <input
                                            name="quantity"
                                            value={item.quantity}
                                            onChange={(e) => handleChangeQuantity(item, e.target.value)}
                                            type="number"
                                            min="1"
                                            max="10"
                                            className="border rounded w-12 text-center py-1"
                                        />
                                        <button
                                            onClick={() => handleChangeQuantity(item, item.quantity + 1)}
                                            className="w-8 h-8 border rounded flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-green-600">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <PrimaryButton type="link" href="/">
                            <ArrowLeftIcon className="h-4 w-4 text-white mr-2" />
                            Continue Shopping
                        </PrimaryButton>
                    </div>
                </div>

                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4 h-fit">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="text-sm border-b pb-3 mb-3">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-gray-900 font-medium">Subtotal</span>
                            <span className="font-medium text-green-600">${subtotal}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-green-500 font-medium">Shipping</span>
                            <span className="text-gray-500 font-light italic tracking-wide">Calculated at checkout</span>
                        </div>
                        <div className="ml-4 text-xs">
                            <div className="flex justify-between mb-1 border-l-2 border-green-400 pl-2">
                                <span className="font-light text-gray-700">Inside Dhaka</span>
                                <span className="font-medium text-green-600">৳60</span>
                            </div>
                            <div className="flex justify-between mb-1 border-l-2 border-green-400 pl-2">
                                <span className="font-light text-gray-700">Outside Dhaka</span>
                                <span className="font-medium text-green-600">৳100</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg mb-4">
                        <span>Total</span>
                        <span className="text-green-600">${subtotal}</span>
                    </div>
                    <PrimaryButton type="link" href="/checkout" className="w-full justify-center">
                        Proceed to Checkout
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
};

export default CartList;