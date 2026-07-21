import { cn } from "@/lib/utils";

export function Button({ className = "", variant = "default", size = "default", ...props }) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
        default: "bg-black text-white hover:bg-black/90",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "underline-offset-4 hover:underline text-black",
    };

    const sizes = {
        default: "h-10 px-4 py-2 rounded-xl text-sm",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-8 text-sm",
        icon: "h-10 w-10 rounded-xl",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        />
    );
}