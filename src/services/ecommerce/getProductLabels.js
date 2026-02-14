
import config from "@/config";

export const getProductLabels = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/product-labels`);
    if (!res.ok) throw new Error('Failed to fetch Attributes');
    const data = await res.json();
    return data.data;
};


