import React from 'react';
import CommonCard from "@/components/ui/CommonCard";
import TableData from "@/components/ui/TableData";

const ProductLocationList = ({locations}) => {
    const columns = [
        { id: 1, classes: '', value: 'ID' },
        { id: 2, classes: '', value: 'Name' },
        { id: 3, classes: '', value: 'Slug' },
        { id: 4, classes: '', value: 'Parent' },
        { id: 5, classes: 'text-right', value: 'Actions' },
    ];


    return (
        <>
            <CommonCard title="Prime Location" key={1}>
                <div className="overflow-x-auto">
                    <TableData columns={columns} >
                        {locations.length && locations.filter((loc=>loc.level==='primary')).map((location,index) => (
                            <tr className="hover:bg-gray-50" key={location.id}>
                                <td className="px-4 py-2">{index+1}</td>
                                <td className="px-4 py-2">{location.name}</td>
                                <td className="px-4 py-2">{location.slug}</td>
                                <td className="px-4 py-2">{location?.parent?.name || '-'}</td>
                                <td className="px-4 py-2 text-right">
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-blue-400 rounded hover:bg-blue-300">Edit</button>
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </TableData>
                </div>
            </CommonCard>
            <CommonCard title="City " key={2}>
                <div className="overflow-x-auto">
                    <TableData columns={columns} >
                        {locations.length && locations.filter((loc=>loc.level==='city')).map((location,index) => (
                            <tr className="hover:bg-gray-50" key={location.id}>
                                <td className="px-4 py-2">{index+1}</td>
                                <td className="px-4 py-2">{location.name}</td>
                                <td className="px-4 py-2">{location.slug}</td>
                                <td className="px-4 py-2">{location?.parent?.name || '-'}</td>
                                <td className="px-4 py-2 text-right">
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-blue-400 rounded hover:bg-blue-300">Edit</button>
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </TableData>
                </div>
            </CommonCard>
            <CommonCard title="Sub City " key={3}>
                <div className="overflow-x-auto">
                    <TableData columns={columns} >
                        {locations.length && locations.filter((loc=>loc.level==='sub_city')).map((location,index) => (
                            <tr className="hover:bg-gray-50" key={location.id}>
                                <td className="px-4 py-2">{index+1}</td>
                                <td className="px-4 py-2">{location.name}</td>
                                <td className="px-4 py-2">{location.slug}</td>
                                <td className="px-4 py-2">{location?.parent?.name || '-'}</td>
                                <td className="px-4 py-2 text-right">
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-blue-400 rounded hover:bg-blue-300">Edit</button>
                                    <button className="mx-1 px-2 py-1 text-xs text-white bg-red-400 rounded hover:bg-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </TableData>
                </div>
            </CommonCard>
        </>
    );
};

export default ProductLocationList;