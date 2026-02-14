import React from 'react';
import CommonCard from "@/components/ui/CommonCard";
import config from "@/config";
import Image from "next/image";

const ProductBrandList = ({brandList}) => {
    return (
        <CommonCard title="Product Brands">
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-2 border-b">ID</th>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Logo</th>
                        <th className="px-4 py-2 border-b text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {brandList.length && brandList.map((brand,index) => (
                            <>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{index+1}</td>
                                    <td className="px-4 py-2">{brand.name}</td>
                                    <td className="px-4 py-2">
                                        <Image className="h-6 w-6" src={`${config.publicPath}/images/brand/${brand.logo}`} alt="..." width={32} height={32} />
                                    </td>
                                    <td className="px-4 py-2 text-right ">
                                        <button
                                            className="mx-1 px-2 py-1 text-xs text-white bg-blue-400 rounded hover:bg-blue-300">Edit
                                        </button>
                                        <button
                                            className="mx-1 px-2 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-300">Delete
                                        </button>
                                    </td>
                                </tr>
                            </>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </CommonCard>
    );
};

export default ProductBrandList;