"use client";

import React from 'react';
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";
import CommonCard from "@/components/ui/CommonCard";
import UserProfileForm from "@/components/ecommerce/user/UserProfileForm";

function UserDashboard(props) {

    const { token, customer } = GetCustomerData();

    return (
        <>
            <div className="mx-4">
                <CommonCard title="Profile">
                    <div className="w-full ">
                        <UserProfileForm initialData={customer}/>
                    </div>
                </CommonCard>
            </div>
        </>
    );
}

export default UserDashboard;