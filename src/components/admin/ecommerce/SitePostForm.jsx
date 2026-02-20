"use client";

import React, {useEffect, useState} from "react";
import config from "@/config";
import CommonCard from "@/components/ui/CommonCard";

const SiteSettingForm = ({postId}) => {
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        metaKeywords: "",
        seoMeta: "",
        categoryId: ""
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    // 🔹 Input handler
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "featuredImage") {
            setFormData({ ...formData, featuredImage: files[0] });
            if (files[0]) {
                setImagePreview(URL.createObjectURL(files[0]));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // 🔹 Submit (UPDATE ONLY)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "featuredImage") {
                if (value) form.append("featuredImage", value);
            } else {
                form.append(key, value);
            }
        });

        try {
            const res = await fetch(
                `${config.apiBaseUrl}/admin/site-post`,
                {
                    method: "POST",
                    body: form,
                }
            );

            const json = await res.json();
            if (!json.success) {
                console.error("Update failed");
            }
        } catch (error) {
            console.error("Update error", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <CommonCard title="Site Settings">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2"
            >
                {/* Site Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                       Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Excerpt (Brief Description)
                    </label>
                    <textarea
                        name="excerpt"
                        rows="4"
                        value={formData.excerpt}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                       Detail Description
                    </label>
                    <textarea
                        name="content"
                        rows="4"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>


                {/* Featured Image */}
                {/* Featured Image */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                        Featured Image
                    </label>

                    <input
                        type="file"
                        name="featuredImage"
                        accept="image/*"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500"
                    />

                    {/* Preview */}
                    {imagePreview && (
                        <div className="mt-4">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-56 h-auto rounded-lg border shadow"
                            />
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-6 py-2 rounded-lg text-white ${
                            submitting
                                ? "bg-gray-400"
                                : "bg-blue-500 hover:bg-blue-400"
                        }`}
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </CommonCard>
    );
};

export default SiteSettingForm;
