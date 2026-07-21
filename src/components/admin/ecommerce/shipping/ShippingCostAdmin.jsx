"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import ShippingCostForm from "./ShippingCostForm";
import { getShippingCosts } from "@/services/setting/shippingService";

export default function ShippingCostAdmin() {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);

    const load = async () => {
        const res = await getShippingCosts();
        setData(res.data.data || []);
        setEditId(null);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1">
                <ShippingCostForm editId={editId} onSuccess={load} />
            </div>
            <Card className="md:col-span-2">
                <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-base font-bold">Shipping Rates List</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">ID</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Free Shipping</TableHead>
                                    <TableHead>Calculation</TableHead>
                                    <TableHead className="text-right w-[80px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {data && data.length > 0 ? (
                                    data.map((row) => (
                                        <TableRow key={row.id} className="hover:bg-gray-50/50">
                                            <TableCell className="font-medium text-gray-500">{row.id}</TableCell>
                                            <TableCell className="font-semibold text-gray-800">{row.location || "Default"}</TableCell>
                                            <TableCell className="font-semibold text-gray-900">
                                                {row.isFree ? (
                                                    <span className="text-emerald-600 font-bold">FREE</span>
                                                ) : (
                                                    `৳${row.price}`
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                    row.isFree ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {row.isFree ? "Yes" : "No"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                    row.isByLocation ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-700'
                                                }`}>
                                                    {row.isByLocation ? "Location-based" : "Flat Rate"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setEditId(row.id)}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                            No shipping rates configured.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}