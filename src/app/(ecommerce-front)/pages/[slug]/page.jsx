import React from "react";
import Breadcrumb from "@/components/ecommerce/BreadChrumb";
import {getPost} from "@/services/site/SitePost";

export default async function SitePost({ params }) {
    const { slug } = params;

    const data = await getPost(slug);
    const post = data.post;

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Page", href: "/pages" },
        { label: post.title }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />

            <div className="my-4">
                <div className="mt-4 mx-8 xs:mx-2">
                    <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

                    {/*{post.featuredImage && (*/}
                    {/*    <img*/}
                    {/*        src={`http://localhost:4000/uploads/${post.featuredImage}`}*/}
                    {/*        alt={post.title}*/}
                    {/*        className="mb-4 rounded"*/}
                    {/*    />*/}
                    {/*)}*/}

                    <p className="text-gray-600 mb-4">{post.excerpt}</p>

                    <div
                        className="prose font-thin"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </div>
        </>
    );
}