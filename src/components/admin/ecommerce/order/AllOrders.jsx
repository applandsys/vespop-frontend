"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/services/ecommerce/getOrders";
import config from "@/config";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { ShoppingCart, ShieldAlert, Truck, RotateCcw, FileText } from "lucide-react";

const AllOrders = ({type=null}) => {

    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [fraudResult, setFraudResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingFraud, setLoadingFraud] = useState(false);

    const [showReturnModal, setShowReturnModal] = useState(false);
    const [returnOrderId, setReturnOrderId] = useState(null);
    const [returnReason, setReturnReason] = useState("");
    const [submittingReturn, setSubmittingReturn] = useState(false);


    const getStatusBadgeVariant = (status) => {
        const map = {
            paid: "bg-green-100 text-green-800 border-green-200",
            shipped: "bg-blue-100 text-blue-800 border-blue-200",
            cancel: "bg-red-100 text-red-800 border-red-200",
            return: "bg-orange-100 text-orange-800 border-orange-200",
            delivered: "bg-gray-100 text-gray-800 border-gray-200"
        };
        return map[status] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    useEffect(() => {
        getOrders(type)
            .then(r => setOrders(r.data))
            .catch(console.error);
    }, []);

    const handleCourierRedirect = (orderId) => {
        router.push(`/admin/order/courier-delivery?orderId=${orderId}`);
    };

    const handleChangeStatus = async (orderId, status) => {
        if (!status) return;
        await fetch(`${config.apiBaseUrl}/admin/order/update-status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, status }),
        });

        getOrders(type).then(r => setOrders(r.data));
    };

    const handleCheckFraud = async (phone) => {
        if (!phone) return;
        try {
            setLoadingFraud(true);
            setShowModal(true);
            const res = await fetch(`${config.apiBaseUrl}/third-party/fraud-check`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });
            const data = await res.json();
            setFraudResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFraud(false);
        }
    };
    
    const triggerReturnModal = (orderId) => {
        setReturnOrderId(orderId);
        setReturnReason("");
        setShowReturnModal(true);
    };

    const submitReturn = async () => {
        if (!returnReason.trim()) {
            alert("Please enter return reason");
            return;
        }

        try {
            setSubmittingReturn(true);

            await fetch(`${config.apiBaseUrl}/admin/order/return`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: returnOrderId,
                    reason: returnReason,
                }),
            });

            setShowReturnModal(false);
            setReturnReason("");
            setReturnOrderId(null);

            // refresh list
            const res = await getOrders(type);
            setOrders(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to submit return");
        } finally {
            setSubmittingReturn(false);
        }
    };

    return (
        <Card className="w-full shadow-sm border-gray-200">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <ShoppingCart className="w-5 h-5 text-indigo-500" />
                    All Orders
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/80">
                                <TableHead className="w-[60px] font-semibold text-gray-600">SL</TableHead>
                                <TableHead className="font-semibold text-gray-600">Customer</TableHead>
                                <TableHead className="font-semibold text-gray-600">Contact</TableHead>
                                <TableHead className="font-semibold text-gray-600">Amount</TableHead>
                                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                                <TableHead className="font-semibold text-gray-600">Update</TableHead>
                                <TableHead className="w-[300px] font-semibold text-gray-600 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length > 0 ? orders.map((order, index) => (
                                <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium text-gray-500">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-gray-800">
                                            {order.customer?.first_name ?? ""} {order.customer?.last_name ?? ""}
                                        </div>
                                        <div className="text-xs text-gray-500">UID: {order.customer?.uid ?? "N/A"}</div>
                                    </TableCell>
                                    <TableCell className="text-gray-700 text-sm font-medium">
                                        {order.customer?.phone ?? "N/A"}
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-900">
                                        BDT {order.totalAmount}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={`uppercase text-[10px] ${getStatusBadgeVariant(order.status)}`}>
                                            {order.status || 'Pending'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <select 
                                            className="border border-gray-300 rounded text-xs px-2 py-1.5 focus:ring-indigo-500 focus:border-indigo-500 bg-white" 
                                            value={order.status || ""}
                                            onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                                        >
                                            <option value="">Change Status</option>
                                            <option value="paid">Paid</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="cancel">Cancel</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => triggerReturnModal(order.id)}
                                                className="h-7 text-xs border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-colors px-2"
                                            >
                                                <RotateCcw className="w-3 h-3 mr-1" /> Return
                                            </Button>
                                            
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => router.push(`/admin/order/detail/${order.id}`)}
                                                className="h-7 text-xs border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600 transition-colors px-2"
                                            >
                                                <FileText className="w-3 h-3 mr-1" /> Detail
                                            </Button>

                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => handleCheckFraud(order.customer?.phone)}
                                                className="h-7 text-xs border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors px-2"
                                            >
                                                <ShieldAlert className="w-3 h-3 mr-1" /> Fraud
                                            </Button>

                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => handleCourierRedirect(order.id)}
                                                className="h-7 text-xs border-green-200 hover:bg-green-50 hover:text-green-600 transition-colors px-2"
                                            >
                                                <Truck className="w-3 h-3 mr-1" /> Courier
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-40 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <ShoppingCart className="h-8 w-8 text-gray-300 mb-2" />
                                            <p className="text-sm font-medium">No orders found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-[650px] rounded-xl shadow-2xl p-6 relative animate-fadeIn">
                        <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl">✕</button>
                        <h3 className="text-xl font-bold mb-4">Fraud Check Result</h3>
                        {loadingFraud ? (
                            <div className="text-center py-12 text-gray-500">
                                Checking fraud history...
                            </div>
                        ) : fraudResult ? (
                            (() => {
                                const cancelRate =
                                    fraudResult.total_parcels > 0
                                        ? ((fraudResult.total_cancel / fraudResult.total_parcels) * 100).toFixed(1)
                                        : 0;
                                let riskLabel = "Low Risk";
                                let riskColor = "bg-green-100 text-green-700";

                                if (cancelRate >= 50) {
                                    riskLabel = "High Risk";
                                    riskColor = "bg-red-100 text-red-700";
                                } else if (cancelRate >= 20) {
                                    riskLabel = "Medium Risk";
                                    riskColor = "bg-yellow-100 text-yellow-700";
                                }
                                return (
                                    <div className="space-y-5">
                                        <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium">
                                                    Mobile: {fraudResult.mobile_number}
                                                </p>
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${riskColor}`}>
                                                    {riskLabel}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Total Parcels</p>
                                                    <p className="font-semibold">{fraudResult.total_parcels}</p>
                                                </div>
                                                <div>
                                                    <p className="text-green-600">Delivered</p>
                                                    <p className="font-semibold">{fraudResult.total_delivered}</p>
                                                </div>
                                                <div>
                                                    <p className="text-red-600">Cancelled</p>
                                                    <p className="font-semibold">{fraudResult.total_cancel}</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm">
                                                Cancellation Rate: <strong>{cancelRate}%</strong>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-3">Courier Breakdown</h4>
                                            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                                                {Object.values(fraudResult.apis).map((api, index) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-lg p-3 bg-white shadow-sm"
                                                    >
                                                        <div className="flex justify-between">
                                                            <p className="font-medium">
                                                                {api.courier_name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Total: {api.total_parcels}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-4 mt-2 text-sm">
                                                            <span className="text-green-600">
                                                                Delivered: {api.total_delivered_parcels}
                                                            </span>
                                                            <span className="text-red-600">
                                                                Cancelled: {api.total_cancelled_parcels}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No fraud history found.
                            </div>
                        )}
                    </div>
                </div>
            )}


            {showReturnModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <div className="bg-white w-[500px] rounded-xl shadow-2xl p-6 relative">
                        <button
                            onClick={() => setShowReturnModal(false)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <RotateCcw className="w-5 h-5 text-orange-500" />
                            Return Order
                        </h3>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Reason for return
                            </label>

                            <textarea
                                value={returnReason}
                                onChange={(e) => setReturnReason(e.target.value)}
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-shadow"
                                placeholder="Write detailed reason here..."
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowReturnModal(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={submitReturn}
                                disabled={submittingReturn}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                {submittingReturn ? "Submitting..." : "Submit Return"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </Card>
    );
};

export default AllOrders;
