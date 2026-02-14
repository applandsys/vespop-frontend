import React from "react";
import Breadcrumb from "@/components/ecommerce/BreadChrumb";
import CartList from "@/components/ecommerce/CartList";

export default function CartPage() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Cart", href: null }
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-4">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="my-6">
                <CartList />
            </div>
        </div>
    );
}