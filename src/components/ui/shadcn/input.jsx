export function Input({ className = "", ...props }) {
    return (
        <input
            {...props}
            className={
                "w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black " +
                className
            }
        />
    );
}