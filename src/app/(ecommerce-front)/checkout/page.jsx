import React from "react";
import Breadcrumb from "@/components/ecommerce/BreadChrumb";
import Checkout from "@/components/ecommerce/Checkout";

export default function CheckOutPage() {

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Cart", href: "/cart" },
        { label: "Checkout", href: null }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="my-4">
                <h1 className="text-3xl font-bold">Checkout</h1>
                <div className=" mt-4">
                    <Checkout/>
                </div>
            </div>
        </>
    );
}