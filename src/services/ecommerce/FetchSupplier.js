import config from "@/config";

export const allSupplier = async () => {
    const res = await fetch(`${config.apiBaseUrl}/supplier`);
    if (!res.ok) throw new Error('Failed to fetch Supplier');
    return await res.json();
};