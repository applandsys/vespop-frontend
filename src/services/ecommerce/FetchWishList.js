import config from "@/config";

export const fetchWishList = async (token) => {
    const res = await fetch(`${config.apiBaseUrl}/customer/get-wishlist`, {
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
