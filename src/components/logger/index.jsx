'use client';

import { useEffect } from 'react';

export default function ClientLogger({ data }) {

    useEffect(() => {
        console.log("Data with logger:", data);
        console.log("Data with type:", typeof data);
    }, []);


    return null;
}
