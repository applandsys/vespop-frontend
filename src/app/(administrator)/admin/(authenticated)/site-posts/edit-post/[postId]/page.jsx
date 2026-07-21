"use client";

import React from 'react';
import SitePostForm from "@/components/admin/ecommerce/SitePostForm";

const EditSitePosts = ({params}) => {
    const {postId} = params;
    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <SitePostForm postId={postId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSitePosts;
