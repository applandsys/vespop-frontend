import React from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ecommerce/BreadChrumb";
import { getCategories } from "@/services/ecommerce/getCategories";
import config from "@/config";

export default async function Categories() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Categories", href: null }
    ];

    const categories = await getCategories();

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-4">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="my-6">
                <h3 className="text-xl font-bold mb-6">All Collections</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categories?.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="group"
                        >
                            <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                                {/* Image */}
                                <div className="relative w-full aspect-square bg-gray-100">
                                    <Image
                                        src={`${config.publicPath}/images/categories/${category.image}`}
                                        alt={category.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-3 text-center">
                                    <h4 className="font-semibold text-gray-800 text-sm truncate">
                                        {category.name}
                                    </h4>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {category._count?.products || 0} Products
                                    </p>


                                    <div className="my-4">
                                        <Link
                                            key={category.id}
                                            href={`/category/${category.slug}`}
                                            className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-600 transition-colors font-medium w-full text-sm">
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
