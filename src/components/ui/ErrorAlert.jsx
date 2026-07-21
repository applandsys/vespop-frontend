import React from "react";

export default function ErrorAlert({error}) {
    return (
        <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-red-700 text-sm">{error}</p>
    )
}