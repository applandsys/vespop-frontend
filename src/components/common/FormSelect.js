"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select";
import { Label } from "@/components/ui/shadcn/label";

export default function FormSelect({
                                       label,
                                       placeholder = "Select option",
                                       value = "",
                                       options = [],
                                       onChange,
                                       disabled = false,
                                   }) {
    return (
        <div className="space-y-1">
            {label && <Label>{label}</Label>}

            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {options.length === 0 && (
                        <SelectItem value="__empty" disabled>
                            No options
                        </SelectItem>
                    )}

                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={String(option.value)}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}