import React from 'react';
import Footer from "@/components/theme/Footer";
import Header from "@/components/layouts/Header";
import { ReduxProvider } from '@/providers/ReduxProvider';
import ContactForm from "@/components/static/ContactForm";
import ContactHero from "@/components/static/ContactHero";


const ContactPage = () => {
    return (
        <ReduxProvider>
            <Header />
            <ContactHero/>
            <ContactForm />
            <Footer />
        </ReduxProvider>
    );
};

export default ContactPage;