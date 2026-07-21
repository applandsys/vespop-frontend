"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Assuming react-toastify is installed and configured
import {
    createCurrency,
    getAllCurrencies,
    updateCurrency,
    deleteCurrency,
} from "@/services/currency/CurrencyService";
import CurrencyList from "@/components/admin/currency/CurrencyList";

export default function CurrencySettingPage() {
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editItem, setEditItem] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const [currencyName, setCurrencyName] = useState("");
    const [currencySign, setCurrencySign] = useState("");
    const [currencyRate, setCurrencyRate] = useState(0.0);
    const [isDefault, setIsDefault] = useState(false);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                setLoading(true);
                const response = await getAllCurrencies();
                setCurrencies(response.data || []);
            } catch (error) {
                console.error("Failed to fetch currencies:", error);
                toast.error("Failed to load currencies.");
            } finally {
                setLoading(false);
            }
        };
        fetchCurrencies();
    }, [refresh]);

    const resetForm = () => {
        setCurrencyName("");
        setCurrencySign("");
        setCurrencyRate(0.0);
        setIsDefault(false);
        setEditItem(null);
    };

    const handleSuccess = () => {
        resetForm();
        setRefresh((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currencyData = {
            currency_name: currencyName,
            currency_sign: currencySign,
            currency_rate: parseFloat(currencyRate),
            is_default: isDefault,
        };

        try {
            if (editItem) {
                await updateCurrency(editItem.id, currencyData);
                toast.success("Currency updated successfully!");
            } else {
                await createCurrency(currencyData);
                toast.success("Currency created successfully!");
            }
            handleSuccess();
        } catch (error) {
            console.error("Error submitting currency:", error);
            toast.error(error.message || "Error submitting currency!");
        }
    };

    const handleEdit = (currency) => {
        setEditItem(currency);
        setCurrencyName(currency.currency_name);
        setCurrencySign(currency.currency_sign);
        setCurrencyRate(currency.currency_rate);
        setIsDefault(currency.is_default);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this Currency?"
        );
        if (confirmDelete) {
            try {
                await deleteCurrency(id);
                toast.success("Currency deleted successfully!");
                handleSuccess();
            } catch (error) {
                console.error("Error deleting currency:", error);
                toast.error(error.message || "Error deleting currency!");
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                    {editItem ? "Edit Currency" : "Add New Currency"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="currencyName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Currency Name
                        </label>
                        <input
                            type="text"
                            id="currencyName"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={currencyName}
                            onChange={(e) => setCurrencyName(e.target.value)}
                            placeholder="e.g., US Dollar"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="currencySign"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Currency Sign
                        </label>
                        <input
                            type="text"
                            id="currencySign"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={currencySign}
                            onChange={(e) => setCurrencySign(e.target.value)}
                            placeholder="e.g., $"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="currencyRate"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Currency Rate (relative to default)
                        </label>
                        <input
                            type="number"
                            id="currencyRate"
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={currencyRate}
                            onChange={(e) => setCurrencyRate(parseFloat(e.target.value))}
                            placeholder="e.g., 1.00"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isDefault"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={isDefault}
                            onChange={(e) => setIsDefault(e.target.checked)}
                        />
                        <label
                            htmlFor="isDefault"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Set as Default Currency
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {editItem ? "Update Currency" : "Add Currency"}
                        </button>
                        {editItem && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-sm md:col-span-2 lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Currencies List</h2>
                {loading ? (
                    <div className="p-4 text-sm text-gray-500">Loading currencies…</div>
                ) : (
                    <CurrencyList
                        currencies={currencies}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
}