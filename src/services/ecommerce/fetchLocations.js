import config from "@/config";

export const fetchPrimaryLocations = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/setting/location/all-primary`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};

export const fetchAllocations = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/setting/location/all`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};

export const fetchAllocationsByParentId = async (parentId) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/setting/location/parents/${parentId}`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};


