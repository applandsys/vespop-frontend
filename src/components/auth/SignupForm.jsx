"use client";

import React, {useEffect, useState} from 'react';
import config from '@/config';
import Link from "next/link";
import {Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useRouter} from "next/navigation";

export default function SignupForm({sponsorId=null}) {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('customer'); // Default to customer
    const [securityCode, setSecurityCode] = useState('');
    const [customSponsorId, setCustomSponsorId] = useState('');
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 1000));

    const activeSponsorId = sponsorId || customSponsorId;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( parseInt(randomNumber) !== parseInt(securityCode)){
            alert(`Wrong security code ${randomNumber}  == ${securityCode}`);
            return;
        }

        const userData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            address,
            gender,
            phone,
            sponsorId:activeSponsorId,
            role,
            securityCode,
        };

        const response = await fetch(`${config.apiBaseUrl}/customer/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup successful!');
            router.push('/auth/login');
        } else {
            alert(data.message || 'Something went wrong');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Create an Account</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Already have an account?
                    <Link href="/auth/login" className="text-green-600 hover:underline">Log in instead!</Link>
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>

                    <TextField   placeholder="First Name"
                                 value={firstName}
                                 onChange={(e) => setFirstName(e.target.value)}
                                 required label="First Name" variant="outlined" size="small"  fullWidth/>

                    <TextField
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required label="Last Name" variant="outlined" size="small"  fullWidth/>

                    <TextField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required label="Email" variant="outlined" size="small"  fullWidth/>

                    <TextField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required label="Password" variant="outlined" size="small"  fullWidth/>

                    <TextField
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required label="Confirm password" variant="outlined" size="small"  fullWidth/>

                    <TextField
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required label="Address" variant="outlined" size="small"  fullWidth/>

                    <FormControl  size="small" fullWidth>
                        <InputLabel id="demo-select-small-label">Gender</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={gender}
                            label="Age"
                            onChange={(e)=>setGender(e.target.value)}
                            variant="outlined">
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required label="Phone" variant="outlined" size="small"  fullWidth/>

                    { sponsorId && (
                        <>
                            <TextField
                                placeholder="Sponsor Id"
                                value={sponsorId ?? customSponsorId}
                                onChange={(e) => setCustomSponsorId(e.target.value)}
                                required
                                label="Sponsor"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </>
                    )}

                    <div className="flex items-center gap-3">
                        <TextField
                            placeholder="Security code *"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            required label="Security code *" variant="outlined" size="small"  fullWidth/>
                        <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded">{randomNumber}</div>
                    </div>

                    <div className="flex items-center mt-4 space-x-2 text-sm">
                        <Checkbox  defaultChecked />
                        <label>
                            I agree to terms & Policy.{' '}
                            <a href="#" className="text-green-600 hover:underline">Learn more</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded mt-4"
                    >
                        Submit & Register
                    </button>

                    <p className="text-xs text-gray-500 mt-4">
                        Note: Your personal data will be used to support your experience throughout this
                        website, to manage access to your account, and for other purposes described in our{' '}
                        <a href="#" className="underline">privacy policy</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}
