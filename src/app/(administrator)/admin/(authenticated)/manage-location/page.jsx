"use client";

import React, {useEffect, useState} from 'react';
import LocationAddEditForm from "@/components/admin/ecommerce/LocationAddEditForm";
import {fetchAllocations, fetchAllocationsByParentId, fetchPrimaryLocations} from "@/services/ecommerce/fetchLocations";
import ProductLocationList from "@/components/ecommerce/admin/product/ProductLocationList";

const ManageLocation = () => {

    const [allLocations, setAllLocations] = useState([]);

    useEffect(() => {
        fetchAllocations().then(res=>{setAllLocations(res)});
    }, []);

    const getAllLocation = () =>{
        fetchAllocations().then(res=>{setAllLocations(res)});
    }

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-3 gap-2 px-2">
                    <div className="col-span-1">
                        <LocationAddEditForm locations={allLocations} getAllLocation={getAllLocation}/>
                    </div>

                    <div className="col-span-2">
                        <ProductLocationList locations={allLocations}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageLocation;
