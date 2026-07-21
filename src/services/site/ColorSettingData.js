import config from "@/config";

export const fetchColorSettingData = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/setting/color-setting`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Color Settings');
    return await res.json();
};
