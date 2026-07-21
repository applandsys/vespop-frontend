import config from "@/config";

export const fetchOrder = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/order/list`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Order');
    return await res.json();
};


export const fetchLatestOrder = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/order/latest`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Order');
    return await res.json();
};

// export const fetchOrderById = async (id) => {
//     const res = await fetch(`${config.apiBaseUrl}/customer/orderbyid/${id}`,{
//         cache: 'no-store',
//     });
//     if (!res.ok) throw new Error('Failed to fetch Order');
//     return await res.json();
// };

export const fetchOrderById = async (id,token) => {
    const res = await fetch(`${config.apiBaseUrl}/customer/orderbyid/${id}`, {
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
