import { APIClass } from "aws-amplify";

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

export function isUserDataEmpty(userdata: UserData): boolean {
    return Object.keys(userdata).length === 0;
}

export async function getHighlightOrDefault(API: APIClass, key: PrimaryKey): Promise<UserData> {
    const items = await API.get('api10and30', `/user/object/${key.user_id}/${key.month}`, {}) as UserData;

    if (isUserDataEmpty(items)) {
        const emptyHighlight = {
            user_id: key.user_id,
            month: key.month,
            highlights: [],
        };

        await API.put('api10and30', '/user', {
            body: emptyHighlight,
        });
        return emptyHighlight;
    };

    return items;
}