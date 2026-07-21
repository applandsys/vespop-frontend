"use client";

import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { setLoginData } from "@/redux/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import config from "@/config";

function LoginForm({ type }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/${type}/auth/login`,
                { email, password }
            );

            dispatch(
                setLoginData({
                    token: response.data.token,
                    customer: response.data.sanitizedCustomer,
                })
            );

            if (response.data.token) {
                type === "user"
                    ? router.push("/admin/dashboard")
                    : router.back();
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <>
                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                                />
                                Remember me
                            </label>
                            {type === "user" && (
                                <a href="#" className="text-gray-600 hover:underline">
                                    Forgot password?
                                </a>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-gray-600 py-2.5 text-white font-semibold hover:bg-gray-700 transition duration-200"
                        >
                            Sign In
                        </button>
                    </form>

                    {type === "customer" && (
                        <div className="mt-6 text-center text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <Link
                                href="/auth/signup"
                                className="text-gray-600 font-medium hover:underline"
                            >
                                Create one
                            </Link>
                        </div>
                    )}

        </>
    );
}

export default LoginForm;
