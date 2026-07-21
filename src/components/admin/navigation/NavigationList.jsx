"use client";

import { useEffect, useState } from "react";
import {getNavigation} from "@/services/navigation/NavigationService";

export default function NavigationList({ refresh, onEdit }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getNavigation().then((res)=>setData(res.data || [])).catch((err) => console.error(err));
    }, [refresh]);

    const renderChildren = (items, level = 1) => {
        return (
            <ul className={`ml-${level * 4} space-y-1`}>
                {items.length && items.map((item) => (
                    <li key={item.id} className="border p-2 rounded-md">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.url}</p>
                            </div>

                            <button
                                onClick={() => onEdit(item)}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Edit
                            </button>
                        </div>
                        {item.childrens?.length > 0 &&
                            renderChildren(item.childrens, level + 1)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {data.length === 0 ? (
                <p className="text-gray-500">No navigation found</p>
            ) : (
                renderChildren(data)
            )}
        </div>
    );
}