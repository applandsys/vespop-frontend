"use client";

import React, { useState, useEffect } from 'react';
import config from "@/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";

const CategoryForm = ({ categoryList = [], fetchCategories, categoryToEdit }) => {
    // Initialize the form data with either the category being edited or default values
    const initialData = {
        name: '',
        parentId: '',
        image: null,        // NEW uploaded file
        icon: null,
        imageUrl: '',       // EXISTING image from server
        iconUrl: '',
        colorName: '#000000',
        colorCode: '#000000',
    };
    const [formData, setFormData] = useState(initialData);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (categoryToEdit?.category) {
            setFormData({
                name: categoryToEdit.category.name || '',
                parentId: categoryToEdit.category.parentId || '',
                image: null, // important
                icon: null,
                imageUrl: categoryToEdit.category.image || '',
                iconUrl: categoryToEdit.category.icon || '',
                colorName: categoryToEdit.category.color || '#000000',
                colorCode: categoryToEdit.category.color || '#000000',
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
        <Card className="w-full">
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-bold">
                    {categoryToEdit ? "Edit Category" : "Create Category"}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="category-name" className="text-sm font-semibold text-gray-700">Category Name</Label>
                        <Input
                            id="category-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Electronics"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="parent-category" className="text-sm font-semibold text-gray-700">Parent Category</Label>
                        <select
                            id="parent-category"
                            name="parentId"
                            value={formData.parentId}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="">None (Primary)</option>
                            {categoryList.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="category-image" className="text-sm font-semibold text-gray-700">Category Image</Label>
                        <Input
                            id="category-image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-black/80"
                        />
                        {formData.imageUrl && !formData.image && (
                            <p className="text-[11px] text-gray-400 mt-1 truncate">
                                Current: {formData.imageUrl.split('/').pop()}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="category-icon" className="text-sm font-semibold text-gray-700">Category Icon</Label>
                        <Input
                            id="category-icon"
                            type="file"
                            name="icon"
                            accept="image/*"
                            onChange={handleChange}
                            className="cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-black/80"
                        />
                        {formData.iconUrl && !formData.icon && (
                            <p className="text-[11px] text-gray-400 mt-1 truncate">
                                Current: {formData.iconUrl.split('/').pop()}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="color-name" className="text-sm font-semibold text-gray-700">Color</Label>
                        <div className="flex gap-2">
                            <Input
                                id="color-name"
                                type="text"
                                name="colorName"
                                value={formData.colorName}
                                onChange={handleChange}
                                placeholder="#000000"
                                className="flex-1"
                            />
                            <input
                                id="color-picker"
                                type="color"
                                name="colorCode"
                                value={formData.colorCode}
                                onChange={handleChange}
                                className="w-10 h-10 p-0 border border-gray-300 rounded-xl cursor-pointer shrink-0 overflow-hidden"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full mt-2"
                    >
                        {submitting ? 'Submitting...' : categoryToEdit ? 'Update' : 'Submit'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CategoryForm;

