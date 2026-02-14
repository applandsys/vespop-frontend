"use client";

import React, {useState, useEffect, useRef} from 'react';
import config from "@/config"; // You may need this to get the ID from the URL
import { useRouter } from 'next/navigation';

const BannerUploadForm = ({ bannerId, getBanners }) => {

    const [bannerData, setBannerData] = useState({});

    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        title_text: "",
        sub_title: "",
        slug: "",
        background_color: "",
    });
    const [bannerPreview, setBannerPreview] = useState(null);

    const router = useRouter();

    // Fetch the banner data when [bannerId] is passed
    useEffect(() => {
        if (bannerId) {
            // Fetch banner data for the provided ID
            fetch(`${config.apiBaseUrl}/admin/setting/banner/byid/${bannerId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setFormData({
                            name: data.data.name,
                            title_text: data.data.title_text,
                            sub_title: data.data.sub_text,
                            slug: data.data.slug,
                            background_color: data.data.backgroundColor,
                        });

                        setBannerData( data.data);

                        setBannerPreview(`${config.publicPath}/images/banners/${data.data.image}`);
                    }
                });
        }
    }, [bannerId]);

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

        const data = new FormData();
        data.append("name", formData.name);
        data.append("title_text", formData.title_text);
        data.append("sub_title", formData.sub_title);
        data.append("slug", formData.slug);
        data.append("background_color", formData.background_color);

        if (formData.banner) {
            data.append("banner", formData.banner);
        }

        const method = bannerId ? 'PUT' : 'POST';
        const url = bannerId
            ? `${config.apiBaseUrl}/admin/setting/banner/${bannerId}`
            : `${config.apiBaseUrl}/admin/setting/banner`;

        setSubmitting(true);

        const response = await fetch(url, {
            method,
            body: data,
        });

        if (response.ok) {
            !bannerId &&  getBanners();

            // Reset form
            setFormData({
                name: "",
                title_text: "",
                sub_title: "",
                slug: "",
                background_color: "",
                banner: null,
            });

            setBannerPreview(null);
            setSuccessMessage("Banner saved successfully!");

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // Optional redirect after 1.5s
            setTimeout(() => {
                router.push("/admin/banner-setting");
            }, 1500);
        } else {
            const result = await response.json();
            console.error(result.error || 'An error occurred');
        }


        setSubmitting(false);
    };

    return (
        <div>

            {successMessage && (
                <div className="mb-4 rounded-lg bg-green-100 border border-green-400 text-green-700 px-4 py-3">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mx-auto p-2 space-y-2">
                <div className="mt-2">
                    <label className="block text-sm text-gray-700 mb-1 text-center font-bold">
                        {bannerId ? 'Update Banner' : 'Create Banner'}
                    </label>
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title_text"
                        value={formData.title_text}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub Title</label>
                    <input
                        type="text"
                        name="sub_title"
                        value={formData.sub_title}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                    <input
                        type="text"
                        name="background_color"
                        value={formData.background_color}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                {/* Banner Image Preview */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Banner</label>
                    {bannerPreview && (
                        <img
                            src={bannerPreview}
                            alt="Banner Preview"
                            className="h-32 mb-2 object-cover w-full"
                        />
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="banner"
                        accept="image/*"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500"
                    />

                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-6 py-2 rounded-lg text-white ${submitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-400"}`}
                    >
                        {submitting ? "Submitting..." : bannerId ? "Update Banner" : "Create Banner"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BannerUploadForm;
