"use client";

import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { setLoginData } from "@/redux/store/slices/authSlice";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

function Login({ type }) {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200">
                {/* Header */}
                <div className="px-6 py-5 border-b">
                    <h2 className="text-xl text-center text-gray-800 font-thin">
                        {type === "user" ? "Administrator Sign In" : "Customer Sign In"}
                    </h2>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        Site Administrator Sign in Form
                    </p>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                   <LoginForm type={type} />
                </div>
            </div>
        </div>
    );
}

export default Login;
