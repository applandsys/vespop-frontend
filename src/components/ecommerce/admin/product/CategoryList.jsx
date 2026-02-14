import React from 'react';
import CommonCard from "@/components/ui/CommonCard";
import Link from "next/link";

const CategoryList = ({categoryList}) => {
    return (
        <CommonCard title="Categories">
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-2 border-b">ID</th>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Parent</th>
                        <th className="px-4 py-2 border-b text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {categoryList.length && categoryList.map((category,index) => (
                            <>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{index+1}</td>
                                    <td className="px-4 py-2">{category.name}</td>
                                    <td className="px-4 py-2">{category.parent?.name ?? 'Primary'}</td>
                                    <td className="px-4 py-2 text-right ">
                                        <Link href={`product-category/edit/${category.slug}`}
                                            className="mx-1 px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">Edit
                                        </Link>
                                        <button
                                            className="mx-1 px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600">Delete
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

export default CategoryList;