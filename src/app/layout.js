"use client";

import "./globals.css";
import { Quicksand } from 'next/font/google';

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { usePathname } from "next/navigation";
import Loader from "@/components/theme/Loader";


const quicksand = Quicksand({
    weight: '700',
    subsets: ['latin'],
    variable: '--font-quicksand',
    display: 'swap',
})


export default function RootLayout({ children }) {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [pathname]);


  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans`}>
          <div>
              {loading && <Loader />}
              {children}
          </div>
      </body>
    </html>
  );
}
