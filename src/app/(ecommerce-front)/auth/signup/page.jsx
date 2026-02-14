'use client';

import React from 'react';
import SignupForm from "@/components/auth/SignupForm";
import { useSearchParams  } from 'next/navigation';

function SignupPage() {
    const searchParams = useSearchParams();
    const sponsorId = searchParams.get('sponsorid');
    const side = searchParams.get('side');
    return (
        <div>
            <SignupForm sponsorId={sponsorId} side={side} />
        </div>
    );
}

export default SignupPage;