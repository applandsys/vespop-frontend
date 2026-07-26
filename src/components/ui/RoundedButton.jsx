import React from "react";

const RoundedButton = ({ children, onClick }) => {
    return (
        <button
            className="rounded-xl p-2 border block shadow-2xl border-gray-100 text-gray-600 font-bold hover:text-gray-800"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default RoundedButton;
