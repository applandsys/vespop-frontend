import config from "@/config";

export const getProductDetail = async (productId) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/detail/${productId}`);
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};


