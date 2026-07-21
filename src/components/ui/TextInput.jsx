import React from 'react';

const TextInput = ({ name = null, placeholder = "Enter Coupon Code...", inputType = "text", onChange, value = "", required = false }) => {
    return (
        <input
            name={name}
            type={inputType}
            placeholder={placeholder}
            className="border rounded-lg p-2 w-full"
            onChange={onChange}
            value={value}
            required={required}  // Ensure required is applied here
        />
    );
};

export default TextInput;
