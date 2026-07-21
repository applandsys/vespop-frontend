"use client";

import * as React from "react";

const SelectContext = React.createContext();

export function Select({ value, onValueChange, children }) {
    const [open, setOpen] = React.useState(false);

    return (
        <SelectContext.Provider
            value={{ value, onValueChange, open, setOpen }}
        >
            <div className="relative w-full">{children}</div>
        </SelectContext.Provider>
    );
}

export function SelectTrigger({ children }) {
    const { setOpen, open } = React.useContext(SelectContext);

    return (
        <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm bg-white"
        >
            {children}
        </button>
    );
}

export function SelectValue({ placeholder }) {
    const { value } = React.useContext(SelectContext);

    return <span>{value || placeholder}</span>;
}

export function SelectContent({ children }) {
    const { open } = React.useContext(SelectContext);

    if (!open) return null;

    return (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
            {children}
        </div>
    );
}

export function SelectItem({ value, children }) {
    const { onValueChange, setOpen } = React.useContext(SelectContext);

    return (
        <div
            onClick={() => {
                onValueChange(value);
                setOpen(false);
            }}
            className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
        >
            {children}
        </div>
    );
}