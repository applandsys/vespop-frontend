import React from 'react';

const AnnouncementBar = () => {
    const announcements = [
        "FREE WITHIN 14 DAYS",
        "FREE SHIPPING ON ALL ORDERS OVER $20.00",
        "RETURNS ARE FREE WITHIN 14 DAYS",
        "FREE SHIPPING ON ALL ORDERS OVER 100TK"
    ];

    // SVG Lightning Bolt with black outline and transparent fill
    const LightningIcon = () => (
        <svg
            className="w-2.5 h-2.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
    );

    return (
        <div className="bg-[#fafafa] text-black py-2 overflow-hidden relative border-b border-gray-200">
            <div className="flex animate-scroll-smooth whitespace-nowrap hover:animation-paused items-center h-full">
                {[...Array(6)].map((_, setIndex) => (
                    <div key={setIndex} className="flex items-center space-x-4 pr-4 flex-shrink-0 h-full">
                        {announcements.map((announcement, index) => (
                            <React.Fragment key={`${setIndex}-${index}`}>
                                {/* Slightly smaller text size - using text-[11px] */}
                                <span className="font-poppins font-normal text-[11px] tracking-normal px-2 flex items-center h-full">
                                    {announcement}
                                </span>
                                {/* Black outline lightning separator - also smaller */}
                                {index < announcements.length - 1 ? (
                                    <span className="text-black flex items-center h-full">
                                        <LightningIcon />
                                    </span>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementBar;