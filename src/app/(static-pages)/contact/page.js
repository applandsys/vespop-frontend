import React from 'react';
import Footer from "@/components/user/Footer";
import UserHeader from "@/components/layouts/UserHeader";
import { ReduxProvider } from '@/providers/ReduxProvider';
import ContactForm from "@/components/ecommerce-front/static/ContactForm";
import ContactHero from "@/components/ecommerce-front/static/ContactHero";


const ContactPage = () => {
    return (
        <ReduxProvider>
            <UserHeader />
            <ContactHero/>
            <ContactForm />
            <Footer />
        </ReduxProvider>
    );
};

export default ContactPage;