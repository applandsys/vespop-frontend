"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearLoginData } from "@/redux/store/slices/authSlice";

export function useAuth() {
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = () => {
        // Remove token from localStorage // Browser
        localStorage.removeItem("token");

        // Clear redux store
        dispatch(clearLoginData());

        // Redirect to homepage
        router.replace("/");
        // If you want hard reload to reset all states:
        // window.location.href = "/";
    };

    return { logout };
}
