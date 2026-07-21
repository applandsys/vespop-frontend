"use client";

import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { html } from "gridjs";

const SupplierDue = ({ dues = [] }) => {
    return (
        <div className="p-2">
            <h3 className="text-xl font-bold">Supplier Due List</h3>
            <hr className="mb-3" />

            <Grid
                data={dues.map(item => [
                    item.id,
                    item.supplierId,
                    item.amount,
                    item.type,
                    item.typeSourceId ?? "-",
                    item.status,
                    item.method ?? "-",
                    item.particular ?? "-",
                    new Date(item.createdAt).toLocaleString(),
                    html(`
                        <button
                            class="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 delete-btn"
                            data-id="${item.id}"
                        >
                            Delete
                        </button>
                    `)
                ])}
                columns={[
                    { name: "ID", width: "60px" },
                    { name: "Supplier ID", width: "90px" },
                    { name: "Amount", width: "90px" },
                    "Type",
                    "Source ID",
                    "Status",
                    "Method",
                    "Particular",
                    { name: "Created At", width: "160px" }
                ]}
                search={true}
                sort={true}
                pagination={{
                    enabled: true,
                    limit: 10
                }}
                className={{
                    table: "table-auto",
                    th: "text-sm text-left",
                    td: "text-sm"
                }}
                style={{
                    table: { width: "100%" }
                }}
            />
        </div>
    );
};

export default SupplierDue;