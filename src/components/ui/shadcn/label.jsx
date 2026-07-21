export function Label({ className = "", ...props }) {
    return (
        <label
            {...props}
            className={"text-sm font-medium " + className}
        />
    );
}