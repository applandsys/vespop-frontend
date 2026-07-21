"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/shadcn/card";
import { Switch } from "@/components/ui/shadcn/switch";
import {
    createShippingCost,
    updateShippingCost,
    getShippingCostById,
} from "@/services/setting/shippingService";

const initialState = {
    location: "",
    price: "",
    isByLocation: false,
    isFree: false,
    extData: {},
};

export default function ShippingCostForm({
                                             editId,
                                             onSuccess,
                                         }) {
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!editId) return;

        getShippingCostById(editId).then((res) => {
            const data = res.data.data;
            setForm({
                location: data.location ?? "",
                price: data.price ?? "",
                isByLocation: data.isByLocation,
                isFree: data.isFree,
                extData: data.extData || {},
            });
        });
    }, [editId]);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...form,
            price: form.isFree ? null : Number(form.price),
        };

        try {
            editId
                ? await updateShippingCost(editId, payload)
                : await createShippingCost(payload);

            onSuccess();
            setForm(initialState);
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="rounded-2xl shadow-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    {editId ? "Edit Shipping Cost" : "Add Shipping Cost"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-5"
                >
                    {/* Location */}
                    <div className="grid gap-2">
                        <Label>Location</Label>
                        <Input
                            placeholder="Dhaka / Inside City"
                            value={form.location}
                            onChange={(e) =>
                                handleChange("location", e.target.value)
                            }
                        />
                    </div>

                    {/* Price */}
                    <div className="grid gap-2">
                        <Label>Shipping Price</Label>
                        <Input
                            type="number"
                            placeholder="120"
                            disabled={form.isFree}
                            value={form.price}
                            onChange={(e) =>
                                handleChange("price", e.target.value)
                            }
                        />
                    </div>

                    {/* Switches */}
                    <div className="flex items-center justify-between rounded-xl border p-4">
                        <div>
                            <Label>By Location</Label>
                            <p className="text-sm text-muted-foreground">
                                Charge shipping based on location
                            </p>
                        </div>
                        <Switch
                            checked={form.isByLocation}
                            onCheckedChange={(v) =>
                                handleChange("isByLocation", v)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border p-4">
                        <div>
                            <Label>Free Shipping</Label>
                            <p className="text-sm text-muted-foreground">
                                No shipping cost applied
                            </p>
                        </div>
                        <Switch
                            checked={form.isFree}
                            onCheckedChange={(v) =>
                                handleChange("isFree", v)
                            }
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        disabled={loading}
                        className="w-full rounded-xl"
                    >
                        {loading ? "Saving..." : "Save Shipping Cost"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}