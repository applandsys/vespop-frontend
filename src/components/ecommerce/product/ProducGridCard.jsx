"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import {addToCart} from "@/redux/store/slices/cartSlice";
import {useDispatch} from "react-redux";
import {useSnackbar} from "@/components/ui/SnackbarProvider";

const ProductGridCard = ({product}) => {

    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();

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

    return (
        <>
            <div
                className="bg-white rounded-xl shadow p-4 relative hover:shadow-lg border border-gray-100 hover:border-green-300 transition"
            >
                    <span className={`absolute top-0 left-0 px-3 py-1 text-white text-sm rounded-tl-xl rounded-br-xl ${product.labelColor}`}>
                        {product.label}
                    </span>
                        {product.images?.length > 0 && (
                            <div className="">
                                <Link href={`/product/detail/${product.slug}`}>
                                    <Image
                                        width={500}
                                        height={500}
                                        src={`${config.publicPath}/images/products/${product.images[0].name}`}
                                        alt={product.images[0].altText} className="mx-auto w-full object-contain p-4" />
                                </Link>
                            </div>
                        )}
                <div className="mt-4">
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <Link href={`/product/detail/${product.slug}`}><h3 className="font-semibold text-base mt-1">{product.name}</h3></Link>
                    <p className="text-sm text-gray-500 mt-1">By <span className="text-green-500">{product.brand}</span></p>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-gray-600 text-sm">{product.rating?.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div>
                            {
                                product.discount > 0 ? (
                                        <div>
                                            <span className="text-green-600 font-bold">${product.discountPrice?.toFixed(2)}</span>
                                            <span className="text-gray-400 line-through text-sm ml-2">${product.sellPrice?.toFixed(2)}</span>
                                        </div>
                                    ):
                                    (
                                        <div>
                                            <span className="text-green-600 font-bold">${product.sellPrice?.toFixed(2)}</span>
                                        </div>
                                    )
                            }
                        </div>
                        <button
                            className="bg-green-100 text-green-600 px-3 py-1 rounded hover:bg-green-200 flex items-center gap-1 text-sm"
                            onClick={() => handleAddToCart(product)}
                        >
                            🛒 Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductGridCard;