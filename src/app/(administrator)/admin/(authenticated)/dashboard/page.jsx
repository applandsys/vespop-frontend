"use client"

import React, {useEffect} from 'react';
import TableData from "@/components/ui/TableData";
import CommonCard from "@/components/ui/CommonCard";
import {getAdminStats} from "@/services/admin/getStats";
import {CreditCardIcon, CurrencyDollarIcon, UserGroupIcon} from "@heroicons/react/16/solid";

const AdminDashboard = () => {

    const [adminStats, setAdminStats] = React.useState([]);

    useEffect(()=> {
        getAdminStats().then(res=>{
            setAdminStats(res)
        }).catch(err=>{
            console.log(err)
        })
    },[]);

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
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Total Customers</h2>
                        <div className="flex justify-between items-center">
                            <UserGroupIcon className="h-12 w-12"/>
                            <span className="text-3xl font-bold flex"> {adminStats.totalCustomer}</span>
                            {/*<span className="text-green-500">+11.01%</span>*/}
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Total Complete Orders</h2>
                        <div className="flex justify-between items-center">
                            <CreditCardIcon className="h-8 w-8"/>
                            <span className="text-3xl font-bold"> {adminStats.totalOrder} </span>
                            {/*<span className="text-red-500">-9.05%</span>*/}
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Amount</h2>
                        <div className="flex justify-between items-center">
                            <CurrencyDollarIcon className="h-8 w-8"/>
                            <span className="text-3xl font-bold">  {adminStats.totalOrderAmount} </span>
                            {/*<span className="text-green-500">+10%</span>*/}
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Today Customer</h2>
                        <div className="flex justify-between items-center">
                            <UserGroupIcon className="h-8 w-8"/>
                            <span className="text-3xl font-bold"> {adminStats.todayCustomer} </span>
                            {/*<span className="text-green-500">+10%</span>*/}
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Today All  Orders</h2>
                        <div className="flex justify-between items-center">
                            <CreditCardIcon className="h-8 w-8"/>
                            <span className="text-3xl font-bold"> {adminStats.getTodayOrder} </span>
                            {/*<span className="text-red-500">-9.05%</span>*/}
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Today Amount</h2>
                        <div className="flex justify-between items-center">
                            <CurrencyDollarIcon className="h-8 w-8"/>
                            <span className="text-3xl font-bold">  {adminStats.todayOrderAmount} </span>
                            {/*<span className="text-red-500">-9.05%</span>*/}
                        </div>
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