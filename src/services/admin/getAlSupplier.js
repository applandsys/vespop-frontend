import config from "@/config";

export const getAlSupplier = async (productId) => {
    const res = await fetch(`${config.apiBaseUrl}/supplier`);
    return await res.json();
};