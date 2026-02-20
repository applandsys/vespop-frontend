import config from "@/config";

export async function getPost(slug) {
    const res = await fetch(
        `${config.apiBaseUrl}/public/site-post/slug/${slug}`,
        { cache: "no-store" } // always fresh
    );

    if (!res.ok) {
        throw new Error("Failed to fetch post");
    }

    return res.json();
}