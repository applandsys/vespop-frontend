export  function calculatePercentage(part, total) {
    if (total === 0) return 0; // prevent division by zero
    return (part / total) * 100;
}


