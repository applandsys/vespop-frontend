"use client";

import React from 'react';
import Footer from "@/components/user/Footer";
import UserHeader from "@/components/layouts/UserHeader";
import { ReduxProvider } from '@/providers/ReduxProvider';
import TeamSection from "@/components/ecommerce-front/static/TeamSection";
import AboutBdhoms from "@/components/ecommerce-front/static/AboutBdhoms";

const AboutPage = () => {
    return (
        <ReduxProvider>
            <main className="min-h-screen bg-gray-50">
                <UserHeader/>
                <AboutBdhoms/>
                <TeamSection/>
                <Footer/>
            </main>
        </ReduxProvider>
    );
};

export default AboutPage;