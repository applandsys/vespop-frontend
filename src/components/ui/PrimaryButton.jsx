import React from 'react';
import Link from "next/link";

const PrimaryButton = ({
                           children,
                           handleCLick,
                           className = '',  // additional classes
                           type = 'button', // default to 'button'
                           href, // link url for link type
                           disabled = false // default to false
                       }) =>
    {

    return (
        type === 'button' ? (
            <button
                onClick={handleCLick}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded flex items-center justify-center"
            >
                {children}
            </button>
        ) :
            (
                <Link href={href} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded flex items-center justify-center"> {children}</Link>
            )

    );
};

export default PrimaryButton;
