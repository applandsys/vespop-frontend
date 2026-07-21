
import config from "@/config";

export const getCategories = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/categories`);
    if (!res.ok) throw new Error('Failed to fetch Categories');
    const data = await res.json();
    return data;
};


export const getAllCategories = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/categories`);
    if (!res.ok) throw new Error('Failed to fetch Categories');
    const data = await res.json();
    return data;
};



