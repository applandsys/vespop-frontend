"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/shadcn/table";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { fetchVisitorLogs } from "@/services/admin/getVisitorLogs";
import { Search, ChevronLeft, ChevronRight, Loader2, Globe, FileText, User } from "lucide-react";

export default function VisitorLogPage() {
    const [logs, setLogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const res = await fetchVisitorLogs(page, limit, search);
            if (res.status === "success") {
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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Visitor Logs</h1>
                <p className="text-sm text-gray-500">Track and audit user actions, page routes, and requests across the platform.</p>
            </div>

            <Card className="w-full">
                <CardHeader className="pb-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                        System Audit Logs <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">{total} total</span>
                    </CardTitle>
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 items-center w-full sm:max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by name, email, action, IP, or page..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-9"
                            />
                        </div>
                        <Button type="submit" size="sm" className="h-9">
                            Search
                        </Button>
                    </form>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="overflow-x-auto min-h-[300px] relative">
                        {loading ? (
                            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="h-8 w-8 animate-spin text-black" />
                                    <span className="text-sm text-gray-500 font-medium">Loading audit logs...</span>
                                </div>
                            </div>
                        ) : null}

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[180px]">Timestamp</TableHead>
                                    <TableHead className="w-[200px]">Customer</TableHead>
                                    <TableHead className="w-[140px]">IP Address</TableHead>
                                    <TableHead className="w-[180px]">Page Visited</TableHead>
                                    <TableHead>Actions performed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs && logs.length > 0 ? (
                                    logs.map((log) => (
                                        <TableRow key={log.id} className="hover:bg-gray-50/50">
                                            <TableCell className="text-gray-500 text-xs font-medium">
                                                {formatDate(log.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                {log.customer ? (
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-gray-800 text-sm flex items-center gap-1">
                                                            <User className="h-3 w-3 text-gray-400 inline" />
                                                            {log.customer.first_name} {log.customer.last_name}
                                                        </span>
                                                        <span className="text-xs text-gray-400 truncate max-w-[190px]">
                                                            {log.customer.email}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">Unknown Customer</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-xs">
                                                    <Globe className="h-3 w-3 text-slate-400" />
                                                    {log.ipAddress || "0.0.0.0"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-xs max-w-[170px] truncate">
                                                    <FileText className="h-3 w-3 text-blue-400 shrink-0" />
                                                    {log.pageName || "/"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-gray-700 text-sm font-medium">
                                                {log.actions || "Viewed page"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                                            No visitor logs found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t pt-4 mt-4">
                            <span className="text-xs text-gray-500 font-medium">
                                Page {page} of {totalPages} ({total} entries)
                            </span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                    disabled={page === 1}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className="h-8 w-8 p-0"
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