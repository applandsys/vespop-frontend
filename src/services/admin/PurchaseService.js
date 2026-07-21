import config from "@/config";

export const fetchPurchase = async (page = 1, limit = 10) => {
    const res = await fetch(
        `${config.apiBaseUrl}/admin/purchase?page=${page}&limit=${limit}`,{
            cache: "no-store",
        }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
};


export const createPurchase = async (data) => {
    try {
        const res = await fetch(`${config.apiBaseUrl}/admin/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Error fetch data`);
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};
