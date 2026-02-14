import React from 'react';
import EcommerceFrontLayout from "@/layouts/EcommerceFront";

function EcommerceLayout({children}) {
    return (
        <EcommerceFrontLayout>
        <div>
            {children}
        </div>
        </EcommerceFrontLayout>
    );
}

export default EcommerceLayout;