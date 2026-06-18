// pour petits montants affichage complet, pour les gros montants, affichage compact.
export const formatSalary = (salary) => {
    if (!salary) return '$0'

    if (salary >= 1_000_000) {
        return `$${(salary / 1_000_000).toFixed(1)}M`
    }

    if (salary >= 100_000) {
        return `$${(salary / 1_000).toFixed(0)}K`
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(salary)
}

// mettre la 1ère lettre en capitale
export const capitalizeFirst = (text) => {
    if (!text) return ""
    //suppr les espaces avant le text
    const trimmed = text.trim()
    return trimmed[0].toUpperCase() + trimmed.slice(1)
}