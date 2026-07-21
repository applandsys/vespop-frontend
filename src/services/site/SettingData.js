import config from "@/config";

export const fetchSettingData = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/setting/site-setting`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};


