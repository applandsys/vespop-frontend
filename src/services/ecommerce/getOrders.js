
import config from "@/config";

export const getOrders = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/order/list`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data = await res.json();
    return data;
};


