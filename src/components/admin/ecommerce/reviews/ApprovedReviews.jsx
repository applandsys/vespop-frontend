"use client";

import { useEffect, useState } from "react";
import { fetchReviews, updateReview } from "@/services/admin/ReviewService";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Star, CheckCircle, XCircle } from "lucide-react";

const ApprovedReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [loadingActionId, setLoadingActionId] = useState(null);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = () => {
        fetchReviews("approved").then(r => setReviews(r.data || [])).catch(e => console.error(e));
    };

    const handleAction = async (id, action) => {
        try {
            setLoadingActionId(id);
            await updateReview(id, action);
            toast.success(`Review successfully ${action === 'approve' ? 'approved' : 'rejected'}`);
            loadReviews();
        } catch (error) {
            toast.error("Failed to update review status");
            console.error(error);
        } finally {
            setLoadingActionId(null);
        }
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Approved Reviews
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[80px] font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Product</TableHead>
                                <TableHead className="font-semibold text-gray-600">Customer</TableHead>
                                <TableHead className="font-semibold text-gray-600">Rating</TableHead>
                                <TableHead className="font-semibold text-gray-600 w-[350px]">Review Text</TableHead>
                                <TableHead className="font-semibold text-gray-600">Date</TableHead>
                                <TableHead className="w-[100px] font-semibold text-gray-600 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reviews.length > 0 ? reviews.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium text-gray-500">
                                        #{item.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-gray-800">
                                            {item.product?.name || `Product ID: ${item.productId}`}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-700">
                                            {item.customer?.first_name} {item.customer?.last_name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {item.customer?.phone || item.customer?.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-gray-900">{item.rating}</span>
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-sm text-gray-600 italic line-clamp-2">
                                            "{item.review || 'No written review provided'}"
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-sm">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => handleAction(item.id, 'reject')}
                                            disabled={loadingActionId === item.id}
                                            className="h-8 border-red-200 text-red-700 hover:bg-red-50 transition-colors"
                                        >
                                            <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <CheckCircle className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No approved reviews found</p>
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

export default ApprovedReviews;