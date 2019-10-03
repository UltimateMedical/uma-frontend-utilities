interface ShortcodeParserExtension {
    parse(content: string, shortcodeObject: object, match: string, originalMatch: string): string;
}
export declare class ShortcodeParser {
    extensions: Array<ShortcodeParserExtension>;
    constructor();
    parse(content: string): string;
    extend(extension: ShortcodeParserExtension): void;
}
export {};
