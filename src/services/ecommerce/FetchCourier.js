import config from "@/config";

export const fetchCourier = async () => {
    const res = await fetch(`${config.apiBaseUrl}/courier/active`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Courier');
    return await res.json();
};

