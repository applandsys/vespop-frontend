import config from "@/config";

export const fetchSupplierDue = async () => {
    const res = await fetch(
        `${config.apiBaseUrl}/supplier/payment/due`,{
            cache: "no-store",
        }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
};

export const fetchSupplierPaid = async () => {
    const res = await fetch(
        `${config.apiBaseUrl}/supplier/payment/paid`,{
            cache: "no-store",
        }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
};



