"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";

export default function CurrencyList({ currencies, onEdit, onDelete }) {
    if (!currencies || currencies.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">No currencies found.</div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">SL</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Sign</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currencies.map((currency, index) => (
                        <TableRow key={currency.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{currency.currency_name}</TableCell>
                            <TableCell>{currency.currency_sign}</TableCell>
                            <TableCell>{currency.currency_rate}</TableCell>
                            <TableCell>{currency.is_default ? "Yes" : "No"}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onEdit(currency)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => onDelete(currency.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}