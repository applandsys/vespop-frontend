import React from 'react';
import Login from "@/components/auth/Login";

export default  function LoginPage(props) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md   ">
                <Login type="customer" />
            </div>
        </div>
    );
}
