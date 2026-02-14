import config from "@/config";

export const fetchBanner = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/setting/banner`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Banner');
    return await res.json();
};

export const fetchBannerById = async (id) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/setting/banner/${id}`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Banner');
    return await res.json();
};