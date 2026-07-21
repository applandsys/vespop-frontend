import React from 'react';

const TableData = ({children,columns}) => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        {columns.length > 0 && columns.map((column,index) => (
                            <th className={`px-4 py-2 border-b ${column.classes}`} key={index}>{column.value}</th>
                            )
                        )}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableData;