"use client";

import React, { useState, useEffect } from 'react';
import config from "@/config";
import { fetchAllProductBrand } from "@/services/ecommerce/ProductBrand";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";

const ProductBrandAddEditForm = ({ setProductBrandList, editingBrand, setEditingBrand }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (editingBrand) {
            setFormData({
                name: editingBrand.name || '',
                description: editingBrand.description || '',
                image: null // Cannot prepopulate files securely
            });
        } else {
            resetForm();
        }
    }, [editingBrand]);

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            image: null
        });
        if (setEditingBrand) setEditingBrand(null);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        if (formData.image) form.append('image', formData.image);

        try {
            const method = editingBrand ? 'PUT' : 'POST';
            const url = editingBrand 
                ? `${config.apiBaseUrl}/admin/product/edit-product-brand/${editingBrand.id}`
                : `${config.apiBaseUrl}/admin/product/add-product-brand`;

            const response = await fetch(url, {
                method: method,
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
        <Card className="w-full">
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-bold">
                    {editingBrand ? 'Edit Brand' : 'Create Brand'}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="brand-name" className="text-sm font-semibold text-gray-700">Brand Name</Label>
                        <Input
                            id="brand-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="brand-desc" className="text-sm font-semibold text-gray-700">Brand Description</Label>
                        <Input
                            id="brand-desc"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="brand-image" className="text-sm font-semibold text-gray-700">Logo Image</Label>
                        <Input
                            id="brand-image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-black/80"
                        />
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full flex-1"
                        >
                            {submitting ? 'Submitting...' : (editingBrand ? 'Update' : 'Submit')}
                        </Button>
                        {editingBrand && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                disabled={submitting}
                                className="w-full flex-1"
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProductBrandAddEditForm;
