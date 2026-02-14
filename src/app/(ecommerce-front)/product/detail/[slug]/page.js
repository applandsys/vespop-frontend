import BreadCrumb from "@/components/ecommerce/BreadChrumb";
import { fetchProductDetailBySlug} from "@/services/ecommerce/GetProducts";
import ProductDetailCard from "@/components/ecommerce/product/ProductDetailCard";
import SidebarCategory from "@/components/ecommerce/product/SidebarCategory";
import MoreDetail from "@/components/ecommerce/product/MoreDetail";
import NewProducts from "@/components/ecommerce/widgets/NewProduct";
import {getCategories} from "@/services/ecommerce/getCategories";

export default async function ProductDetail({ params }) {

    const product = await fetchProductDetailBySlug(params.slug);
    const categories = await getCategories();
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: categories[0]?.name || "Unknown", href: "/category-slug" },
        { label: categories[0]?.name , href: null }
    ];

    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto py-4 px-1">
                    {/* Mobile Layout - Stacked */}
                    <div className="block lg:hidden">
                        <div className="space-y-4">
                            <ProductDetailCard product={product} {...params} />
                            <MoreDetail product={product} {...params} />
                        </div>
                    </div>

                    {/* Desktop Layout - With Sidebar */}
                    <div className="hidden lg:block">
                        <div className="grid grid-cols-4 gap-6">
                            <div className="col-span-3">
                                <ProductDetailCard product={product} {...params} />
                                <MoreDetail product={product} {...params} />
                            </div>
                            <div className="col-span-1">
                                <div className="sticky top-4 space-y-6">
                                    <SidebarCategory categories={categories} />
                                    <NewProducts />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}