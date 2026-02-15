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
                <div className=" mx-2" >
                    <ImgSlider/>
                </div>
                <div className="my-4 mx-2">
                    <h1 className="text-3xl font-bold">Featured Categories</h1>
                    <div className="categorySlider">
                        <CategoryCarousel/>
                    </div>
                </div>
                <div className="my-4 mt-8 mx-2">
                    <ProductList />
                </div>

                <div className="my-4 mt-8 mx-2">
                    <div className=" mt-4">
                        <PromoCards/>
                    </div>
                </div>
            </EcommerceFrontLayout>
        </>
    );
}