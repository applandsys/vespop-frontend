"use client";

import {useEffect, useState} from "react";
import {getAllProducts} from "@/services/admin/getAllProducts";
import Link from "next/link";

const AllProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then(r => setProducts(r)).catch(e => console.error(e));
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <div className="p-2">
            <h2 className="text-xl font-bold">Product List</h2>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead className="bg-gray-100">
                    <th className="border border-gray-300 px-1 py-1 text-left">ID</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Name</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Buy Price</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Sell Price</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Discount</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Point</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Action</th>
                </thead>
                <tbody>
                {products.length > 0 && (
                    products.map((product) => (
                        <tr className="hover:bg-gray-50" key={product.id}>
                             <td className="border border-gray-300 px-1 py-1">{product.id}</td>
                             <td className="border border-gray-300 px-1 py-1">{product.name}</td>
                             <td className="border border-gray-300 px-1 py-1">{product.buyPrice}</td>
                             <td className="border border-gray-300 px-1 py-1">{product.sellPrice}</td>
                             <td className="border border-gray-300 px-1 py-1">{product.discount}</td>
                             <td className="border border-gray-300 px-1 py-1">{product.point} </td>
                             <td>
                                 <Link className="mx-1 px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                                       href={`/admin/product/edit-product/${product.id}`}
                                 >
                                     Edit
                                 </Link>
                             </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AllProducts;