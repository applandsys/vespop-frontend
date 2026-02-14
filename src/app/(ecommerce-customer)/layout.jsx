import React from 'react';
import EcommerceFrontLayout from "@/layouts/EcommerceFront";

function EcommerceCustomerLayout({children}) {
    return (
        <EcommerceFrontLayout>
            <div>
                {children}
            </div>
        </EcommerceFrontLayout>
    );
}

export default EcommerceCustomerLayout;