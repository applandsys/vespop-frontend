import config from "@/config";

export const getUserOrders = async (token) => {
    const res = await fetch(`${config.apiBaseUrl}/user/data/orders`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // attach token here
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch orders");
    }

    return await res.json();
};
