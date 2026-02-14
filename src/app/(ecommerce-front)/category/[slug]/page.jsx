// app/(ecommerce)/category/[slug]/page.jsx
import BreadCrumb from "@/components/ecommerce/BreadChrumb";
import { fetchAllCategories, fetchProductCategory } from "@/services/ecommerce/GetCategory";
import ProductGridCard from "@/components/ecommerce/product/ProducGridCard";
import { SidebarCategory } from "@/components/ecommerce/product/SidebarCategory";
import FilterSearch from "@/components/ecommerce/widgets/FilterSearch";
import ClientLogger from "@/components/logger";

// --- helpers (keep in this file or extract to a utils file) ---
const numOrInfinity = (v, fallback) =>
    typeof v === "number" && !Number.isNaN(v) ? v : fallback;

const getAllVariantAttrValueIds = (product) =>
    (product.productVariants ?? [])
        .flatMap((pv) => pv.variantAttributes ?? [])
        .map((va) => va.attributeValueId)
        .filter((id) => typeof id === "number");

// Effective price = product.sellPrice if no variants,
// otherwise min sellPrice among variants (typical catalog convention)
const getEffectivePrice = (product) => {
    const variants = product.productVariants ?? [];
    if (!variants.length) return numOrInfinity(product.sellPrice, Infinity);
    const prices = variants
        .map((v) => numOrInfinity(v.sellPrice, Infinity))
        .filter((p) => Number.isFinite(p));
    return prices.length ? Math.min(...prices) : numOrInfinity(product.sellPrice, Infinity);
};

export default async function CategoryPage({ params, searchParams }) {
    // --- read filters from URL ---
    const locationId = searchParams?.locationId ? Number(searchParams.locationId) : null;

    // --- read filters from URL ---
    const filterOptions = {
        locationId: searchParams?.locationId ? Number(searchParams.locationId) : null,
        selectedBrands: searchParams?.selectedBrands ? JSON.parse(searchParams.selectedBrands) : [],
        minPrice: 0,
        maxPrice: searchParams?.maxPrice ? Number(searchParams.maxPrice) : 0, // keep 0 if passed
        selectedColors: searchParams?.selectedColors ? JSON.parse(searchParams.selectedColors) : [],
        selectedSizes: searchParams?.selectedSizes ? JSON.parse(searchParams.selectedSizes) : [],
        selectedWeight: searchParams?.selectedWeight ? JSON.parse(searchParams.selectedWeight) : [],
        search:
            searchParams?.search && searchParams.search.toLowerCase() !== "null"
                ? searchParams.search
                : null,
    };

// --- compute bounds ---
    const minPrice = numOrInfinity(filterOptions.minPrice, 0);
    const maxPrice =
        filterOptions.maxPrice && filterOptions.maxPrice > 0
            ? numOrInfinity(filterOptions.maxPrice, Infinity)
            : Infinity; // ✅ disable filter if 0


    // --- fetch data ---
    const productData = await fetchProductCategory(params.slug,filterOptions.search,filterOptions.maxPrice);
    const { category } = productData;
    const categories = await fetchAllCategories();
    const products = category?.products ?? [];

// --- compute numeric price bounds ---
    const priceValues = products.map(getEffectivePrice).filter(Number.isFinite);
    const lowestPrice = priceValues.length ? Math.min(...priceValues) : 0;
    const highestPrice = priceValues.length ? Math.max(...priceValues) : 0;


// --- build fast lookup sets ---
    const brandSet = new Set(filterOptions.selectedBrands ?? []);
    const colorSet = new Set(filterOptions.selectedColors ?? []);
    const sizeSet = new Set(filterOptions.selectedSizes ?? []);
    const weightSet = new Set(filterOptions.selectedWeight ?? []);

    const hasBrandFilter = brandSet.size > 0;
    const hasColorFilter = colorSet.size > 0;
    const hasSizeFilter = sizeSet.size > 0;
    const hasWeightFilter = weightSet.size > 0;

    // --- corrected product filtering ---
    const filteredProducts = products.filter((product) => {
        // Brand filter (ensure product brandId is within selectedBrands)
        const isBrandValid = hasBrandFilter
            ? filterOptions.selectedBrands.includes(product.brandId) // Check if product brandId is in selectedBrands
            : true;

        // Price filter (use effective price that considers variants)
        const price = getEffectivePrice(product);

        // Price filter (skip maxPrice if disabled)
        const isPriceValid =
            (Number.isFinite(minPrice) ? price >= minPrice : true) &&
            (Number.isFinite(maxPrice) ? price <= maxPrice : true);


        // Attribute filters via variant attributeValueIds
        const attrIds = getAllVariantAttrValueIds(product);
        const matchesAny = (set) => attrIds.some((id) => set.has(id));

        const isColorValid = hasColorFilter ? matchesAny(colorSet) : true;
        const isSizeValid = hasSizeFilter ? matchesAny(sizeSet) : true;
        const isWeightValid = hasWeightFilter ? matchesAny(weightSet) : true;

        // location (safe on empty/missing arrays)
        const locId = filterOptions.locationId;
        const locations = product.productLocations ?? [];
        const isLocationValid = !locId || locations.some((l) => l.locationId === locId);

        // Only apply the searchQuery filter if it's not null or undefined
        const searchQuery = filterOptions.search != null && product?.name?.toLowerCase().includes(filterOptions.search.toLowerCase());

        // Return true only if all filters are satisfied
        return (
            isBrandValid &&
            isPriceValid &&
            isColorValid &&
            isSizeValid &&
            isWeightValid &&
             (!filterOptions.search || searchQuery) &&  // Only check searchQuery if it's provided
            isLocationValid
        );
    });

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: category?.name ?? "Category", href: null },
    ];

    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            <ClientLogger data={productData} />
            <div className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
                    {/* Products */}
                    <div className="col-span-1 lg:col-span-4">
                        {filteredProducts.length ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {filteredProducts.map((product) => (
                                    <ProductGridCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div>No Products found</div>
                        )}
                    </div>
                    {/* Sidebar */}
                    <div className="col-span-1 flex flex-col justify-start lg:justify-between h-full">
                        <div className="p-1 gap-2">
                            <SidebarCategory categories={categories} />
                            <FilterSearch
                                highestPriceProduct={productData.category.maximumPrice}
                                lowestPriceProduct={productData.category.minimumPrice}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
