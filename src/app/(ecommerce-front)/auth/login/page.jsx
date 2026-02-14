import React from 'react';
import Login from "@/components/auth/Login";

export default  function LoginPage(props) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md   ">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Sign in</h2>
                <Login type="customer" />
            </div>
        </div>
    );
}
