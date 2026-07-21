import ProductAddEditForm from "@/components/admin/ecommerce/ProductAddEditForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Package } from "lucide-react";

const EditProduct = ({ params }) => {
    const { productId } = params;

    return (
        <div className="space-y-2 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <Package className="w-8 h-8 text-indigo-500" />
                    Edit Product #{productId}
                </h1>
                <p className="text-sm text-gray-500 mt-1">Update product details, pricing, stock, and variations.</p>
            </div>
            <ProductAddEditForm productId={productId} />
        </div>
    );
};

export default EditProduct;