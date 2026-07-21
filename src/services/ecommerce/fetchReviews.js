import config from "@/config";

export const fetchProductReviews = async (productId) => {
    const res = await fetch(`${config.apiBaseUrl}/product/reviews/${productId}`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Reviees');
    return await res.json();
};


