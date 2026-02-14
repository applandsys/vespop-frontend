import React from 'react';
import Link from 'next/link';

const ContactHero = () => {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden mx-4 my-8">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(/images/contacthero.jpg)',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full">
                {/* Breadcrumb at the top with oval button background */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="relative inline-block">
                        {/* Oval Button Background */}
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full transform scale-150 -z-10"></div>

                        {/* Text */}
                        <p className="text-lg text-white relative z-10 px-2 ">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 hover:text-gray-200 transition-colors"
                            >
                                <HomeIcon className="w-5 h-5" />
                                Home
                            </Link>
                            {' > '}
                            <span className="text-gray-200">Contact Us</span>
                        </p>
                    </div>
                </div>

                {/* Scroll Indicator at the bottom */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="animate-bounce">
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Home Icon Component
const HomeIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);

export default ContactHero;