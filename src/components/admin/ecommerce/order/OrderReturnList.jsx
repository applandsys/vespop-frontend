"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import config from "@/config";

export default function OrderReturnList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${config.apiBaseUrl}/order-returns`)
            .then((res) => res.json())
            .then((res) => setData(res.data));
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Returns</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {data.map((ret) => (
                    <div
                        key={ret.id}
                        className="border rounded-lg p-4 space-y-2"
                    >
                        <div className="flex justify-between">
              <span className="font-semibold">
                Return #{ret.id}
              </span>
                            <span className="text-sm text-muted-foreground">
                Order #{ret.orderId}
              </span>
                        </div>

                        <div className="text-sm">
                            Qty: {ret.totalQuantity} | Amount: ৳{ret.totalAmount}
                        </div>

                        <div className="space-y-1">
                            {ret.orderReturnItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="text-xs border rounded p-2"
                                >
                                    <div>Product: {item.product?.name}</div>
                                    <div>Price: ৳{item.price}</div>
                                    <div>Qty: {item.quantity}</div>
                                    {item.variantAttribute && (
                                        <div>
                                            Variant: {item.variantAttribute.attributeValue?.value}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}