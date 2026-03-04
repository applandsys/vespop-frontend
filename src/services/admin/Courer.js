import config from "@/config";

export const getAllCourier = async () => {
    const res = await fetch(`${config.apiBaseUrl}/courier`);
    return await res.json();
};