import React, { useState, useRef } from "react";

export default function UserProfileForm({ initialData = {}, onSubmit }) {
    const [form, setForm] = useState({
        firstName: initialData.first_name || "",
        lastName: initialData.last_name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        gender: initialData.gender || "",
        city: initialData.city || "",
        state: initialData.state || "",
        zip: initialData.zip || "",
        bio: initialData.bio || "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(initialData.avatarUrl || "");
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onload = () => setAvatarPreview(reader.result.toString());
        reader.readAsDataURL(file);
    };

    const validate = () => {
        const errs = {};
        if (!form.firstName.trim()) errs.firstName = "First name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email";
        if (form.phone && !/^[0-9()+\-\s]{6,20}$/.test(form.phone)) errs.phone = "Invalid phone";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length) return;

        setSaving(true);
        try {
            // Prepare payload. Caller may prefer FormData for file uploads.
            if (onSubmit) {
                // Provide both parsed fields and the avatar file so the parent can decide.
                await onSubmit({ ...form, avatarFile });
            } else {
                // Default behaviour: log to console (replace with your API call)
                const payload = { ...form };
                console.log("Submit payload:", payload, avatarFile);
                // Example: using fetch with FormData
                // const fd = new FormData();
                // Object.entries(payload).forEach(([k,v]) => fd.append(k,v));
                // if (avatarFile) fd.append('avatar', avatarFile);
                // await fetch('/api/user/profile', { method: 'POST', body: fd });
            }
            // Optionally show a success state / toast
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                <div className="flex-shrink-0">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        {avatarPreview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={avatarPreview} alt="avatar preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        <label
                            htmlFor="avatar"
                            className="inline-flex items-center px-3 py-1.5 rounded-md border border-gray-200 text-sm cursor-pointer hover:bg-gray-50"
                        >
                            Change
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                setAvatarFile(null);
                                setAvatarPreview("");
                                if (fileInputRef.current) fileInputRef.current.value = null;
                            }}
                            className="inline-flex items-center px-3 py-1.5 rounded-md border border-gray-200 text-sm hover:bg-gray-50"
                        >
                            Remove
                        </button>
                        <input
                            ref={fileInputRef}
                            id="avatar"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First name</label>
                        <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.firstName ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200'}`}
                        />
                        {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last name</label>
                        <input
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200'}`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200'}`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Getner</label>
                        <input
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input name="city" value={form.city} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input name="state" value={form.state} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP</label>
                    <input name="zip" value={form.zip} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200" />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200" />
            </div>

            <div className="flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={() => {
                        // reset to initialData
                        setForm({
                            firstName: initialData.firstName || "",
                            lastName: initialData.lastName || "",
                            email: initialData.email || "",
                            phone: initialData.phone || "",
                            company: initialData.company || "",
                            city: initialData.city || "",
                            state: initialData.state || "",
                            zip: initialData.zip || "",
                            bio: initialData.bio || "",
                        });
                        setAvatarFile(null);
                        setAvatarPreview(initialData.avatarUrl || "");
                        setErrors({});
                    }}
                    className="px-4 py-2 rounded-md border border-gray-200 text-sm hover:bg-gray-50"
                >
                    Reset
                </button>

                <button
                    type="submit"
                    className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium shadow-sm text-white ${saving ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
