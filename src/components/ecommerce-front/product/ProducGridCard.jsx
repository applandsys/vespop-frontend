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

    /* ================= SIZE CODES ================= */
    const sizes =
        product.productVariants
            ?.flatMap((variant) =>
                variant.variantAttributes
                    ?.filter((attr) => attr.attribute?.name?.toLowerCase() === "size")
                    ?.map((attr) => attr.attributeValue?.codeNumber)
            )
            ?.filter(Boolean) || [];

    const uniqueSizes = [...new Set(sizes)];
    /* ============================================= */

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
            <div className="relative bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
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
                <div className="absolute top-2 right-1 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleWishlist}
                        className="bg-white p-1 rounded-full shadow-sm"
                    >
                        {isWishlisted ? (
                            <HeartSolid className="h-6 w-6 text-red-500" />
                        ) : (
                            <HeartIcon className="h-6 w-6 text-gray-600" />
                        )}
                    </button>

                    <button className="bg-white p-1 rounded-full shadow-sm">
                        <EyeIcon className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                {/* ================= IMAGE ================= */}
                <Link href={`/product/detail/${slug}`}>
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
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

                        {/* ================= SIZE CODES ================= */}
                        {uniqueSizes.length > 0 && (
                            <div
                                className={`absolute bottom-[60px] left-0 right-0 flex justify-center gap-2 transition-all duration-300 ${
                                    isHovered
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-2"
                                }`}
                            >
                                {uniqueSizes.map((size) => (
                                    <div
                                        key={size}
                                        title={
                                            size === "S"
                                                ? "Small"
                                                : size === "M"
                                                    ? "Medium"
                                                    : size === "L"
                                                        ? "Large"
                                                        : size
                                        }
                                        className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-[11px] font-bold text-gray-700 shadow-sm"
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ================= QUICK ADD ================= */}
                        <div
                            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
                                isHovered
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-2 opacity-0"
                            }`}
                        >
                            <button
                                onClick={handleAddToCart}
                                className="w-full h-10 border-t border-black flex items-center justify-center gap-2 bg-white text-black hover:bg-black hover:text-white transition-all"
                            >
                                <ShoppingCartIcon className="h-6 w-6" />
                                <span className="text-lg font-bold">QUICK ADD</span>
                            </button>
                        </div>
                    </div>
                </Link>
            </div>

            {/* ================= INFO ================= */}
            {/* Changed "text-center" to "text-left px-1" to cleanly align text metadata */}
            <div className="pt-2 text-left px-1">
                <Link href={`/product/detail/${slug}`}>
                    <h3 className="text-[14px] font-thin line-clamp-2">{name}</h3>
                </Link>

                <div className="font-bold text-[14px] mt-0.5">
                    Tk. {(discountPrice || sellPrice)?.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default ProductGridCard;