import React from "react";

const RoundedButton = ({ children, onClick }) => {
    return (
        <button
            className="rounded-xl p-2 border block shadow-2xl border-green-100 text-gray-600 font-bold hover:text-green-600"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default RoundedButton;
