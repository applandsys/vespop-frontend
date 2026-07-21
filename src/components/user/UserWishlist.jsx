"use client";

import React from "react";
import Image from "next/image";
import config from "@/config";
import CartIcon from "@/components/icons/ShoppingCartIcon";
import {addToCart} from "@/redux/store/slices/cartSlice";
import {useDispatch} from "react-redux";
import {useSnackbar} from "@/components/ui/SnackbarProvider";
import {removeWishList} from "@/services/ecommerce/FetchWishList";
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";
import {getImageUrl} from "@/utils/R2Resolver";


export default function UserWishlist({wishlistItems}) {

    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();
    const { token, customer } = GetCustomerData();

    const handleAddToCart = (product) => {
        const productToAdd = {
            id: product.id,
            productId: product.id,
            price: product.sellPrice,
            point: product.point,
            images: product.images,
            quantity: 1,
        };

        dispatch(addToCart(productToAdd));
        showSnackbar(`You added to cart: ${product.name}`);
    };

    const handleRemoveWishlist = (id) => {
        removeWishList(id,token).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err);
        })
    }

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
                            <div className="flex items-center">
                                <Image
                                    width={50}
                                    height={50}
                                    src={`${getImageUrl(item.product.images[0].name)}`}
                                    alt={item.product.images[0].altText} className="w-16 h-16 object-cover rounded-md border" />

                                <div className="ml-4">
                                    <p className="font-medium text-gray-800">{item.product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        ${item.product.sellPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={()=>{handleAddToCart(item)}}
                                    className="flex items-center justify-center bg-green-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-400 flex-1"
                                >
                                    <CartIcon className="w-5 h-5 mr-2" />
                                    Add to cart
                                </button>
                                <button
                                    onClick={()=>{handleRemoveWishlist(item.id)}}
                                    className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200">
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
