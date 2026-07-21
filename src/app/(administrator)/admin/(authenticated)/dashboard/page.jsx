"use client";

import React, { useEffect } from 'react';
import { getAdminStats } from "@/services/admin/getStats";
import { fetchLatestOrder } from "@/services/ecommerce/orderService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Users, CreditCard, DollarSign, Calendar, Eye, Trash2, TrendingUp, PackageSearch } from "lucide-react";

const AdminDashboard = () => {
    const [adminStats, setAdminStats] = React.useState({
        totalCustomer: 0,
        totalOrder: 0,
        totalOrderAmount: 0,
        todayCustomer: 0,
        getTodayOrder: 0,
        todayOrderAmount: 0
    });
    const [latestOrder, setLatestOrder] = React.useState([]);

    useEffect(() => {
        getAdminStats().then(res => {
            setAdminStats(res || {});
        }).catch(err => {
            console.error(err);
        });

        fetchLatestOrder().then(res => {
            setLatestOrder(res || []);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    const statCards = [
        {
            title: "Total Customers",
            value: adminStats.totalCustomer || 0,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            subtitle: "All registered users"
        },
        {
            title: "Total Orders",
            value: adminStats.totalOrder || 0,
            icon: CreditCard,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            subtitle: "Completed orders"
        },
        {
            title: "Total Revenue",
            value: `$${(adminStats.totalOrderAmount || 0).toLocaleString()}`,
            icon: DollarSign,
            color: "text-emerald-600",
            bgColor: "bg-emerald-100",
            subtitle: "Lifetime revenue"
        },
        {
            title: "Today's Customers",
            value: adminStats.todayCustomer || 0,
            icon: Users,
            color: "text-amber-600",
            bgColor: "bg-amber-100",
            subtitle: "New signups today"
        },
        {
            title: "Today's Orders",
            value: adminStats.getTodayOrder || 0,
            icon: Calendar,
            color: "text-indigo-600",
            bgColor: "bg-indigo-100",
            subtitle: "Orders placed today"
        },
        {
            title: "Today's Revenue",
            value: `$${(adminStats.todayOrderAmount || 0).toLocaleString()}`,
            icon: TrendingUp,
            color: "text-rose-600",
            bgColor: "bg-rose-100",
            subtitle: "Revenue generated today"
        }
    ];

    return (
        <div className="space-y-8 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Overview of your store's performance and recent activities.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                        <div className="flex items-baseline">
                                            <h2 className="text-3xl font-bold text-gray-900">{stat.value}</h2>
                                        </div>
                                        <p className="text-xs text-gray-400">{stat.subtitle}</p>
                                    </div>
                                    <div className={`p-4 rounded-full ${stat.bgColor}`}>
                                        <Icon className={`w-8 h-8 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Latest Orders Table */}
            <Card className="shadow-sm border-gray-200">
                <CardHeader className="border-b bg-gray-50/50 pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                            <PackageSearch className="w-5 h-5 text-indigo-500" />
                            Latest Orders
                        </CardTitle>
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">Recent</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto min-h-[250px]">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/80">
                                    <TableHead className="w-[100px] font-semibold text-gray-600">ID</TableHead>
                                    <TableHead className="font-semibold text-gray-600">Customer Name</TableHead>
                                    <TableHead className="font-semibold text-gray-600">Order Amount</TableHead>
                                    <TableHead className="font-semibold text-gray-600">Phone Number</TableHead>
                                    <TableHead className="text-right font-semibold text-gray-600 w-[180px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {latestOrder && latestOrder.length > 0 ? (
                                    latestOrder.map((item, index) => (
                                        <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <TableCell className="font-medium text-gray-500">#{item?.id || index + 1}</TableCell>
                                            <TableCell className="font-semibold text-gray-800">{item?.customer?.name || 'Guest User'}</TableCell>
                                            <TableCell className="font-medium text-emerald-600">${item?.amount || '0.00'}</TableCell>
                                            <TableCell className="text-gray-500">{item?.customer?.phone || 'N/A'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="h-8 border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                    >
                                                        <Eye className="w-3.5 h-3.5 mr-1" /> View
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-40 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <PackageSearch className="h-8 w-8 text-gray-300 mb-2" />
                                                <p className="text-sm font-medium">No recent orders</p>
                                                <p className="text-xs text-gray-400 mt-1">New orders will appear here</p>
                                            </div>
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
};

export default AdminDashboard;