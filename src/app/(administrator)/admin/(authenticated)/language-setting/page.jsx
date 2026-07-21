"use client";

import { useState } from "react";

export default function LanguageSettingPage() {
    const [languageName, setLanguageName] = useState("");
    const [languageCode, setLanguageCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Submitting Language Settings:", { languageName, languageCode });
        alert(`Language: ${languageName}, Code: ${languageCode} submitted!`);
        // You would typically send this data to an API
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Language Settings</h1>

            <div className="border rounded-lg p-4 bg-white shadow-sm max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add New Language</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="languageName" className="block text-sm font-medium text-gray-700">
                            Language Name
                        </label>
                        <input
                            type="text"
                            id="languageName"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={languageName}
                            onChange={(e) => setLanguageName(e.target.value)}
                            placeholder="e.g., English"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="languageCode" className="block text-sm font-medium text-gray-700">
                            Language Code (e.g., en, es, fr)
                        </label>
                        <input
                            type="text"
                            id="languageCode"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={languageCode}
                            onChange={(e) => setLanguageCode(e.target.value)}
                            placeholder="e.g., en"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Language
                    </button>
                </form>
            </div>
        </div>
    );
}