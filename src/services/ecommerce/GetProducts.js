import config from "@/config";

export const fetchFeaturedProducts = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/featured`);
    if (!res.ok) throw new Error('Failed to fetch Product');
    const {data} = await res.json();
    return data;
};

export const fetchProductsBySlug = async (slug) => {
    const res = await fetch(`${config.apiBaseUrl}/product/label/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch Product');
    const {data} = await res.json();
    return data;
};


export const fetchProductByCatId= async (canId) => {
    const res = await fetch(`${config.apiBaseUrl}/product/list/${canId}`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
};


// export const fetchProductDetail = async ([bannerId]) => {
//     const res = await fetch(`${config.apiBaseUrl}/product/detail/${[bannerId]}`, {
//         cache: "no-store",
//     });
//     const { data } = await res.json();
//     return data;
// };

export async function fetchProductDetail(slug) {
    const url = `${config.apiBaseUrl}/product/detail/${id}`;

    const res = await fetch(url, {
        cache: "no-store", // or next: { revalidate: 60 }
        headers: { Accept: "application/json" },
    });

    const contentType = res.headers.get("content-type") || "";

    // If backend sent HTML (error page/redirect), don't try to parse JSON
    if (!res.ok) {
        const body = await res.text();
        throw new Error(
            `fetchProductDetail failed: ${res.status} ${res.statusText}\n` +
            `content-type: ${contentType}\n` +
            `body (first 200 chars): ${body.slice(0, 200)}`
        );
    }

    if (!contentType.includes("application/json")) {
        const body = await res.text();
        throw new Error(
            `Expected JSON but got ${contentType}\n` +
            `body (first 200 chars): ${body.slice(0, 200)}`
        );
    }

    return res.json();
}


export const fetchProductBySlug= async (slug) => {
    const res = await fetch(`${config.apiBaseUrl}/product/list/${slug}`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
};

export const fetchProductDetailBySlug= async (slug) => {
    const res = await fetch(`${config.apiBaseUrl}/product/detail/${slug}`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
};

export const fetchNewProduct = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/new`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
}

export const fetchProductAttributes = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/attribute/all`, {
        cache: "no-store",
    });
    const { data } = await res.json();
    return data;
}
