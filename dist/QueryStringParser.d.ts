import { QueryStringObject } from './contracts';
declare class QueryStringParser {
    static getQueryObject(queryString: string): Array<QueryStringObject>;
}
export default QueryStringParser;
