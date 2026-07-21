import config from "@/config";

export const fetchVisitorLogs = async (page = 1, limit = 10, search = '') => {
    const res = await fetch(`${config.apiBaseUrl}/admin/log/visitor?page=${page}&limit=${limit}&search=${search}`, {
        cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch visitor logs");
    return await res.json();
};
