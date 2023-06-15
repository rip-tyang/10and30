export function monthStr(date: Date = new Date()): string {
    return date.toISOString().substring(0, 7); // YYYY-MM
}

export function dateStr(date: Date = new Date()): string {
    return date.toISOString().substring(0, 10); // YYYY-MM-DD
}