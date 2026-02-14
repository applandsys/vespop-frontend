import config from "@/config";

export const getUserSupportTickets = async (token) => {
    const res = await fetch(`${config.apiBaseUrl}/customer/support`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // attach token here
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch Tickets");
    }

    return await res.json();
};
