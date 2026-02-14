"use client";

import React from 'react';
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";

const ProfileCard = () => {

    const { token, customer } = GetCustomerData();


    return (
        <>
            <div className="max-w-xs rounded-lg shadow-lg bg-white p-4">
                <div className="flex justify-center mb-4">
                    <div
                        className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
                        <span className="text-center">A</span>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-center">{`${customer?.first_name} ${customer?.last_name!=null ? customer?.last_name : '' }` }  </h2>
                <p className="text-sm text-center text-gray-500">Distributor (BANGLADESH)</p>
                <p className="text-lg text-center font-bold mt-2 text-gray-600">{customer?.uid}</p>
                <p className="text-sm text-center text-gray-500">{customer?.phone}</p>
                <p className="text-sm text-center text-gray-500 mt-2">
                    <a href={`mailto:${customer?.phone}`}
                       className="text-blue-500 hover:underline">{customer?.email}</a>
                </p>
            </div>
        </>
    );
};

export default ProfileCard;