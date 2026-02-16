import React from 'react';
import NavigationMobile from "@/components/ecommerce/NavigationMobile";
import CartNav from "@/components/ecommerce/CartNav";
import Navigation from "@/components/theme/Navigation";

const EcommerceHeader = () => {
    return (
        <>
            <header className="mt-4  mx-auto">
                <NavigationMobile/>
                <div className="mt-4">
                    <div>
                        <CartNav />
                    </div>
                </div>
                <hr/>
                <div className="my-2">
                    <Navigation/>
                </div>
                <hr/>
            </header>
        </>
    );
};

export default EcommerceHeader;