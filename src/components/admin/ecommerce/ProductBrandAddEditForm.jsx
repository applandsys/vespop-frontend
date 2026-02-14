"use client";

import React, { useState } from 'react';
import config from "@/config";
import CommonCard from "@/components/ui/CommonCard";
import {fetchAllProductBrand} from "@/services/ecommerce/ProductBrand";

const ProductBrandAddEditForm = ({ setProductBrandList }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null
    });

    const [submitting, setSubmitting] = useState(false);

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            image: null
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setFormData({ ...formData, [name]: files[0] });
        }else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true); // Disable the button

        const form = new FormData();
        form.append('name', formData.name);

        if (formData.image) form.append('image', formData.image);
;

        try {
            const response = await fetch(`${config.apiBaseUrl}/admin/product/add-product-brand`, {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                const updatedBrandList = await fetchAllProductBrand();
                setProductBrandList(updatedBrandList);
                resetForm();
            } else {
                console.error('Submission failed:');
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <CommonCard title="Create Product Brand">
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-800"></h2>

            <div className="my-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="my-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>


            <div className="my-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
            <button
                type="submit"
                disabled={submitting}
                className={`w-full py-2 px-2 rounded-lg transition ${
                    submitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-400 text-white hover:bg-blue-300'
                }`}
            >
                {submitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
        </CommonCard>
    );
};

export default ProductBrandAddEditForm;
