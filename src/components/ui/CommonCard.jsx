import React from 'react';

const CommonCard = ({children,title}) => {
    return (
        <div className="w-full p-2 bg-white shadow-md rounded-md space-y-2">
            <h3 className="text-sm font-bold  mt-4  text-gray-800 border-b border-gray-200">{title}</h3>
            {children}
        </div>
    );
};

export default CommonCard;