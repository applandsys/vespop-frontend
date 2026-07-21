"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import config from "@/config";

export default function OrderReturnForm() {
    const [orderId, setOrderId] = useState("");
    const [orderItemId, setOrderItemId] = useState("");
    const [items, setItems] = useState([
        { productId: "", variantAttributeId: "", price: "", quantity: "" },
    ]);

    const addItem = () => {
        setItems([
            ...items,
            { productId: "", variantAttributeId: "", price: "", quantity: "" },
        ]);
    };

    const handleSubmit = async () => {
        const payload = {
            orderId: Number(orderId),
            orderItemId: orderItemId ? Number(orderItemId) : null,
            items: items.map((i) => ({
                productId: Number(i.productId),
                variantAttributeId: i.variantAttributeId
                    ? Number(i.variantAttributeId)
                    : null,
                price: Number(i.price),
                quantity: Number(i.quantity),
            })),
        };

        await fetch(`${config.apiBaseUrl}/order-returns`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        alert("Order return created");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Order Return</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <Input
                    placeholder="Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />

                <Input
                    placeholder="Order Item ID (optional)"
                    value={orderItemId}
                    onChange={(e) => setOrderItemId(e.target.value)}
                />

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 gap-2 border p-3 rounded-md"
                        >
                            <Input
                                placeholder="Product ID"
                                value={item.productId}
                                onChange={(e) => {
                                    const copy = [...items];
                                    copy[index].productId = e.target.value;
                                    setItems(copy);
                                }}
                            />

                            <Input
                                placeholder="Variant Attribute ID"
                                value={item.variantAttributeId}
                                onChange={(e) => {
                                    const copy = [...items];
                                    copy[index].variantAttributeId = e.target.value;
                                    setItems(copy);
                                }}
                            />

                            <Input
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => {
                                    const copy = [...items];
                                    copy[index].price = e.target.value;
                                    setItems(copy);
                                }}
                            />

                            <Input
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => {
                                    const copy = [...items];
                                    copy[index].quantity = e.target.value;
                                    setItems(copy);
                                }}
                            />
                        </div>
                    ))}
                </div>

                <Button variant="secondary" onClick={addItem}>
                    + Add Item
                </Button>

                <Button className="w-full" onClick={handleSubmit}>
                    Submit Return
                </Button>
            </CardContent>
        </Card>
    );
}