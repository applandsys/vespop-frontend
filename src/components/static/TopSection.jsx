import React from 'react';
import Link from 'next/link';

const TopSection = () => {
    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <span className="text-gray-400">&gt;</span>
                        <span className="text-gray-900 font-medium">About Us</span>
                    </div>
                </div>

                {/* Main Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        About Us
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default TopSection;