import React from 'react';

const Input = ({ label, name, value, onChange }) => {
    return (

            <div>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                    type="number"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full border px-2 py-1 rounded focus:outline-none focus:ring"
                />
            </div>

    );
};

export default Input;