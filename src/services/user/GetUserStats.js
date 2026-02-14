import config from "@/config";

export const getUserStats = async (userId) => {
    const res = await fetch(`${config.apiBaseUrl}/user/stats/order/${userId}`);
  //  if (!res.ok) throw new Error('Failed to fetch Brand');
    return await res.json();
};