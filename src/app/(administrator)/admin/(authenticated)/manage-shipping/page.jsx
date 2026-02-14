import React from 'react';
import TableData from "@/components/ui/TableData";
import CommonCard from "@/components/ui/CommonCard";

const AdminDashboard = () => {
    const columns = [
        {
            id: 1,
            classes: '',
            value: 'ID'
        },
        {
            id: 2,
            classes: '',
            value: 'Name'
        },
        {
            id: 4,
            classes: '',
            value: 'Slug'
        },
        {
            id: 5,
            classes: '',
            value: 'Parent'
        },
        {
            id: 6,
            classes: 'text-right',
            value: 'Actions'
        }
    ];

    const locations = [
        {
            id: 1,
            name: 'Dhaka',
            slug: 'Dhaka',
            parent: ''
        },
        {
            id: 2,
            name: 'Chittagong',
            slug: 'Chittagong',
            parent: ''
        }
    ];
    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Customers</h2>
                        <div className="flex justify-between items-center">
                            <span className="text-3xl font-bold">3,782</span>
                            <span className="text-green-500">+11.01%</span>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Orders</h2>
                        <div className="flex justify-between items-center">
                            <span className="text-3xl font-bold">5,359</span>
                            <span className="text-red-500">-9.05%</span>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Monthly Target</h2>
                        <div className="flex justify-between items-center">
                            <span className="text-3xl font-bold">75.55%</span>
                            <span className="text-green-500">+10%</span>
                        </div>
                        <p className="mt-4 text-gray-500">
                            You earn $3,287 today, its higher than last month. Keep up your good work!
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6">
                <CommonCard title="Latest Order">
                    <TableData columns={columns} >
                        {locations.length && locations.map((location,index) => (
                                <>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{index+1}</td>
                                        <td className="px-4 py-2">{location.name}</td>
                                        <td className="px-4 py-2">{location.slug}</td>
                                        <td className="px-4 py-2">{location.parent}</td>
                                        <td className="px-4 py-2 text-right ">
                                            <button
                                                className="mx-1 px-2 py-1 text-xs text-white bg-blue-400 rounded hover:bg-blue-300">Edit
                                            </button>
                                            <button
                                                className="mx-1 px-2 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-300">Delete
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            )
                        )}
                    </TableData>
                </CommonCard>
            </div>
        </div>
    );
};

export default AdminDashboard;