import "./globals.css";
import React from "react";
import EcommerceFrontLayout from "@/layouts/EcommerceFrontLayout";
import ImgSlider from "@/components/ecommerce-front/banner-promo/ImgSlider";
import FeaturedCategoryWidgetList from "@/components/ecommerce-front/product/FeaturedCategoryWidgetList";
import NewArrivals from "@/components/ecommerce-front/product/NewArrivals";
import HomeBannerOne from "@/components/ecommerce-front/banner-promo/HomeBannerOne";
import FeaturedProducts from "@/components/ecommerce-front/product/FeaturedProducts";
import HomeBannerTwo from "@/components/ecommerce-front/banner-promo/HomeBannerTwo";
import WeareInstagram from "@/components/ecommerce-front/banner-promo/WeareInstagram";

export default function Home() {

    return (
        <>
            <EcommerceFrontLayout>
                <div>
                    <ImgSlider/>
                </div>
                <div className="mt-4 mx-auto max-w-[1200px] w-full px-4">
                    <FeaturedCategoryWidgetList />
                </div>
                <div className="mt-4 mx-auto max-w-[1200px] w-full px-4">
                    <div className="py-10">
                        <div className="flex items-center justify-center gap-6">
                            <span className="h-px w-32 xs:w-16 bg-black"></span>
                            <h2 className="text-sm text-center font-semibold tracking-widest uppercase">
                                New Arrivals
                            </h2>
                            <span className="h-px w-32 xs:w-16 bg-black"></span>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <a
                                href="#"
                                className="text-sm text-gray-700 underline underline-offset-4 hover:text-black"
                            >
                                View All
                            </a>
                        </div>
                        <div className="mt-4">
                            <NewArrivals />
                        </div>
                    </div>
                </div>

                <div>
                    <HomeBannerOne />
                </div>

                {/* 3. Featured Products Section (Now perfectly matched) */}
                <div className="mt-4 mx-auto max-w-[1200px] w-full px-4">
                    <div className="py-10">
                        <div className="flex items-center justify-center gap-6">
                            <span className="h-px w-32 xs:w-16 bg-black"></span>
                            <h2 className="text-sm text-center font-semibold tracking-widest uppercase">
                                Featured Products
                            </h2>
                            <span className="h-px w-32 xs:w-16 bg-black"></span>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <a
                                href="#"
                                className="text-sm text-gray-700 underline underline-offset-4 hover:text-black"
                            >
                                View All
                            </a>
                        </div>
                        <div className="mt-4">
                            <FeaturedProducts />
                        </div>
                    </div>
                </div>
                <div>
                    <HomeBannerTwo />
                </div>
                <div className="mt-16">
                    <h3 className="text-center font-bold">WE ARE IN INSTAGRAM</h3>
                    <div>
                        <WeareInstagram/>
                    </div>
                </div>
            </EcommerceFrontLayout>
        </>
    );
}