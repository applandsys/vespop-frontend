"use client";

import React, { useEffect, useState } from "react";
import config from "@/config";
import CommonCard from "@/components/ui/CommonCard";

const FIELDS = [
    { key: "primaryColor", label: "Primary Color" },
    { key: "secondaryColor", label: "Secondary Color" },
    { key: "hoverColor", label: "Hover Color" },
    { key: "darkMode", label: "Dark Mode" },
    { key: "lightMode", label: "Light Mode" },
    { key: "titleTextColor", label: "Title Text Color" },
    { key: "contentColor", label: "Content Color" },
];

const ColorField = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <div className="flex items-center gap-2">
            <input
                type="color"
                value={value || "#000000"}
                onChange={(e) => onChange(name, e.target.value)}
                className="h-10 w-12 border rounded cursor-pointer p-0"
            />
            <input
                type="text"
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
            />
        </div>
    </div>
);

const ColorSettingForm = () => {
    const [formData, setFormData] = useState({
        primaryColor: "",
        secondaryColor: "",
        hoverColor: "",
        darkMode: "",
        lightMode: "",
        titleTextColor: "",
        contentColor: "",
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchColorSetting = async () => {
            try {
                const res = await fetch(`${config.apiBaseUrl}/admin/setting/color-setting`);
                const json = await res.json();

                if (json.success) {
                    const {
                        primaryColor,
                        secondaryColor,
                        hoverColor,
                        darkMode,
                        lightMode,
                        titleTextColor,
                        contentColor,
                    } = json.data;

                    setFormData({
                        primaryColor,
                        secondaryColor,
                        hoverColor,
                        darkMode,
                        lightMode,
                        titleTextColor,
                        contentColor,
                    });
                }
            } catch (error) {
                console.error("Failed to load color settings", error);
            }
        };

        fetchColorSetting();
    }, []);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`${config.apiBaseUrl}/admin/setting/color-setting`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const json = await res.json();

            if (json.success) {
                // Reload so the sidebar picks up the new theme colors
                window.location.reload();
            }
        } catch (error) {
            console.error("Update error", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <CommonCard title="Color Settings">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2"
            >
                {FIELDS.map((field) => (
                    <ColorField
                        key={field.key}
                        label={field.label}
                        name={field.key}
                        value={formData[field.key]}
                        onChange={handleChange}
                    />
                ))}

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
                        {submitting ? "Updating..." : "Update Colors"}
                    </button>
                </div>
            </form>
        </CommonCard>
    );
};

export default ColorSettingForm;
