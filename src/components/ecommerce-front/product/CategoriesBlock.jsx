import React from "react";

const categoriesBlock = [
    { id: 1, name: "Power Sanders", image: "/images/power-sanders.png" },
    { id: 2, name: "Kitchen Fittings", image: "/images/kitchen.png" },
    { id: 3, name: "Womens Fashion", image: "/images/womens-fashion.png" },
    { id: 4, name: "Donate to Healthcare", image: "/images/healthcare.png" },
    { id: 5, name: "Goat", image: "/images/goat.png" },
    { id: 6, name: "Watches and Accessories", image: "/images/watch.png" },
    { id: 7, name: "Watering Systems & Garden Hoses", image: "/images/watering.png" },
    { id: 8, name: "Margarine & Spread", image: "/images/margarine.png" },

    { id: 9, name: "Bedding Sets", image: "/images/bedding.png" },
    { id: 10, name: "Pools", image: "/images/pools.png" },
    { id: 11, name: "Bathroom Lighting", image: "/images/bathroom-light.png" },
    { id: 12, name: "Eye Primers", image: "/images/eye-primer.png" },
    { id: 13, name: "Digital Downloads", image: "/images/digital.png" },
    { id: 14, name: "Skirts", image: "/images/skirts.png" },
    { id: 15, name: "Wipes & Refills", image: "/images/wipes.png" },
    { id: 16, name: "Beans & Chickpeas", image: "/images/beans.png" },
];

const CategoriesBlock = () => {
    return (
        <section className=" bg-white mt-6">
            {/* Title */}
            <h2 className="text-lg font-medium text-gray-800 px-4 py-3">
                Categories
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-8 border-t border-l">
                {categoriesBlock.map((cat) => (
                    <div
                        key={cat.id}
                        className="border-r border-b p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-sm transition"
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="h-16 w-16 object-contain mb-3"
                        />
                        <p className="text-sm text-gray-700 leading-tight">
                            {cat.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesBlock;