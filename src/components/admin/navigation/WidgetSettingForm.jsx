"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select";
import config from "@/config";
import {getNavigation} from "@/services/navigation/NavigationService";
import { getImageUrl } from "@/utils/R2Resolver";


export default function WidgetSettingForm({
                                           initialData,
                                           onSubmit,
                                       }) {
    const [parents, setParents] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [form, setForm] = useState({
        name: "",
        slug: "",
        title: "",
        subTitle: "",
        imageContent: "",
        backgroundColor: "",
        borderColor: "",
        content: "",
        cssClasses: "",
        position: "",
        buttonLink: "",
        jsonContent: null,
        image: ""
    });

    useEffect(() => {
        if (initialData) {
            setForm({ ...initialData });
            if (initialData.image) {
                setImagePreview(getImageUrl(initialData.image));
            } else {
                setImagePreview(null);
            }
        } else {
            // Reset form when creating a new widget
            setForm({
                name: "",
                slug: "",
                title: "",
                subTitle: "",
                imageContent: "",
                backgroundColor: "",
                borderColor: "",
                content: "",
                cssClasses: "",
                position: "",
                buttonLink: "",
                jsonContent: null,
                image: ""
            });
            setImagePreview(null);
        }
        
        getNavigation().then((res)=>setParents(res.data.data || [])).catch((err) => console.error(err));
    }, [initialData]);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

            <div>
                <Label>Widget Name</Label>
                <Input
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                />
            </div>

            <div>
                <Label>Slug</Label>
                <Input
                    value={form.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    required
                />
            </div>

            <div>
                <Label>Title</Label>
                <Input
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                />
            </div>

            <div>
                <Label>Sub Title</Label>
                <Input
                    value={form.subTitle}
                    onChange={(e) => handleChange("subTitle", e.target.value)}

                />
            </div>

            <div>
                <Label>Button Link To</Label>
                <Input
                    value={form.buttonLink}
                    onChange={(e) => handleChange("buttonLink", e.target.value)}

                />
            </div>

            <div>
                <Label>Image Link</Label>
                <Input
                    value={form.imageContent}
                    onChange={(e) => handleChange("imageContent", e.target.value)}

                />
            </div>

            <div>
                <Label>Background Color</Label>
                <Input
                    value={form.backgroundColor}
                    onChange={(e) => handleChange("backgroundColor", e.target.value)}

                />
            </div>

            <div>
                <Label>Border Color</Label>
                <Input
                    value={form.borderColor}
                    onChange={(e) => handleChange("borderColor", e.target.value)}

                />
            </div>

            <div>
                <Label>Content</Label>
                <Input
                    value={form.content}
                    onChange={(e) => handleChange("content", e.target.value)}

                />
            </div>


            <div>
                <Label>Css Classes</Label>
                <Input
                    value={form.cssClasses}
                    onChange={(e) => handleChange("cssClasses", e.target.value)}

                />
            </div>



            <div>
                <Label>Position</Label>
                <Select
                    value={form.position}
                    onValueChange={(v) => handleChange("position", v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="header">Header</SelectItem>
                        <SelectItem value="footer">Footer</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                        <SelectItem value="detail">Detail</SelectItem>
                        <SelectItem value="home">Home Page</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            <div>
                <Label>Image</Label>
                <div className="my-2">
                    {imagePreview && (
                        <div className="mb-4 p-2 border rounded-md bg-gray-50 flex justify-center w-full sm:w-1/2">
                            <img
                                src={imagePreview}
                                alt="Widget Preview"
                                className="max-h-32 rounded shadow-sm object-contain"
                            />
                        </div>
                    )}
                    <Input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer"
                    />
                </div>
            </div>

            <Button type="submit" className="w-full">
                Save Navigation
            </Button>
        </form>
    );
}