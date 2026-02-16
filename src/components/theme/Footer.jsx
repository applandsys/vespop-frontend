"use client";

import { PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import SmallCard from "@/components/theme/SmallCard";
import config from '@/config';
import {usePathname} from "next/navigation";
import React from "react";

export default function Footer (){
    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    return (
        <>
            {hasWord ?  (
                <footer className="container mx-auto mt-12">
                    <hr/>
                    <div className="container flex flex-col md:flex-row justify-between bottom-footer mt-4">
                        <div className="py-4 text-center md:text-left">
                            <div className="text-xs">© 2026 Vespop.com. All rights reserved </div>
                        </div>
                    </div>
                </footer>
            ) : (
                <footer className="mx-auto mt-12 px-4 md:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 py-6">
                        <div className="text-center lg:text-left order-3 lg:order-1">
                            <div className="text-sm text-gray-600">
                                © 2024 Vespop. All rights reserved
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </>
    )
};