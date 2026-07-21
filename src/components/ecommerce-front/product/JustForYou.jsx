import React from "react";

const products = [
    {
        id: 1,
        title: "EMS Mini Massager with 2 Pad",
        image:
            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=800&auto=format&fit=crop",
        price: "৳122",
        oldPrice: "৳154",
        discount: "-21%",
        rating: 4.5,
        reviews: 189,
    },
    {
        id: 2,
        title: "Man & Women Geometric Bandana",
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        price: "৳134",
        oldPrice: "৳394",
        discount: "-66%",
        rating: 4.7,
        reviews: 236,
    },
    {
        id: 3,
        title: "UGreen Phone Case for Samsung",
        image:
            "https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=800&auto=format&fit=crop",
        price: "৳1,155",
        oldPrice: "৳1,850",
        discount: "-38%",
        rating: 4.3,
        reviews: 11,
    },
    {
        id: 4,
        title: "Universal Phone Cooler",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        price: "৳265",
        oldPrice: "৳650",
        discount: "-59%",
        rating: 4.4,
        reviews: 2,
    },
    {
        id: 5,
        title: "Rechargeable Mini Fan",
        image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
        price: "৳2,752",
        oldPrice: "৳4,700",
        discount: "-41%",
        rating: 4.8,
        reviews: 91,
    },
    {
        id: 6,
        title: "Strong Grip Silicone Phone Holder",
        image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
        price: "৳50",
        oldPrice: "৳150",
        discount: "-67%",
        rating: 4.6,
        reviews: 255,
    },
];

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center text-yellow-400 text-sm">
            {"★".repeat(Math.floor(rating))}
            <span className="ml-1 text-gray-500 text-xs">({rating})</span>
        </div>
    );
};

export default function JustForYou() {
    return (
        <div className="w-full bg-white p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Just For You
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
                    >
                        {/* Image */}
                        <div className="w-full h-52 bg-gray-100 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-3">
                            <h3 className="text-sm text-gray-700 line-clamp-2 min-h-[40px]">
                                {product.title}
                            </h3>

                            {/* Price */}
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-orange-500 font-semibold text-lg">
                  {product.price}
                </span>

                                <span className="text-gray-400 line-through text-sm">
                  {product.oldPrice}
                </span>

                                <span className="text-gray-500 text-sm">
                  {product.discount}
                </span>
                            </div>

                            {/* Rating */}
                            <div className="mt-2 flex items-center gap-1">
                                <div className="text-yellow-400 text-sm">★★★★★</div>
                                <span className="text-gray-500 text-xs">
                  ({product.reviews})
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}