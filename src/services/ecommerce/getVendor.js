import config from "@/config";

export const getVendorList = async () => {
    const res = await fetch(`${config.apiBaseUrl}/vendor/vendor-list`);
    return await res.json();
};