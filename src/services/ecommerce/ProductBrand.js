import config from "@/config";

export const fetchAllProductBrand = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/brands`);
    if (!res.ok) throw new Error('Failed to fetch Brand');
    return await res.json();
};


