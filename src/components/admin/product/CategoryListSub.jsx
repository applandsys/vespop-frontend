import React from "react";
import CommonCard from "@/components/ui/CommonCard";
import Link from "next/link";

const CategoryListSub = ({ categoryList }) => {
    return (
        <CommonCard title="Sub Categories">
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
                    {categoryList.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                No sub categories found
                            </td>
                        </tr>
                    ) : (
                        categoryList.map((category, index) => (
                            <tr key={category.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{category.name}</td>

                                <td className="px-4 py-2">
                                    {category.parent ? (
                                        <span className="text-gray-700 font-medium">
                                                {category.parent.name}
                                            </span>
                                    ) : (
                                        <span className="text-gray-400 text-xs">
                                                No parent
                                            </span>
                                    )}
                                </td>

                                <td className="px-4 py-2 text-right">
                                    <Link
                                        href={`/admin/product-category/edit/${category.slug}`}
                                        className="mx-1 px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </Link>
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </CommonCard>
    );
};

export default CategoryListSub;