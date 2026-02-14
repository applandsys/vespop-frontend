"use client";

import React, {useEffect, useState} from "react";
import { GetCustomerData } from "@/services/ecommerce/GetReduxData";
import CommonCard from "@/components/ui/CommonCard";
import UserTickets from "@/components/user/UserTickets";
import { TextField } from "@mui/material";
import config from "@/config";
import {getUserSupportTickets} from "@/services/user/getUserSupportTickets";

export default function UserSupport() {
    const { token, customer } = GetCustomerData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [supportTickets, setSupportTickets] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [error, setError] = useState(null);

    const [formSubmitData,setFormSubmitData] = useState({
        subject: "",
        message: "",
    });

    useEffect(() => {
        getUserSupportTickets(token).then(res=>{setSupportTickets(res)});
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormSubmitData((prev) =>({...prev,[name]:value}));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.apiBaseUrl}/customer/support `, {
                method:  'POST',
                body: JSON.stringify({...formSubmitData}),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to add or update location');
            }
            alert("Support Ticket Submitted ");

        } catch (err) {
            setError('Error adding location: ' + err.message);
            console.log(`Error adding location: ${err}`);
        } finally {
         //   setSubmitting(false);
        }
    };

    return (
        <div className="mx-4">

            <CommonCard title="Customer Support">
                <div className="w-full">
                    <UserTickets openModal={openModal} supportTickets={supportTickets} />
                </div>
            </CommonCard>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            ✖
                        </button>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Create New Ticket
                        </h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    placeholder="Subject"
                                    value={formSubmitData.subject}
                                    onChange={(e) => setFormSubmitData((prev)=>({...prev,subject: e.target.value}))}
                                    required label="Subject" variant="outlined" size="small"  fullWidth/>
                            </div>

                            <div>
                                <select   name="priority" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 onChange={(e)=>handleChange(e)}>
                                    <option value="all">All Categories</option>
                                    {
                                        ['Low','Medium','High'].map((priority, index) => (
                                            <option value={priority}  key={index}>{priority}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Describe your issue"
                                    value={formSubmitData.message}
                                    onChange={(e) => setFormSubmitData((prev)=>({...prev,message: e.target.value}))} // Handle email input change
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
