"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { addToCart } from "@/redux/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "@/components/ui/SnackbarProvider";
import {
    HeartIcon,
    ShoppingCartIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import {getImageUrl} from "@/utils/R2Resolver";

const ProductGridCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hoverImageLoaded, setHoverImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();

    const {
        id,
        name,
        sellPrice,
        discountPrice,
        discount,
        images,
        slug,
        labels = [],
    } = product;


    const isHot = labels.some((l) => l.label?.slug === "hot-products");
    const isNew = labels.some((l) => l.label?.slug === "new-arrivals");

    const mainImage = images?.[0];
    const hoverImage = images?.[1] || images?.[0];

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(
            addToCart({
                id: product.id,
                productId: product.id,
                price: discountPrice || sellPrice,
                point: product.point,
                images: product.images,
                quantity: 1,
            })
        );

        showSnackbar(`You added to cart: ${product.name}`);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    return (
        // Added the "group" class here so that Tailwind utility modifiers like "group-hover" function properly
        <div
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative bg-white overflow-hidden">
                {/* ================= BADGES ================= */}
                <div className="absolute top-1 left-1 z-10 flex flex-col gap-1">
                    {isHot && (
                        <span className="bg-red-500 text-white px-1 py-0.5 rounded text-sm font-bold">
              HOT
            </span>
                    )}
                    {isNew && (
                        <span className="bg-blue-500 text-white px-1 py-0.5 rounded text-sm font-bold">
              NEW
            </span>
                    )}
                    {discount > 0 && (
                        <span className="bg-orange-500 text-white px-1 py-0.5 rounded text-sm font-bold">
              -{discount}%
            </span>
                    )}
                </div>

                {/* ================= ACTION ICONS ================= */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    <button
                        onClick={handleWishlist}
                        className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm"
                    >
                        {isWishlisted ? (
                            <HeartSolid className="h-5 w-5 text-red-500" />
                        ) : (
                            <HeartIcon className="h-5 w-5" />
                        )}
                    </button>

                    <button className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm">
                        <EyeIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* ================= IMAGE ================= */}
                <Link href={`/product/detail/${slug}`}>
                    <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden">
                        {mainImage && (
                            <Image
                                src={`${getImageUrl(mainImage.name)}`}
                                alt={mainImage.altText || name}
                                fill
                                className={`object-cover transition-all duration-500 ${
                                    isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
                                }`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        )}

                        {hoverImage && (
                            <Image
                                src={`${getImageUrl(hoverImage.name)}`}
                                alt={name}
                                fill
                                className={`object-cover transition-all duration-500 ${
                                    isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                }`}
                                onLoad={() => setHoverImageLoaded(true)}
                            />
                        )}
                    </div>
                </Link>
            </div>

            {/* ================= QUICK ADD ================= */}
            <div className="mt-3 px-1">
                <button
                    onClick={handleAddToCart}
                    className="w-full py-2 border border-black flex items-center justify-center gap-2 bg-white text-black hover:bg-black hover:text-white transition-all uppercase text-[12px] font-bold tracking-wider"
                >
                    QUICK ADD
                </button>
            </div>

            {/* ================= INFO ================= */}
            <div className="pt-3 text-center px-2 pb-2">
                <Link href={`/product/detail/${slug}`}>
                    <h3 className="text-[13px] font-medium text-gray-800 group-hover:underline line-clamp-2 uppercase tracking-wide">
                        {name}
                    </h3>
                </Link>

                <div className="font-bold text-[15px] text-black mt-2">
                    Tk {(discountPrice || sellPrice)?.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default ProductGridCard;