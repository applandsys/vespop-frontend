"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { getCustomerActivityLogs } from "@/services/admin/getCustomerActivityLogs";
import { Search, ChevronLeft, ChevronRight, Loader2, Globe, User, Activity, Box, Monitor } from "lucide-react";

export default function CustomerActivityLogPage() {
    const [logs, setLogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const res = await getCustomerActivityLogs({ page, limit, search });
            if (res.success) {
                setLogs(res.data.logs || []);
                setTotal(res.data.total || 0);
            }
        } catch (err) {
            console.error("Failed to load logs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, [page]);

    // Automatically reload when search is cleared
    useEffect(() => {
        if (search === "") {
            setPage(1);
            loadLogs();
        }
    }, [search]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        loadLogs();
    };

    const totalPages = Math.ceil(total / limit) || 1;

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    const getActivityColor = (type) => {
        const types = {
            'LOGIN': 'bg-green-100 text-green-700',
            'LOGOUT': 'bg-orange-100 text-orange-700',
            'REGISTER': 'bg-blue-100 text-blue-700',
            'UPDATE_PROFILE': 'bg-purple-100 text-purple-700',
            'PURCHASE': 'bg-emerald-100 text-emerald-700',
            'ADD_TO_CART': 'bg-teal-100 text-teal-700',
            'VIEW_ITEM': 'bg-slate-100 text-slate-700'
        };
        return types[type] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Customer Activity</h1>
                <p className="text-sm text-gray-500">Track and monitor detailed customer actions across the platform.</p>
            </div>

            <Card className="w-full shadow-sm border-gray-200">
                <CardHeader className="pb-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50/50">
                    <CardTitle className="text-base font-bold flex items-center gap-2 text-gray-800">
                        Activity Stream <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">{total} total</span>
                    </CardTitle>
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 items-center w-full sm:max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search email, IP, or URL..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-9 border-gray-300 focus:ring-indigo-500"
                            />
                        </div>
                        <Button type="submit" size="sm" className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white">
                            Search
                        </Button>
                    </form>
                </CardHeader>
                <CardContent className="pt-4 px-0 sm:px-6">
                    <div className="overflow-x-auto min-h-[300px] relative">
                        {loading ? (
                            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 backdrop-blur-sm">
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                                    <span className="text-sm text-gray-500 font-medium">Loading activity logs...</span>
                                </div>
                            </div>
                        ) : null}

                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/80">
                                    <TableHead className="w-[160px] font-semibold text-gray-600">Timestamp</TableHead>
                                    <TableHead className="w-[200px] font-semibold text-gray-600">Customer / Session</TableHead>
                                    <TableHead className="w-[150px] font-semibold text-gray-600">Activity</TableHead>
                                    <TableHead className="w-[140px] font-semibold text-gray-600">Entity</TableHead>
                                    <TableHead className="w-[150px] font-semibold text-gray-600">Context</TableHead>
                                    <TableHead className="font-semibold text-gray-600">Source</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs && logs.length > 0 ? (
                                    logs.map((log) => (
                                        <TableRow key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                            <TableCell className="text-gray-500 text-xs font-medium">
                                                {formatDate(log.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    {log.user ? (
                                                        <>
                                                            <span className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                                                                <User className="h-3.5 w-3.5 text-indigo-500" />
                                                                {log.user.first_name} {log.user.last_name}
                                                            </span>
                                                            <span className="text-xs text-gray-500 truncate max-w-[190px]">
                                                                {log.user.email}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="font-medium text-gray-600 text-sm flex items-center gap-1.5 italic">
                                                                <User className="h-3.5 w-3.5 text-gray-400" />
                                                                Guest User
                                                            </span>
                                                            {log.email && (
                                                                <span className="text-xs text-gray-500 truncate max-w-[190px]">
                                                                    {log.email}
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                    {log.sessionId && !log.user && (
                                                        <span className="text-[10px] text-gray-400 font-mono truncate max-w-[190px]">
                                                            ID: {log.sessionId}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${getActivityColor(log.activityType)}`}>
                                                    <Activity className="h-3 w-3 shrink-0" />
                                                    {log.activityType}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {log.entityType ? (
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="inline-flex items-center gap-1 text-gray-700 font-medium text-xs">
                                                            <Box className="h-3 w-3 text-gray-400" />
                                                            {log.entityType}
                                                        </span>
                                                        {log.entityId && (
                                                            <span className="text-[11px] text-gray-500 font-mono">
                                                                #{log.entityId}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1.5">
                                                    {log.ipAddress && (
                                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] w-fit">
                                                            <Globe className="h-3 w-3 text-slate-400" />
                                                            {log.ipAddress}
                                                        </span>
                                                    )}
                                                    {(log.os || log.browser) && (
                                                        <span className="inline-flex items-center gap-1 text-gray-500 text-[10px]">
                                                            <Monitor className="h-3 w-3 text-gray-400" />
                                                            {log.os || 'Unknown OS'} • {log.browser || 'Unknown'}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-0.5">
                                                    {log.url && (
                                                        <span className="text-xs text-blue-600 truncate max-w-[200px]" title={log.url}>
                                                            {log.url}
                                                        </span>
                                                    )}
                                                    {log.referrer && (
                                                        <span className="text-[10px] text-gray-400 truncate max-w-[200px]" title={log.referrer}>
                                                            Ref: {log.referrer}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <Activity className="h-10 w-10 text-gray-300 mb-3" />
                                                <p className="text-sm font-medium">No activity logs found</p>
                                                <p className="text-xs text-gray-400 mt-1">Try adjusting your search criteria</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4 pb-2 px-2">
                            <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2.5 py-1 rounded-md">
                                Page <span className="text-gray-900 font-semibold">{page}</span> of <span className="text-gray-900 font-semibold">{totalPages}</span> ({total} entries)
                            </span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                    disabled={page === 1}
                                    className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className="h-8 w-8 p-0 border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}