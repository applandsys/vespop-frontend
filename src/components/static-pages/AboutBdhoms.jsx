import React from 'react';
import AboutHero from './AboutHero';
const AboutBdhoms = () => {
    return (
        <>
            <AboutHero />
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div className="space-y-2 p-4 md:p-8 md:pl-10 lg:pl-[90px]">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-relaxed">
                                Engineer Nazrul Islam<br />
                                <span className="text-sm font-bold text-slate-700 tracking-widest uppercase">
                        Managing Director
                    </span>
                            </h3>
                            <div className="text-gray-600 leading-relaxed space-y-4 text-sm sm:text-base">
                                <p className="font-medium text-gray-500 leading-8 tracking-[0.02em] italic">
                                BD Homes is dedicated to delivering trusted engineering consultancy, complete papers support,
                                    and high-quality construction services. We work to build strong, safe, and modern buildings that
                                    serve our clients for many years to come. Our team is committed to honesty, professionalism,
                                    and completing every project on time with excellence. Whether it’s new building construction or
                                    repairing and renovating old structures, we always maintain the highest standards.
                                </p>

                                <p className="font-medium text-gray-500 leading-8 tracking-[0.02em] italic">Thank you for placing your trust in BD Homes</p>

                                <p className="text-yellow-600 font-semibold">
                                    — together, we build a stronger future.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start p-4 md:p-8 md:pl-10 lg:pl-[90px]">
                            <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80
                                border-[2px] border-gray-300 rounded-lg overflow-hidden
                                relative rotate-45 transform origin-center">
                                <div className="absolute inset-0 bg-gradient-to-br
                                    from-yellow-300/40 via-yellow-200/20 to-transparent
                                    mix-blend-soft-light pointer-events-none z-10">
                                </div>
                                <div className="absolute inset-0 -rotate-45 transform origin-center z-0">
                                    <div className="absolute -inset-3 rounded-lg
                                        bg-[radial-gradient(circle_at_center,_#ffe9a8_0%,_#f0d27b_40%,_transparent_70%)]
                                        blur-2xl opacity-70 z-0">
                                    </div>
                                    <img
                                        src="/images/engneer-nazrul-islam.jpeg"
                                        alt="Managing Director — Engineer Nazrul Islam"
                                        className="w-full h-full object-cover scale-150 relative z-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutBdhoms;
