"use client";

import React, {useEffect, useState} from 'react';
import {getAllCourier} from "@/services/admin/Courer";
import CourierList from "@/components/admin/ecommerce/CourierList";
import CourierAddForm from "@/components/admin/ecommerce/CourierAddForm";


const ApiIntegrationCourier = () => {

    const [couriers, setCouriers] = useState([]);

    const fetchCourier =  () => {
        getAllCourier().then(res=>{setCouriers(res)});
    }

    useEffect(() => {
        fetchCourier();
    }, []);


    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-3 gap-2 px-2">
                    <div className="col-span-1">
                        <CourierAddForm fetchCourier={fetchCourier} />
                    </div>

                    <div className="col-span-2">
                        <CourierList couriers={couriers} fetchCourier={fetchCourier} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiIntegrationCourier;
