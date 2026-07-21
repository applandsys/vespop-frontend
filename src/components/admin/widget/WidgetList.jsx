"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { getWidget } from "@/services/widget/WidgetService";
import {getImageUrl} from "@/utils/R2Resolver";

export default function WidgetList({ refresh, onEdit , onDelete}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getWidget()
            .then((res) => setData(res.data.data || []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [refresh]);

    if (loading) {
        return <div className="p-4 text-sm text-gray-500">Loading widgets…</div>;
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">SL</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-sm text-gray-500">
                                No widgets found
                            </TableCell>
                        </TableRow>
                    )}

                    {data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>

                            <TableCell className="font-medium">
                                {item.name}
                            </TableCell>

                            <TableCell>{item.slug}</TableCell>

                            <TableCell>{item.title}</TableCell>

                            <TableCell>
                                {item.image ? (
                                    <img
                                        src={getImageUrl(item.image)}
                                        alt={item.name}
                                        className="h-10 w-10 rounded object-cover border"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-400">No image</span>
                                )}
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onEdit(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive" // Optional: changed to destructive for a standard delete look
                                        onClick={() => onDelete(item)}
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