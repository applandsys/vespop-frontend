"use client";

import { useEffect } from "react";
import { initFacebookPixel } from "@/lib/facebookPixel";

export default function FacebookPixelInit() {
    useEffect(() => {
        initFacebookPixel();
    }, []);

    return null; // no UI
}