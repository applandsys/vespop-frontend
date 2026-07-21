
import React from "react";
import {ReduxProvider} from "@/providers/ReduxProvider";
import {SnackbarProvider} from "@/components/ui/SnackbarProvider";
import Footer from "@/components/user/Footer";
import MobileFooterMenu from "@/components/ecommerce-front/layouts/MobileFooterMenu";
import FrontHeader from "@/components/ecommerce-front/layouts/FrontHeader";

export const metadata = {
    title: "Ecommerce Website ",
    description: "Shop and fun",
};

export default function EcommerceFrontLayout({ children }) {
    return (
        <div >
            <ReduxProvider>
                <SnackbarProvider>
                    <FrontHeader/>
                    <main className="min-h-screen flex flex-col  mx-auto ">
                        {children}
                    </main>
                    <Footer/>
                    <MobileFooterMenu />
                </SnackbarProvider>
            </ReduxProvider>
        </div>
    );
}
