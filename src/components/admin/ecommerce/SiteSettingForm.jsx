"use client";

import React, { useEffect, useState } from "react";
import config from "@/config";
import CommonCard from "@/components/ui/CommonCard";

const SiteSettingForm = () => {
    const [formData, setFormData] = useState({
        site_name: "",
        description: "",
        logo: null,
        address: "",
        phone: "",
        email: "",
        whatsapp: "",
        default_currency: 1,
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // 🔹 Fetch existing site settings
    useEffect(() => {
        const fetchSiteSetting = async () => {
            try {
                const res = await fetch(
                    `${config.apiBaseUrl}/admin/setting/site-setting`
                );
                const json = await res.json();

                if (json.success) {
                    setFormData({
                        site_name: json.data.site_name,
                        description: json.data.description,
                        logo: null, // file input must be null
                        address: json.data.address,
                        phone: json.data.phone,
                        email: json.data.email,
                        whatsapp: json.data.whatsapp,
                        default_currency: json.data.default_currency,
                    });

                    setLogoPreview(json.data.logo);
                }
            } catch (error) {
                console.error("Failed to load site settings", error);
            }
        };

        fetchSiteSetting();
    }, []);

    // 🔹 Input handler
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "logo") {
            setFormData({ ...formData, logo: files[0] });
            if (files[0]) {
                setLogoPreview(URL.createObjectURL(files[0]));
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
            if (key === "logo") {
                if (value) form.append("logo", value);
            } else {
                form.append(key, value);
            }
        });

        try {
            const res = await fetch(
                `${config.apiBaseUrl}/admin/setting/site-setting`,
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
                        Site Name
                    </label>
                    <input
                        type="text"
                        name="site_name"
                        value={formData.site_name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Default Currency */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Default Currency
                    </label>
                    <select
                        name="default_currency"
                        value={formData.default_currency}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    >
                        <option value={1}>USD</option>
                        <option value={2}>BDT</option>
                    </select>
                </div>

                {/* Whatsapp */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Whatsapp
                    </label>
                    <input
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Logo */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                        Logo
                    </label>

                    {logoPreview && (
                       <>
                           <img
                               src={`${config.publicPath}${logoPreview}`}
                               alt="Logo Preview"
                               className="h-16 mb-2"
                           />
                       </>
                    )}

                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500"
                    />
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
                        {submitting ? "Updating..." : "Update Settings"}
                    </button>
                </div>
            </form>
        </CommonCard>
    );
};

export default SiteSettingForm;
