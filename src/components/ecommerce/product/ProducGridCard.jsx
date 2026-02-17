"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import { addToCart } from "@/redux/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "@/components/ui/SnackbarProvider";
import { HeartIcon, ShoppingCartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const ProductGridCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hoverImageLoaded, setHoverImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

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
        category,
        brand,
        rating,
        labels = [],
        labelColor = "bg-green-500",
    } = product;

    const isHot = labels.some((labelObj) => labelObj.label?.slug === "hot-products");
    const isNew = labels.some((labelObj) => labelObj.label?.slug === "new-arrivals");

    const mainImage = images?.[0];
    const hoverImage = images?.[1] || images?.[0];

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const productToAdd = {
            id: product.id,
            productId: product.id,
            price: discountPrice || sellPrice,
            point: product.point,
            images: product.images,
            quantity: 1,
        };
        dispatch(addToCart(productToAdd));
        showSnackbar(`You added to cart: ${product.name}`);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Add quick view logic here
    };

    return (
        <div
            className="
        group
        mb-2
        w-full
        max-w-[90%]      /* 🔥 card a bit smaller now (was 85%) */
        lg:max-w-[86%]   /* 🔥 even slightly smaller on large screens */
        lg:max-h-[86%]   /* 🔥 even slightly smaller on large screens */
        mx-auto
        px-1            /* less padding (was px-4) */
        py-4
      "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Card */}
            <div className="relative bg-white rounded-md shadow-sm hover:shadow transition-all duration-300 ease-out border border-gray-100 overflow-hidden mb-1">
                {/* Badges */}
                <div className="absolute top-1 left-1 z-10 flex flex-col gap-1">
                    {isHot && (
                        <span className="bg-red-500 text-white px-1 py-0.5 rounded text-sm font-bold uppercase">
              HOT
            </span>
                    )}
                    {isNew && (
                        <span className="bg-blue-500 text-white px-1 py-0.5 rounded text-sm font-bold uppercase">
              NEW
            </span>
                    )}
                    {discount > 0 && (
                        <span className="bg-orange-500 text-white px-1 py-0.5 rounded text-sm font-bold">
              -{discount}%
            </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-1 right-1 z-10 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={handleWishlist}
                        className="bg-white p-0.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        {isWishlisted ? (
                            <HeartSolid className="h-2 w-2 text-red-500" />
                        ) : (
                            <HeartIcon className="h-2 w-2 text-gray-600" />
                        )}
                    </button>
                    <button
                        onClick={handleQuickView}
                        className="bg-white p-0.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <EyeIcon className="h-2 w-2 text-gray-600" />
                    </button>
                </div>

                {/* Product Image Container */}
                <Link href={`/product/detail/${slug}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded">
                        {/* Main Image - Smooth scale on hover */}
                        {mainImage && (
                            <Image
                                src={`${config.publicPath}/images/products/${mainImage.name}`}
                                alt={mainImage.altText || name}
                                fill
                                className={`object-cover transition-all duration-500 ease-out rounded ${
                                    isHovered && hoverImage ? 'opacity-0' : 'opacity-100'
                                } ${imageLoaded ? '' : 'opacity-0'} ${
                                    isHovered ? 'scale-105' : 'scale-100'
                                }`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        )}

                        {/* Hover Image - Smooth fade in with slight scale */}
                        {hoverImage && (
                            <Image
                                src={`${config.publicPath}/images/products/${hoverImage.name}`}
                                alt={`${hoverImage.altText || name} - Alternate view`}
                                fill
                                className={`object-cover transition-all duration-500 ease-out rounded ${
                                    isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                                } ${hoverImageLoaded ? '' : 'opacity-0'}`}
                                onLoad={() => setHoverImageLoaded(true)}
                            />
                        )}

                        {/* Loading Placeholder */}
                        {(!imageLoaded || (isHovered && !hoverImageLoaded)) && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
                        )}

                        {/* ADD TO CART Button */}
                        <div
                            className={`absolute bottom-3 left-0 right-0 transition-all duration-500 transform ${
                                isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                            }`}
                        >
                            <div className="flex justify-center">
                                <button
                                    onClick={handleAddToCart}
                                    onMouseEnter={() => setIsButtonHovered(true)}
                                    onMouseLeave={() => setIsButtonHovered(false)}
                                    className="py-2 px-3 rounded-full font-semibold active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5 shadow transform hover:scale-105 text-[11px] bg-white text-black hover:bg-black hover:text-white"
                                    style={{ width: "75%" }}
                                >
                                    <ShoppingCartIcon className="h-3 w-3" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Product Info */}
            <div className="space-y-0.5 pt-2">
                {/* Product Name */}
                <Link href={`/product/detail/${slug}`}>
                    <h3 className="font-medium text-gray-900 hover:text-red-600 transition-colors line-clamp-2 text-[14px] leading-tight">
                        {name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-1">
          <span className="text-[14px] font-bold text-gray-900">
            {(discountPrice || sellPrice)?.toFixed(2)}
          </span>
                    {discount > 0 && (
                        <span className="text-[14px] text-gray-500 line-through">
              {sellPrice?.toFixed(2)}
            </span>
                    )}
                </div>

                {/* Category */}
                <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-[7px]">{category}</p>
                </div>

                {/* Rating - Made larger */}
                <div className="flex items-center gap-1">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`h-3 w-3 ${
                                    i < Math.floor(rating || 0) ? "text-yellow-400" : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-[14px] text-gray-500">
        ({rating?.toFixed(1) || "0.0"})
                </span>
                </div>
            </div>
        </div>
    );
};

export default ProductGridCard;
