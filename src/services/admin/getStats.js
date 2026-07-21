import config from "@/config";

export const getAdminStats = async (productId) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/stats`);
    return await res.json();
};