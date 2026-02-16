"use client";

import React, {useEffect, useState} from 'react';

import CategoryNavbar from "@/components/theme/CategoryNavbar";
import {getCategories} from "@/services/ecommerce/getCategories";

const Navigation = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCategories().then((res) => {setCategories(res)}).catch(err => setError(err)).finally(setLoading(false));
    }, []);

    return (
        <>
            {loading && <p className="text-center">Loading...</p>}
           <CategoryNavbar categories={categories} />
        </>
    );
};

export default Navigation;