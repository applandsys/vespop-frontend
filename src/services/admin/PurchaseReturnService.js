import config from "@/config";

export const fetchPurchaseReturns = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(`${config.apiBaseUrl}/admin/purchase/return-history?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result.returns;
    } catch (error) {
        console.error("Error fetching purchase returns:", error);
        return null;
    }
};
