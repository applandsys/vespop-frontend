"use client";

import React from 'react';
import Footer from "@/components/theme/Footer";
import Header from "@/components/layouts/Header";
import { ReduxProvider } from '@/providers/ReduxProvider';
import TeamSection from "@/components/static/TeamSection";
import AboutBdhoms from "@/components/static/AboutBdhoms";

const AboutPage = () => {
    return (
        <ReduxProvider>
            <main className="min-h-screen bg-gray-50">
                <Header/>
                <AboutBdhoms/>
                <TeamSection/>
                <Footer/>
            </main>
        </ReduxProvider>
    );
};

export default AboutPage;