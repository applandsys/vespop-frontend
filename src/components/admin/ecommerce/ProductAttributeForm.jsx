"use client";

import React, {useEffect, useState} from 'react';
import config from "@/config";
import {fetchProductAttributes} from "@/services/ecommerce/GetProducts";

const AttributeForm = ({fetchAttributes}) => {


    const [attributes,setAttributes] = useState([]);

    const [formData, setFormData] = useState({
        value: '',
        codeNumber: '',
        attributeId: null
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProductAttributes().then(response => {
            setAttributes(response)
        }).catch(err=>console.log(err))
    }, []);

    const resetForm = () => {
        setFormData({
            value: '',
            codeNumber: '',
            attributeId: null
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`${config.apiBaseUrl}/admin/product/add-attribute`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                resetForm();
            } else {
                console.error('Submission failed:', data);
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setSubmitting(false);
            fetchAttributes();
        }
    };


    return (
        <>
            <div className="flex">
                <div className="w-full">
                    <form onSubmit={handleSubmit} className="mx-auto p-2 bg-white shadow-md rounded-xl space-y-2">
                        <h2 className="text-2xl font-semibold text-gray-800">Create Product Attribute</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Attribute</label>
                            <select
                                required={true}
                                name="attributeId"
                                value={formData.attributeId}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Attribute</option>
                                {attributes.map((attr) => (
                                    <option key={attr.id} value={attr.id}>
                                        {attr.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Attribute Value</label>
                            <input
                                type="text"
                                name="value"
                                value={formData.value}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code name</label>
                            <input
                                type="text"
                                name="codeNumber"
                                value={formData.codeNumber}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-3 px-4 rounded-lg transition ${
                                submitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>

            </div>

        </>
    );
};

export default AttributeForm;
