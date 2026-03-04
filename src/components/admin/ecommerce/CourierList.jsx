'use client'

import React from 'react';
import CommonCard from "@/components/ui/CommonCard";
import TableData from "@/components/ui/TableData";
import { useRouter } from 'next/navigation'
import {toast} from "react-toastify";

const CourierList = ({couriers = [],fetchCourier}) => {

    const router = useRouter();

    const columns = [{
        id: 1,
        classes: '',
        value: 'ID'
    }, {
        id: 2,
        classes: '',
        value: 'Name'
    },  {
        id: 8,
        classes: '',
        value: 'Is Active'
    }, {
        id: 9,
        classes: 'text-right',
        value: 'Actions'
    }, ];


    const handleEdit = (courierId) => {
        router.push(`/admin/api-integration/courier/${courierId}`);
    };

    const handleDelete = async (courierId) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this courier?");
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/admin/api-integration/courier/${courierId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success("Courier deleted successfully");
                    fetchCourier();
                } else {
                    toast.error("Error deleting banner");
                }
            } catch (error) {
                console.error("Error deleting banner", error);
                toast.error("Error deleting banner");
            }
        }
    };

    return (
        <>
            <CommonCard title="Courier List">
                <div className="overflow-x-auto">
                    <TableData columns={columns}>
                        {couriers.length > 0 && couriers.map((courier, index) => (
                            <tr className="hover:bg-gray-50" key={courier.id}>
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{courier.name}</td>
                                <td className="px-4 py-2">{courier.is_active ? 'Active' : 'Inactive'}</td>
                                <td className="px-4 py-2 text-right">
                                    <button onClick={() => handleEdit(courier.id)} className="mx-1 px-2 py-1 text-xs text-white bg-blue-400 rounded hover:bg-blue-300">Edit</button>
                                    <button onClick={() => handleDelete(courier.id)} className="mx-1 px-2 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </TableData>
                </div>
            </CommonCard>
        </>
    );

};

export default CourierList;