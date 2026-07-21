import config from "@/config";

export const fetchSitePostBySlug = async (slug) => {
    const res = await fetch(`${config.apiBaseUrl}/site-post/post/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch Post');
    const {data} = await res.json();
    return data;
};

export const fetchSitePostById = async (postId) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/site-post/single/${postId}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch");

    return res.json();

};

export const fetchSitePosts = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/site-post`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch");

    return res.json();
};

