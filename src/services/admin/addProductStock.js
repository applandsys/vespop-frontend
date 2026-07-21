import config from "@/config";

export const addStock = async ({ productId, productVariantId, quantity }) => {
    try {
        const res = await fetch(`${config.apiBaseUrl}/inventory/product-stock/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
                productVariantId,
                quantity,
            }),
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error adding stock: ${text}`);
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};
