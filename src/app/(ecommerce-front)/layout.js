import React from 'react';
import EcommerceFrontLayout from "@/layouts/EcommerceFrontLayout";

function EcommerceLayout({children}) {
    return (
        <EcommerceFrontLayout>
        <div className="max-w-[1200px] mx-auto px-4">
            {children}
        </div>
        </EcommerceFrontLayout>
    );
}

export default EcommerceLayout;