import React, {useEffect, useState} from 'react';
import NavigationMobile from "@/components/ecommerce/NavigationMobile";
import CartNav from "@/components/ecommerce/CartNav";
import Navigation from "@/components/theme/Navigation";
import {getCategories} from "@/services/ecommerce/getCategories";
import CategoryNavbar from "@/components/theme/CategoryNavbar";

const EcommerceHeader = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCategories().then((res) => {setCategories(res)}).catch(error => setError(error)).finally(setLoading(false));
    }, []);

    return (
        <>
            <header className="mx-auto">
                <NavigationMobile/>
                <div className="my-2">
                    <CartNav />
                </div>
                <div>
                    <CategoryNavbar categories={categories} />
                </div>
            </header>
        </>
    );
};

export default EcommerceHeader;