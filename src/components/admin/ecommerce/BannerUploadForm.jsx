"use client";

import React, { useState, useEffect, useRef } from 'react';
import config from "@/config";
import { toast } from "react-toastify";
import { getImageUrl } from "@/utils/R2Resolver";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import { Upload, X } from "lucide-react";

const BannerUploadForm = ({ bannerId, onSuccess, onCancel }) => {

    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        title_text: "",
        title_text_color: "",
        sub_title: "",
        sub_text_color: "",
        slug: "",
        background_color: "",
        banner: null,
    });
    const [bannerPreview, setBannerPreview] = useState(null);

    // Fetch the banner data when [bannerId] is passed
    useEffect(() => {
        if (bannerId) {
            fetch(`${config.apiBaseUrl}/admin/setting/banner/byid/${bannerId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setFormData({
                            name: data.data.name || "",
                            title_text: data.data.title_text || "",
                            title_text_color: data.data.title_text_color || "",
                            sub_title: data.data.sub_text || "",
                            sub_text_color: data.data.sub_text_color || "",
                            slug: data.data.slug || "",
                            background_color: data.data.backgroundColor || "",
                            banner: null,
                        });

                        setBannerPreview(`${getImageUrl(data.data.image)}`);
                    }
                });
        } else {
            resetForm();
        }
    }, [bannerId]);

    const resetForm = () => {
        setFormData({
            name: "",
            title_text: "",
            title_text_color: "",
            sub_title: "",
            sub_text_color: "",
            slug: "",
            background_color: "",
            banner: null,
        });
        setBannerPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "banner") {
            setFormData({ ...formData, banner: files[0] });

            if (files?.[0]) {
                setBannerPreview(URL.createObjectURL(files[0]));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("title_text", formData.title_text);
        data.append("title_text_color", formData.title_text_color);
        data.append("sub_title", formData.sub_title);
        data.append("sub_text_color", formData.sub_text_color);
        data.append("slug", formData.slug);
        data.append("background_color", formData.background_color);

        if (formData.banner instanceof File) {
            data.append("banner", formData.banner);
        }

        const isUpdate = Boolean(bannerId);

        const url = isUpdate
            ? `${config.apiBaseUrl}/admin/setting/banner/${bannerId}`
            : `${config.apiBaseUrl}/admin/setting/banner`;

        try {
            const response = await fetch(url, {
                method: isUpdate ? "PUT" : "POST",
                body: data,
            });

            if (!response.ok) {
                const result = await response.json();
                console.error(result);
                toast.error("Something went wrong");
                return;
            }

            toast.success(isUpdate ? "Banner Updated!" : "Banner Created!");
            
            if (onSuccess) onSuccess();
            
            if (!isUpdate) {
                resetForm();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit form");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        resetForm();
        if (onCancel) onCancel();
    };

    return (
        <Card className="w-full shadow-sm border-gray-200 sticky top-4">
            <CardHeader className="border-b bg-gray-50/50 pb-4">
                <CardTitle className="text-lg font-bold flex items-center justify-between text-gray-800">
                    <span className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-indigo-500" />
                        {bannerId ? "Update Banner" : "Upload Banner"}
                    </span>
                    {bannerId && (
                        <Button variant="ghost" size="icon" onClick={handleCancel} className="h-6 w-6 text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Summer Sale Banner"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title_text"
                                value={formData.title_text}
                                onChange={handleChange}
                                placeholder="Main heading"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Title Color</Label>
                            <Input
                                type="text"
                                name="title_text_color"
                                value={formData.title_text_color}
                                onChange={handleChange}
                                placeholder="e.g. #FFFFFF"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Sub Title</Label>
                            <Input
                                type="text"
                                name="sub_title"
                                value={formData.sub_title}
                                onChange={handleChange}
                                placeholder="Secondary text"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Sub Title Color</Label>
                            <Input
                                type="text"
                                name="sub_text_color"
                                value={formData.sub_text_color}
                                onChange={handleChange}
                                placeholder="e.g. #DDDDDD"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Slug</Label>
                            <Input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="e.g. summer-sale"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Background Color</Label>
                            <Input
                                type="text"
                                name="background_color"
                                value={formData.background_color}
                                onChange={handleChange}
                                placeholder="e.g. #000000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Banner Image</Label>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            name="banner"
                            accept="image/*"
                            onChange={handleChange}
                            className="cursor-pointer"
                        />
                        {bannerPreview && (
                            <div className="mt-4 p-2 border rounded bg-gray-50 flex justify-center">
                                <img
                                    src={bannerPreview}
                                    alt="Banner Preview"
                                    className="max-h-40 rounded shadow-sm object-contain"
                                    style={{ backgroundColor: formData.background_color || 'transparent' }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex gap-3">
                        {bannerId && (
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="w-full"
                                onClick={handleCancel}
                            >
                                Cancel Edit
                            </Button>
                        )}
                        <Button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                        >
                            {submitting ? "Saving..." : bannerId ? "Update Banner" : "Create Banner"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default BannerUploadForm;
