import config from "@/config";

export const getOrders = async (type=null) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/order/list?type=${type}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
};


