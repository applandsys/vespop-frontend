import config from "@/config";

export const fetchProductCategory = async (slug,searchString,maxprice) => {
    const res = await fetch(`${config.apiBaseUrl}/category/products/${slug}?search=${searchString}&maxprice=${maxprice}`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};

export const fetchAllCategories = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/categories`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};

export const fetchAllCategoriesZeroCount = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/categories`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};


export const fetchCategoryDetail = async (catSlug) => {
    const res = await fetch(`${config.apiBaseUrl}/category/detail/${catSlug}`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};



