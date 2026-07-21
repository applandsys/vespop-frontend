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

export const getFeaturedCategories = async () => {
    const res = await fetch(
        `${config.apiBaseUrl}/category/featured`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error('Failed to fetch Categories');
    const data = await res.json();
    return data;
};

export const fetchAllCategoriesZeroCount = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/categories`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};


export const fetchCategoriesByType = async (type) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/categories/${type}`,{
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



