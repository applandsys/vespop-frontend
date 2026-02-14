"use client";

import React, {useEffect, useRef, useState} from 'react';
import config from "@/config";
import UiCard from "@/components/theme/common/UiCard";
import {TrashIcon} from "@heroicons/react/16/solid";
import {fetchPrimaryLocations} from "@/services/ecommerce/fetchLocations";


const LocationAddEditForm = ({ locations, locationId,getAllLocation }) => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const formInputs = {
        name: '',
        parentId: null,
    };
    const [formDataPrime, setFormDataPrime] = useState(formInputs);
    const [formDataCity, setFormDataCity] = useState(formInputs);
    const [formDataSubCity, setFormDataSubCity] = useState(formInputs);

    const resetForm = () => {
        setFormDataPrime(formInputs);
        setFormDataCity(formInputs);
        setFormDataSubCity(formInputs);
    };

    const handleChangePrime = (e) => {
        const { name, value } = e.target;
        setFormDataPrime({...formDataPrime,[name]:value});
    };

    const handleChangeCity = (e) => {
        const { name, value } = e.target;
        setFormDataCity({...formDataCity,[name]:value});
    };

    const handleChangeSubCity = (e) => {
        const { name, value } = e.target;
        setFormDataSubCity({...formDataSubCity,[name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const level = e.target.locationType.value;

        let formSubmitData =  { };

        if(level==="primary"){
            formSubmitData =  {...formDataPrime, level };
        }else if(level==="city"){
            formSubmitData =  {...formDataCity, level };
        }else if(level==="sub_city"){
            formSubmitData =  {...formDataSubCity, level };
        }

        setSubmitting(true);

        try {
            const response = await fetch(`${config.apiBaseUrl}/admin/setting/location/${locationId ? 'update/' + locationId : 'add'}`, {
                method: locationId ? 'PUT' : 'POST',
                body: JSON.stringify(formSubmitData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to add or update location');
            }
            alert("Location Added ");
            getAllLocation();
            resetForm();
        } catch (err) {
            setError('Error adding location: ' + err.message);
            console.log(`Error adding location: ${err}`);
        } finally {
            setSubmitting(false);
        }
    };


    if (loading) return <div className="p-4">Fetching Data ...</div>;
    if (error) return <div className="p-4 text-red-500">Error Happened contact Admin</div>;

    return (
            <div className="fw-full">
                <main className="bg-white ">
                    <UiCard>
                        <form onSubmit={handleSubmit} className=" mx-auto p-2   space-y-2">
                            <input type="hidden" value="primary" name="locationType" />
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Prime Location</label>
                        </div>

                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formDataPrime.name}
                                onChange={handleChangePrime}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            />
                        </div>

                        <div className="flex justify-end items-end space-y-8">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`py-3 text-sm px-4 rounded-lg transition ${
                                    submitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {submitting ? 'Submitting...' : locationId ? 'Update ' : 'Add '}
                            </button>
                        </div>
                        </form>
                    </UiCard>

                    <UiCard className="mt-4">
                        <form onSubmit={handleSubmit} className=" mx-auto p-2   space-y-2">
                            <input type="hidden" value="city" name="locationType" />
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">City </label>
                            <select
                                name="parentId"
                                value={formDataCity.parentId}
                                onChange={handleChangeCity}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option  value="">
                                    Select Prime Location
                                </option>
                                {Array.isArray(locations) && locations.length && locations.filter(loc=>loc.level==='primary').map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formDataCity.name}
                                onChange={handleChangeCity}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            />
                        </div>

                        <div className="flex justify-end items-end space-y-8">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`py-3 text-sm px-4 rounded-lg transition ${
                                    submitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {submitting ? 'Submitting...' : locationId ? 'Update ' : 'Add'}
                            </button>
                        </div>
                        </form>
                    </UiCard>

                    <UiCard className="mt-4">
                        <form onSubmit={handleSubmit} className=" mx-auto p-2   space-y-2">
                            <input type="hidden" value="sub_city" name="locationType" />
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Sub City </label>
                            <select
                                name="parentId"
                                value={formDataSubCity.parentId}
                                onChange={handleChangeSubCity}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option  value="">
                                    Select City
                                </option>
                                {Array.isArray(locations) && locations.length && locations.filter(loc=>loc.level==='city').map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub City Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formDataSubCity.name}
                                onChange={handleChangeSubCity}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            />
                        </div>

                        <div className="flex justify-end items-end space-y-8">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`py-3 text-sm px-4 rounded-lg transition ${
                                    submitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {submitting ? 'Submitting...' : locationId ? 'Update ' : 'Add '}
                            </button>
                        </div>
                        </form>
                    </UiCard>
                </main>
            </div>

    );
};

export default LocationAddEditForm;
