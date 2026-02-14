"use client"; // Add this at the very top

import React from 'react';

const ContactForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted');
    };

    return (
        <section className="bg-white py-20 relative overflow-hidden">
            {/* Background Rack Design - Top Left */}
            <div className="absolute top-0 left-0 w-64 h-64 opacity-5">
                <div className="absolute top-10 left-10 w-48 h-48 border-2 border-gray-400 rounded-lg transform rotate-12"></div>
                <div className="absolute top-16 left-16 w-36 h-36 border-2 border-gray-400 rounded-lg transform rotate-6"></div>
                <div className="absolute top-24 left-24 w-24 h-24 border-2 border-gray-400 rounded-lg"></div>
            </div>

            {/* Background Rack Design - Bottom Right */}
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5">
                <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-gray-400 rounded-lg transform -rotate-12"></div>
                <div className="absolute bottom-16 right-16 w-36 h-36 border-2 border-gray-400 rounded-lg transform -rotate-6"></div>
                <div className="absolute bottom-24 right-24 w-24 h-24 border-2 border-gray-400 rounded-lg"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    {/* Get In Touch with icon */}
                    <div className="flex items-center justify-center mb-4">
                        <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">Get In Touch</span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                        Let's Start <span className="text-[#2a9d8f]">Conversation</span><br />
                        <span className="text-gray-700">We're Here to Help</span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-8 italic text-center leading-loose">
                        Have questions or ready to get started? Reach out to us and our team will get back to you within 24 hours.
                    </p>
                    <div className="w-24 h-0.5 bg-gray-400 mx-auto mt-8"></div>
                </div>

                {/* Form and Contact Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a9d8f] focus:border-transparent transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a9d8f] focus:border-transparent transition-all"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a9d8f] focus:border-transparent transition-all"
                                    placeholder="Enter subject"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a9d8f] focus:border-transparent transition-all resize-none"
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#2a9d8f] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#22867a] transition-colors duration-300 transform hover:scale-105"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                    {/* Office Location Map */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Office</h3>

                        {/* Map Container */}
                        <div className="bg-gray-100 rounded-xl h-96 mb-6 overflow-hidden">
                            {/* Google Maps Embed - Replace with your actual embed code */}
                            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d29188.089540054614!2d90.40354934950075!3d23.871485259183487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRajuk%20convention%20center%20Azampur%2CUttara%2CDhaka-1230!5e0!3m2!1sen!2sbd!4v1763816639798!5m2!1sen!2sbd" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>
                        </div>
                        {/* Office Address */}
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="bg-[#2a9d8f] p-2 rounded-lg mt-1">
                                    <LocationIcon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Main Office</h4>
                                    <p className="text-gray-600">Rajuk Kancha Bazar</p>
                                    <p className="text-gray-600">Azampur,Uttara,Dhaka-1230</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-[#2a9d8f] p-2 rounded-lg mt-1">
                                    <ClockIcon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                                    <p className="text-gray-600">Sunday: Closed</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-[#2a9d8f] p-2 rounded-lg mt-1">
                                    <PhoneIcon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Contact</h4>
                                    <p className="text-gray-600">+01969865256</p>
                                    <p className="text-gray-600">info@bdhoms.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Icon Components
const PhoneIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const LocationIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ClockIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default ContactForm;