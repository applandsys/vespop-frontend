
import config from "@/config";

export const getAttributes = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/attribute-values`);
    if (!res.ok) throw new Error('Failed to fetch Attributes');
    const data = await res.json();
    return data.data;
};


