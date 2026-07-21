import React from 'react';

const InputField = ({ label, name, type = "text", placeholder = "Enter ..", value= "", onChange, required=false, className }) => {
    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700">{label} {required && (<span className="text-red-600">*</span>) }</label>
                <input
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    name={name}
                    required={required}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"/>
            </div>
        </>
    );
};

export default InputField;