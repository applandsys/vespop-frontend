export function Card({ className = "", ...props }) {
    return (
        <div
            {...props}
            className={
                "rounded-2xl border bg-white shadow-sm " +
                className
            }
        />
    );
}

export function CardHeader({ className = "", ...props }) {
    return (
        <div
            {...props}
            className={"border-b p-4 " + className}
        />
    );
}

export function CardTitle({ className = "", ...props }) {
    return (
        <h3
            {...props}
            className={"text-lg font-semibold " + className}
        />
    );
}

export function CardContent({ className = "", ...props }) {
    return (
        <div {...props} className={"p-4 " + className} />
    );
}