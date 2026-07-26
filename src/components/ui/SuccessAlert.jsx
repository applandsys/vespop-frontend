import React from "react";

export default function SuccessAlert({message}) {
    return(
        <p className="mb-3 rounded-md bg-gray-50 px-3 py-2 text-black text-sm">{message}</p>
    )
}