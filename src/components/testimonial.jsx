import React from "react";
import Image from "next/image";

const people = [
    { name: "Thamos Miller", role: "CEO Buja Builder", img: "/images/person1.jpg" },

    { name: "Thamso Wallim", role: "CEO Buja Builder", img: "/images/person2.jpg" },
    { name: "Billa Rose", role: "CEO Buja Builder", img: "/images/person3.jpg" },
];

export default function Testimonials() {
    return (
        <section className="relative py-16">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "url('/images/bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-6 md:px-12 items-center">
                {/* LEFT side - client cards */}
                <div className="space-y-6">
                    {people.map((p, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between bg-white shadow-md rounded-lg overflow-hidden transform ${
                                i === 1 ? "translate-x-6" : i === 2 ? "translate-x-12" : ""
                            }`}
                        >
                            <div className="flex items-center gap-4 p-4">
                                <Image
                                    src={p.img}
                                    alt={p.name}
                                    width={70}
                                    height={70}
                                    className="rounded-md object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                                    <p className="text-sm text-brand-orange">{p.role}</p>
                                </div>
                            </div>
                            <div className="bg-brand-orange p-4 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT side - review */}
                <div>
                    <p className="text-brand-orange font-semibold mb-2">Testimonials</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Client&apos;s <span className="text-brand-orange">Reviews</span>
                    </h2>

                    <div className="flex text-brand-orange mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-xl">★</span>
                        ))}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        For each project we establish relationships with partners who we know
                        will help us create added value for your project. As well as bringing
                        together the public and private sectors added value for your project.
                        As well as bringing together...
                    </p>

                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/person1.jpg"  width={70} height={70}
                            alt="Thamos Miller"
                            className="rounded-md object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Thamos Miller</h3>
                            <p className="text-sm text-brand-orange">CEO Buja Builder</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
