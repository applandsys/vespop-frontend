"use client";

import React, {useEffect, useState} from 'react';
import CategoryButton from "@/components/ecommerce/BrowsAllCat";
import Link from "next/link";
import CategoryNavbar from "@/components/theme/CategoryNavbar";
import {getCategories} from "@/services/ecommerce/getCategories";

const Navigation = () => {

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCategories().then((res) => {setCategoryData(res)}).catch(error => setError(error)).finally(setLoading(false));
    }, []);

    return (
        <>
            <CategoryNavbar categories={categoryData} />
        </>
    );
};

export default Navigation;