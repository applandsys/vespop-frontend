export function Table({ children }) {
    return <table className="w-full text-sm">{children}</table>;
}

export function TableHeader({ children }) {
    return <thead className="border-b">{children}</thead>;
}

export function TableBody({ children }) {
    return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
    return <tr className="border-b">{children}</tr>;
}

export function TableHead({ children }) {
    return <th className="px-3 py-2 text-left font-medium">{children}</th>;
}

export function TableCell({ children }) {
    return <td className="px-3 py-2">{children}</td>;
}