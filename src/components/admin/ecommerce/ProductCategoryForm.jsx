"use client";

import React, { useState, useEffect } from 'react';
import config from "@/config";
import CommonCard from "@/components/ui/CommonCard";

const CategoryForm = ({ categoryList = [], fetchCategories, categoryToEdit }) => {
    // Initialize the form data with either the category being edited or default values
    const initialData = {
        name: '',
        parentId: '',
        image: null,
        icon: null,
        colorName: '#000000',
        colorCode: '#000000',
    };

    const [formData, setFormData] = useState(initialData);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (categoryToEdit && categoryToEdit.category) {
            setFormData({
                ...categoryToEdit.category, // Spread the category object directly
                colorName: categoryToEdit.category.color || '#000000', // Set colorName if available
                colorCode: categoryToEdit.category.color || '#000000', // Set colorCode if available
                parentId: categoryToEdit.category.parentId || '', // Ensure parentId is set
            });
        }
    }, [categoryToEdit]);

    const resetForm = () => {
        setFormData(initialData);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image' || name === 'icon') {
            setFormData({ ...formData, [name]: files[0] });
        } else if (name === 'colorCode') {
            setFormData({
                ...formData,
                colorCode: value,
                colorName: value,
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true); // Disable the button

        const form = new FormData();
        form.append('name', formData.name);
        form.append('parentId', formData.parentId || '');
        form.append('color', formData.colorName);

        if (formData.image) form.append('image', formData.image);
        if (formData.icon) form.append('icon', formData.icon);

        try {
            const method = categoryToEdit ? 'PUT' : 'POST';
            const url = categoryToEdit
                ? `${config.apiBaseUrl}/admin/product/edit-product-category/${categoryToEdit.category.id}`
                : `${config.apiBaseUrl}/admin/product/add-product-category`;

            const response = await fetch(url, {
                method,
                body: form,
            });

            const data = await response.json();

            if (response.ok) {
                fetchCategories();
                resetForm();
            } else {
                console.error('Submission failed:', data);
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setSubmitting(false); // Re-enable the button
        }
    };

    return (
        <CommonCard title={categoryToEdit ? "Edit Category" : "Create Category"}>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold text-gray-800"></h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                        <select
                            name="parentId"
                            value={formData.parentId}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">None</option>
                            {categoryList.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Icon</label>
                        <input
                            type="file"
                            name="icon"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <input
                            type="text"
                            name="colorName"
                            value={formData.colorName}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        />
                        <input
                            type="color"
                            name="colorCode"
                            value={formData.colorCode}
                            onChange={handleChange}
                            className="w-12 h-10 p-0 border rounded-md cursor-pointer"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-2 px-2 rounded-lg transition ${
                            submitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {submitting ? 'Submitting...' : categoryToEdit ? 'Update' : 'Submit'}
                    </button>
                </form>
            </div>
        </CommonCard>
    );
};

export default CategoryForm;
