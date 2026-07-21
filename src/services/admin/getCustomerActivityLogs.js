export const getCustomerActivityLogs = async ({ page = 1, limit = 10, search = '' }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/activity/customer?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching customer activity logs:", error);
        return { success: false, data: { logs: [], total: 0, page, limit } };
    }
};
