import config from "@/config";

export const fetchSitePostBySlug = async (slug) => {
    const res = await fetch(`${config.apiBaseUrl}/site-post/post/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch Post');
    const {data} = await res.json();
    return data;
};

export const fetchSitePostById = async (postId) => {
    const res = await fetch(`${config.apiBaseUrl}/site-post/post/${postId}`);
    if (!res.ok) throw new Error('Failed to fetch Post');
    const {data} = await res.json();
    return data;
};

