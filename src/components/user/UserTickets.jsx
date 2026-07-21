"use client";

import React from "react";


export default function UserTickets({ supportTickets, openModal }) {
    return (
        <div className="p-2 max-w-6xl mx-auto">
            {/* Button aligned right */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={openModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow"
                >
                    + New Ticket
                </button>
            </div>

            {/* Ticket List */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Created At
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {supportTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-700">{ticket.id}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{ticket.subject}</td>
                            <td className="px-6 py-4">
                  <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "Open"
                              ? "bg-green-100 text-green-700"
                              : ticket.status === "In Progress"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {ticket.status}
                  </span>
                            </td>
                            <td className="px-6 py-4">
                  <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : ticket.priority === "Medium"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {ticket.priority}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{ticket.createdAt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
