"use client";

import OrderReturnForm from "@/components/admin/ecommerce/order/OrderReturnForm";
import OrderReturnList from "@/components/admin/ecommerce/order/OrderReturnList";

export default function OrderReturnsPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left Form */}
            <div className="lg:col-span-1">
                <OrderReturnForm />
            </div>

            {/* Right List */}
            <div className="lg:col-span-2">
                <OrderReturnList />
            </div>
        </div>
    );
}