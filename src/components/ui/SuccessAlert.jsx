import React from "react";

export default function SuccessAlert({message}) {
    return(
        <p className="mb-3 rounded-md bg-green-50 px-3 py-2 text-green-700 text-sm">{message}</p>
    )
}