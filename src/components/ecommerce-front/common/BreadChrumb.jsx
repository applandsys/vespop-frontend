import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const Breadcrumb = ({ items }) => {
    return (
        <nav className="bg-white border-b border-gray-200 py-3 px-4">
            <div className="container mx-auto">
                <ol className="flex items-center space-x-2 overflow-x-auto scrollbar-hide whitespace-nowrap">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center flex-shrink-0">
                            {index !== 0 && (
                                <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2 flex-shrink-0" />
                            )}
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="text-blue-600 hover:underline font-medium text-sm"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className="text-gray-500 text-sm font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;