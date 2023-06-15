export interface PrimaryKey {
    user_id: string,
    month: string,
}

export interface Highlight {
    date?: string,
    highlight: string,
}

export interface UserData {
    user_id: string,
    month: string,
    highlights: Array<Highlight>,
};

export function makeEmptyHighlights(key: PrimaryKey): UserData {
    return {
        user_id: key.user_id,
        month: key.month,
        highlights: [],
    };
}