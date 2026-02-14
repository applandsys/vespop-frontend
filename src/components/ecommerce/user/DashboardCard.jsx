import React from "react";
import CommonCard from "@/components/ui/CommonCard";
import {getUserStats} from "@/services/user/GetUserStats";

/**
 * DashboardCard (Light Theme Only)
 * Props:
 * - title: string
 * - value: string | number
 * - subtitle?: string
 * - delta?: { value: number, up?: boolean }
 * - icon?: ReactNode (rendered left of title)
 * - data?: number[] (optional sparkline)
 * - className?: string
 *
 * TailwindCSS required. Uses only light theme styling.
 */

const formatNumber = (v) => {
    if (typeof v === "number") return v.toLocaleString();
    return v;
};

function sparklinePath(data = [], width = 120, height = 36) {
    if (!data || data.length === 0) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);
    const points = data
        .map((d, i) => {
            const x = i * step;
            const y = height - ((d - min) / range) * height;
            return `${x},${y}`;
        })
        .join(" ");
    return points;
}

export default function DashboardCard({
                                          title,
                                          value,
                                          subtitle,
                                          delta,
                                          icon,
                                          data,
                                          className = "",
                                      }) {
    const deltaUp = delta && delta.value > 0;



    return (
            <div
                className={`bg-white hover:bg-amber-100 border border-gray-300 rounded-2xl p-4 flex items-start justify-between gap-4 shadow-2xl hover:-translate-y-1 transition-transform ${className}`}
            >
                <div className="flex gap-3 items-start">
                    {icon ? (
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700">
                            {icon}
                        </div>
                    ) : null}

                    <div className="flex flex-col">
                        <div className="text-sm font-medium text-slate-500">{title}</div>
                        <div className="mt-1 text-2xl font-semibold text-slate-900">{formatNumber(value)}</div>
                        {subtitle ? (
                            <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
                        ) : null}
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    {delta ? (
                        <div className="flex items-center gap-2 text-sm">
                        <span className={`text-xs font-semibold ${deltaUp ? 'text-green-600' : 'text-rose-600'}`}>
                          {deltaUp ? '▲' : '▼'} {Math.abs(delta.value)}%
                        </span>
                            <span className="text-xs text-slate-400">vs last period</span>
                        </div>
                    ) : null}

                    {data && data.length > 0 ? (
                        <svg width="120" height="36" viewBox="0 0 120 36" className="mt-3">
                            <polyline
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={sparklinePath(data)}
                                className="text-slate-300"
                            />
                        </svg>
                    ) : null}
                </div>
            </div>
         );
}