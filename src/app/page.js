import "./globals.css";
import React from "react";
import ImgSlider from "@/components/ecommerce/ImgSlider";
import CategoryCarousel from "@/components/ecommerce/CategoryCarousel";
import PromoCards from "@/components/ecommerce/PromoBox";
import ProductList from "@/components/ecommerce/product/ProductList";
import EcommerceFrontLayout from "@/layouts/EcommerceFrontLayout";

export default function Home() {

    return (
        <>
            <EcommerceFrontLayout>
                <div className="mt-[-10px]" >
                    <ImgSlider/>
                </div>
                <div className="mx-2">
                    <CategoryCarousel/>
                </div>
                <div className="mx-2">
                    <ProductList />
                </div>
            </EcommerceFrontLayout>
        </>
    );
}