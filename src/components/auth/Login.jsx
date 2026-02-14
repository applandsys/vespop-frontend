"use client";
import { useDispatch } from 'react-redux';
import React, {useRef, useState} from 'react';
import axios from "axios";
import {setLoginData} from "@/redux/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import config from "@/config";

function Login({type}) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.apiBaseUrl}/${type}/auth/login`, {
                email,
                password,
            });

            dispatch(setLoginData({
                token: response.data.token,
                customer: response.data.sanitizedCustomer,
            }));

            if(response.data.token){
                type==="user"? router.push('/admin/dashboard') : router.back();
            }

        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="LoginForm p-2">
           {type==='user' ? (    <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Admin Sign in</h2>) : ( <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Customer Sign in</h2>)}

            <div className="border border-gray-200 rounded-lg shadow-sm p-2.5">
                <p className="text-xs">
                    If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing & Shipping section.
                </p>
                <div className="mt-4">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                             role="alert">
                            <strong className="font-bold">  </strong>
                            <span className="block sm:inline"> {error} </span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20"><title>Close</title><path
                                    d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 101.414 1.414L10 10.828l2.934 2.934a1 1 0 001.414-1.414L11.414 8.586l2.934-2.934z"/></svg>
                              </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">

                    <form onSubmit={handleLogin}>
                        <div className="p-4 rounded-md w-full">
                            <input
                                type="email"
                                placeholder="Username Or Email"
                                className="w-full p-2 border rounded mb-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Handle email input change
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-2 border rounded mb-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Handle password input change
                                required
                            />
                            <div className="flex justify-between items-center text-sm mb-2">
                                <label>
                                    <input type="checkbox" className="mr-2" />Remember me
                                </label>
                                <a href="#" className="text-green-600">Forgot password?</a>
                            </div>
                            <div className="flex justify-between items-center text-sm mb-2 mt-4">
                                <div>
                                     Dont have an account ? <Link href="/auth/signup" className="text-green-600">Create</Link>
                                </div>
                                <div>
                                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Log In</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
