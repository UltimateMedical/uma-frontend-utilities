interface Footnote {
    id: number;
    text?: string;
    globalKey?: string;
}
export declare class Footnotes {
    footnotes: Array<Footnote>;
    globalFootnotesStorage: object;
    constructor();
    count(): number;
    add(footnoteText: string): void;
    setGlobalFootnotes(globalFootnotes: Array<{
        key: string;
        text: string;
    }>): void;
    addGlobal(key: string): void;
    getFootnotes(): Footnote[];
}
export {};
