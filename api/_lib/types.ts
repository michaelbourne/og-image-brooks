export type FileType = 'png' | 'jpeg';
export type Layout = 'wine' | 'general' | 'collection';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    layout: string;
    image: string;
}
