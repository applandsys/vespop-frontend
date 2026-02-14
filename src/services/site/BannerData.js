import config from "@/config";

export const fetchBannerBySlug = async (slug) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/setting/banner/${slug}`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};

