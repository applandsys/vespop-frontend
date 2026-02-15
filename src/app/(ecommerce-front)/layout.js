import React from 'react';
import EcommerceFrontLayout from "@/layouts/EcommerceFrontLayout";

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