import React from "react";

const products = [
    {
        id: 1,
        title: "KitKat 2 Fingers Chocolate 11.9gm 30pcs",
        image: "/images/kitkat.jpg",
        price: 777,
        oldPrice: 1200,
        discount: 35,
    },
    {
        id: 2,
        title: "Inspired by Curren belt men women CN 8301",
        image: "/images/watch.jpg",
        price: 345,
        oldPrice: 1458,
        discount: 76,
    },
    {
        id: 3,
        title: "Himalaya Men Acne Clear Neem Face Wash",
        image: "/images/himalaya-men.jpg",
        price: 189,
        oldPrice: 299,
        discount: 37,
    },
    {
        id: 4,
        title: "Skin'O Care and Repair Sunscreen SPF 50+",
        image: "/images/sunscreen.jpg",
        price: 292,
        oldPrice: 390,
        discount: 25,
    },
    {
        id: 5,
        title: "Himalaya Purifying Neem Face Wash 300ml",
        image: "/images/himalaya.jpg",
        price: 189,
        oldPrice: 500,
        discount: 62,
    },
    {
        id: 6,
        title: "Men & Women Geometric Bandana",
        image: "/images/bandana.jpg",
        price: 34,
        oldPrice: 100,
        discount: 66,
    },
];

const FlashSale = () => {
    return (
        <section className="bg-white  mt-6">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div>
                    <h2 className="text-xl font-medium text-gray-800">Flash Sale</h2>
                    <p className="text-sm text-[#FF4F00] mt-1">On Sale Now</p>
                </div>

                <button className="border border-[#FF4F00] text-[#FF4F00] px-4 py-1 text-sm font-medium hover:bg-[#FF4F00] hover:text-white transition">
                    SHOP ALL PRODUCTS
                </button>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Products */}
            <div className="grid grid-cols-6 gap-4 px-4 py-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="cursor-pointer hover:shadow-md transition"
                    >
                        {/* Image */}
                        <div className="bg-gray-100 h-40 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full object-contain"
                            />
                        </div>

                        {/* Info */}
                        <div className="mt-2">
                            <p className="text-sm text-gray-800 line-clamp-2">
                                {product.title}
                            </p>

                            <p className="text-[#FF4F00] font-medium mt-1">
                                ৳{product.price}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="line-through">৳{product.oldPrice}</span>
                                <span>-{product.discount}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FlashSale;