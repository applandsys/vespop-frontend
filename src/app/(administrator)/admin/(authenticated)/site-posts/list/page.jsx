"use client";

import React, { useEffect, useState } from "react";
import CommonCard from "@/components/ui/CommonCard";
import TableData from "@/components/ui/TableData";
import { fetchSitePosts } from "@/services/admin/getSitePost";
import Link from "next/link";

const SitePostsList = () => {
    const [sitePosts, setSitePosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchSitePosts();

                // data.post contains the array
                setSitePosts(data.post || []);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        loadPosts();
    }, []);

    const columns = [
        { id: 1, classes: "", value: "ID" },
        { id: 2, classes: "", value: "Title" },
        { id: 4, classes: "", value: "Slug" },
        { id: 5, classes: "", value: "Category" },
        { id: 6, classes: "text-right", value: "Actions" },
    ];

    return (
        <div className="flex-1 p-6">
            <div className="grid grid-cols-1 gap-2 px-2">
                <CommonCard title="Page List">

                    <TableData columns={columns}>
                        {sitePosts.length > 0 ? (
                            sitePosts.map((post, index) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{post.title}</td>
                                    <td className="px-4 py-2">{post.slug}</td>
                                    <td className="px-4 py-2">Default</td>

                                    <td className="px-4 py-2 text-right">
                                        <Link href={`edit-post/${post.id}`} className="mx-1 px-2 py-1 text-xs text-white bg-blue-400 rounded hover:bg-blue-300">
                                            Edit
                                        </Link>

                                        <button className="mx-1 px-2 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-300">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-center" colSpan={5}>
                                    No posts found
                                </td>
                            </tr>
                        )}
                    </TableData>

                </CommonCard>
            </div>
        </div>
    );
};

export default SitePostsList;