import React from 'react';
import CommonCard from "@/components/ui/CommonCard";
import TableData from "@/components/ui/TableData";

const ProductAttributeList = ({attributes}) => {

    const columns = [
        { id: 1, classes: '', value: 'ID' },
        { id: 2, classes: '', value: 'Attribute' },
        { id: 3, classes: '', value: 'Name' },
        { id: 4, classes: '', value: 'Code' },
        { id: 5, classes: 'text-right', value: 'Actions' },
    ];


    return (
        <>
            <CommonCard title="Product Attributes" key={1}>
                <div className="overflow-x-auto">
                    <TableData columns={columns} >
                        {attributes.length && attributes.map((attr,index) => (
                            <tr className="hover:bg-gray-50" key={attr.id}>
                                <td className="px-4 py-2">{index+1}</td>
                                <td className="px-4 py-2">{attr.attribute.name}</td>
                                <td className="px-4 py-2">{attr.value}</td>
                                <td className="px-4 py-2">{attr.attribute.name==="Color" ?
                                    (<div
                                        className="w-5 h-5 border border-amber-500 rounded  transition"
                                        style={{ backgroundColor: attr.codeNumber }}
                                    ></div>):attr.codeNumber}</td>
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

export default ProductAttributeList;