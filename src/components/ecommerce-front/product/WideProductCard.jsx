"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSnackbar } from "@/components/ui/SnackbarProvider";
import { addToCart } from "@/redux/store/slices/cartSlice";
import { fbEvent } from "@/lib/facebookPixel";
import { getImageUrl } from "@/utils/R2Resolver";
import { useRouter } from "next/navigation";

export default function WideProductCard({ product }) {
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();
    const [imgError, setImgError] = useState(false);
    const router = useRouter();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const productToAdd = {
            id: product.id,
            productId: product.id,
            price: product.sellPrice || product.price,
            point: product.point,
            images: product.images,
            quantity: 1,
        };

        dispatch(addToCart(productToAdd));
        fbEvent("AddToCart", {
            content_ids: [product.id],
            content_name: product.name,
            value: product.sellPrice || product.price,
            currency: "BDT",
        });
        showSnackbar(`✅ Added to cart: ${product.name}`);
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/checkout?product=${product.id}`);
    };

    const handleCardClick = () => {
        router.push(`/product/detail/${product.slug}`);
    };

    // Get prices
    const currentPrice = product.discountPrice || product.sellPrice || product.price;
    const originalPrice = product.sellPrice || product.price;
    const discount = product.discount ||
        (originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0);
    const saveAmount = originalPrice - currentPrice;

    // Get image URL
    let imageUrl = '';
    if (!imgError) {
        if (product?.images?.[0]?.name) {
            imageUrl = getImageUrl(product.images[0].name);
        } else if (product?.thumbnail) {
            imageUrl = getImageUrl(product.thumbnail);
        }
    }

    const categoryName = product?.categories?.[0]?.name || "Best Selling";

    return (
        <div
            className="w-full bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Responsive: Column on mobile, Row on desktop */}
            <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-4 sm:gap-6 w-full">

                {/* Image Section - Responsive size */}
                <div className="relative w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[200px] sm:h-[200px] md:h-[240px] lg:h-[280px] bg-gray-100 rounded-md overflow-hidden flex-shrink-0 group mx-auto sm:mx-0">
                    {imageUrl && !imgError ? (
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            No Image
                        </div>
                    )}
                </div>

                {/* Content Section - Takes full width on mobile */}
                <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                    <div>
                        <span className="text-xs sm:text-sm text-gray-500 font-medium block">
                            {categoryName}
                        </span>

                        <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-800 mt-1 sm:mt-2 line-clamp-2">
                            {product.name}
                        </h3>

                        {/* Price Section */}
                        <div className="mt-2 sm:mt-3">
                            {discount > 0 ? (
                                <>
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <span className="text-xl sm:text-2xl font-bold text-orange-600">
                                            ₹{currentPrice?.toFixed(2)}
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                                            ₹{originalPrice?.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* SAVE BUTTON - Responsive */}
                                    <button
                                        className="mt-2 bg-[#BFDB38] hover:bg-white text-[#222831] hover:text-[#BFDB38] px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-[#BFDB38] hover:border-[#F48721]"
                                        onClick={handleAddToCart}
                                    >
                                        Save ₹{saveAmount?.toFixed(2)}
                                    </button>
                                </>
                            ) : (
                                <span className="text-xl sm:text-2xl font-bold text-orange-600 block">
                                    ₹{currentPrice?.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Add To Cart and Buy Now Buttons - Responsive */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-5">
                        {/* Add To Cart Button */}
                        <button
                            className="flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F48721] text-[#F48721] hover:text-[#FFFFFF] px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300 border border-[#F48721] hover:border-[#F48721] w-full sm:w-auto"
                            onClick={handleAddToCart}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
                            </svg>
                            Add To Cart
                        </button>

                        {/* Buy Now Button */}
                        <button
                            className="flex items-center justify-center gap-2 bg-[#F48721] hover:bg-[#041F1E] text-white hover:text-white px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300 border border-[#F48721] hover:border-[#041F1E] w-full sm:w-auto"
                            onClick={handleBuyNow}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Buy Now
                        </button>
                    </div>

                    {/* Bottom tag */}
                    <div className="mt-3">
                        <span className="text-xs text-gray-400">Best Quality</span>
                    </div>
                </div>
            </div>
        </div>
    );
}