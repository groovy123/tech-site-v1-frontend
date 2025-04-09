export class Content {
    constructor(
        public id: string, 
        public category: string, 
        public text: string,
        public created_at: string,
        public update_at: string,
        public update_no: string) {}
}

export type ContentJson = {
    id: string;
    category: string;
    text: string;
    created_at: string;
    update_at: string;
    update_no: string;
};

export function toContent(json: ContentJson): Content | null {
    if (json) {
        return new Content(json.id, json.category, json.text, json.created_at, json.update_at, json.update_no);
    }
    return null;
}