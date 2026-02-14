import ProductAddEditForm from "@/components/admin/ecommerce/ProductAddEditForm";

const EditProduct = ({ params }) => {
    const { productId } = params;

    return (
        <div>
            <div className="flex-1 p-2">
                <div className="gap-1">
                    <h1 className="text-2xl font-semibold my-2"> Edit Product {productId} </h1>
                    <ProductAddEditForm productId={productId}/>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;