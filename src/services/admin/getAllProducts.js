import config from "@/config";

export const getAllProducts = async (productId) => {
    const res = await fetch(`${config.apiBaseUrl}/product/all`);
    return await res.json();
};