import config from "@/config";

const API_BASE_URL = `${config.apiBaseUrl}/admin/currency`; // Assuming your backend currency routes are under /admin/currency

export const createCurrency = async (currencyData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currencyData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create currency');
    }
    return response.json();
};

export const getAllCurrencies = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch currencies');
    }
    return response.json();
};

export const updateCurrency = async (id, currencyData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currencyData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update currency');
    }
    return response.json();
};

export const deleteCurrency = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete currency');
    }
    return response.json();
};