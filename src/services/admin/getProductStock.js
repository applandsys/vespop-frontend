import config from "@/config";

export const getAllProductsStock = async () => {
    const res = await fetch(`${config.apiBaseUrl}/inventory/product-stock`);
    return await res.json();
};

