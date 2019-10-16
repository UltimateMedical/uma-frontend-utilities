import { QueryStringObject, QueryStringParamConfig } from './contracts';
declare class QueryStringBuilder {
    private queryObjects;
    private builtQueryString;
    private configs;
    private overrideQueryString;
    private overrideQueryObjects;
    constructor();
    withConfig(configs: Array<QueryStringParamConfig>): this;
    withOverrides(overrideQueryString: string): this;
    getString(): string;
    getObjects(): QueryStringObject[];
    build(): this;
    protected createQueryString(queryObjects: Array<QueryStringObject>): string;
    protected createQueryObject(config: QueryStringParamConfig): {
        key: string;
        value: string;
    };
    isFalsy(value: string | number | boolean): boolean;
}
declare class QueryStringifier {
    private queryObjects;
    private builtQueryString;
    private configs;
    private overrideQueryString;
    private overrideQueryObjects;
    static createBuilder(): QueryStringBuilder;
}
export { QueryStringBuilder, QueryStringifier };
