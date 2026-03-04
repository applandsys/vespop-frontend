"use client";

import React, {useState, useEffect, useRef} from 'react';
import config from "@/config"; // You may need this to get the ID from the URL
import { useRouter } from 'next/navigation';
import {toast} from "react-toastify";

const CourierAddForm = ({ courierId, fetchCourier }) => {

    const [courierData, setCourierData] = useState({});

    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        url: '' ,
        api_key: '',
        username: '',
        password: '',
        storeId: '',
        secret_key: '',
        isActive: true,
        status: 'active'
    });

    const router = useRouter();

    useEffect(() => {
        if (courierId) {

            fetch(`${config.apiBaseUrl}/courier/${courierId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setFormData({
                            name: data.name,
                            url: '' ,
                            api_key: '',
                            username: '',
                            password: '',
                            storeId: '',
                            secret_key: '',
                            isActive: true,
                            status: 'active'
                        });

                        setCourierData( data.data);

                    }
                });
        }
    }, [courierId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleToggleActive = () => {
        setFormData(prev => ({
            ...prev,
            isActive: !prev.isActive,
            status: !prev.isActive ? 'active' : 'inactive'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = courierId ? 'PUT' : 'POST';
        const url = courierId
            ? `${config.apiBaseUrl}/courier/update/${courierId}`
            : `${config.apiBaseUrl}/courier`;

        setSubmitting(true);

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            !courierId &&  fetchCourier();

            // Reset form
            setFormData({
                name: '',
                url: '' ,
                api_key: '',
                username: '',
                password: '',
                storeId: '',
                secret_key: '',
                isActive: true,
                status: 'active'
            });

            toast.success("Courier Added successfully!");
            // Optional redirect after 1.5s
            setTimeout(() => {
                router.push("/admin/api-integration/courier");
            }, 1500);
        } else {
            const result = await response.json();
            console.error(result.error || 'An error occurred');
        }

        setSubmitting(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mx-auto p-2 space-y-2">
                <div className="mt-2">
                    <label className="block text-sm text-gray-700 mb-1 text-center font-bold">
                        {courierId ? 'Update Courier' : 'Create Courier'}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                    <input
                        type="text"
                        name="api_key"
                        value={formData.api_key}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Id</label>
                    <input
                        type="text"
                        name="storeId"
                        value={formData.storeId}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                        Active Status
                    </label>

                    <button
                        type="button"
                        onClick={handleToggleActive}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
        ${formData.isActive ? "bg-green-500" : "bg-gray-300"}`}
                    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 
            ${formData.isActive ? "translate-x-6" : "translate-x-1"}`}
        />
                    </button>
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-6 py-2 rounded-lg text-white ${submitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-400"}`}
                    >
                        {submitting ? "Submitting..." : courierId ? "Update Courier" : "Create Courier"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourierAddForm;
