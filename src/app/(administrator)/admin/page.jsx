import React from 'react';
import Login from "@/components/auth/Login";

const AdminLoginPage = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md   ">
                <Login type="user" />
            </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;