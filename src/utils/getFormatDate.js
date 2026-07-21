export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2); // Get last two digits
    return `${day}-${month}-${year}`;
}