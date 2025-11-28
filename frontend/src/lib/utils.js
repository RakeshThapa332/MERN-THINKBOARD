export function formatDate(date){
    if (!date) return ''
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString("en-US", {
        month : "short",
        day : "numeric",
        year : "numeric"
    })
}