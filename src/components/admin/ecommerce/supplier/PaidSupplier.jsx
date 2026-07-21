"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Trash2, FileText, CheckCircle } from "lucide-react";

const PaidSupplier = ({ paids = [] }) => {
    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Paid History
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[80px] font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Supplier</TableHead>
                                <TableHead className="font-semibold text-gray-600">Amount</TableHead>
                                <TableHead className="font-semibold text-gray-600">Type</TableHead>
                                <TableHead className="font-semibold text-gray-600">Method</TableHead>
                                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                                <TableHead className="font-semibold text-gray-600">Date</TableHead>
                                <TableHead className="w-[100px] font-semibold text-gray-600 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paids.length > 0 ? paids.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium text-gray-500">
                                        #{item.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-gray-800">
                                            {item.supplier?.name || `ID: ${item.supplierId}`}
                                        </div>
                                        {item.particular && (
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <FileText className="w-3 h-3" />
                                                {item.particular}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-900">
                                        ৳ {item.amount?.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 capitalize text-[10px]">
                                            {item.type || 'Manual'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600 text-sm">
                                        {item.method || '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 capitalize text-[10px]">
                                            {item.status || 'Paid'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-sm">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => alert(`Delete ${item.id} not yet fully implemented`)}
                                            className="h-8 border-gray-200 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <CheckCircle className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No paid history found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default PaidSupplier;