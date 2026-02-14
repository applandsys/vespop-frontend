"use client";

import React, {useEffect, useState} from "react";
import {fetchNewProduct} from "@/services/ecommerce/GetProducts";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";

export default function NewProducts() {

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState();
    const [error,setError] = useState();

    useEffect(() => {
        fetchNewProduct().then((res) => {setProducts(res)}).catch(error => setError(error)).finally(setLoading(false));
    }, []);


    return (
        <div className="w-72 bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">New products</h2>
            <div className="mt-1 mb-3 h-0.5 w-20 bg-green-400 rounded-full"></div>
            { products.length > 0 && products.map((product, idx) => (
                <div key={idx} className="flex items-center py-3 border-t first:border-none">
                     <Link href={`/product/detail/${product.slug}`}>
                        <Image
                            width={50}
                            height={50}
                            src={`${config.publicPath}/images/products/${product.images[0].name}`}
                            alt={product.images[0].altText} className="w-12 h-12 object-cover rounded-md"
                        />
                     </Link>
                        <div className="flex justify-between"><div className={`mx-2 font-semibold capitalize ${product.rating >= 4 ? 'text-gray-800' : 'text-green-900'}`}>
                            {product.name}
                        </div>
                        <div className="font-semibold text-gray-600 text-right mx-4">
                            ৳ {
                            product.sellPrice
                              }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
