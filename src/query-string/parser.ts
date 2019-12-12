import KeyValueInterface from '../interfaces/keyValueInterface';

/**
 * QueryStringParser
 * 
 * @since 0.0.1
 */
export default class QueryStringParser {

  /**
   * queryString
   * 
   * @property {string} queryString - The query string to be parsed
   */
  private queryString:string;

  
  /**
   * keyValuePairs
   * 
   * @property {KeyValueInterface[]} keyValuePairs - The parsed query
   * string represented as an array of key/value pairs.
   */
  private keyValuePairs:Array<KeyValueInterface>;


  /**
   * constructor()
   * 
   * @constructor
   * @param {string} queryString - The query string to be parsed.
   */
  public constructor(queryString:string) {
    this.queryString = queryString;
    this.keyValuePairs = QueryStringParser.parse(this.queryString);
  }


  /**
   * all()
   * 
   * Get all the components of the given query string represented as an array
   * of key/value pairs.
   * 
   * @method
   * @param {void}
   * @returns {KeyValueInterface[]} - The parsed query string represented
   * as an array of key/value pairs.
   */
  public all():Array<KeyValueInterface> {
    return this.keyValuePairs;
  }


  /**
   * get()
   * 
   * Get a value within the query string by its key.
   * 
   * @method
   * @param {string|null} key - The key of the desired value. If the key does not
   * exist in the query string, return null.
   * @returns {KeyValueInterface[]} - The parsed query string represented
   * as an array of key/value pairs.
   */
  public get(key:string):string|null {
    let result = this.keyValuePairs.filter(queryObject => {
      return queryObject.key === key;
    });
    if(result.length > 0) {
      let lastItem = result.pop();
      if(lastItem) {
        return lastItem.value;
      }
    }
    return null;
  }


  /**
   * parse()
   * 
   * Break a query string down into an array of key/value pairs.
   * 
   * @method
   * @param {string} queryString - The query string to be parsed.
   * @returns {KeyValueInterface[]} - The parsed query string represented
   * as an array of key/value pairs.
   */
  public static parse(queryString:string):Array<KeyValueInterface> {

    let arrayOfParamStrings:Array<string> = [],
        arrayOfParamObjects:Array<KeyValueInterface> = [];

    if(queryString.charAt(0) === '?') {
      queryString = queryString.substr(1);
    }

    arrayOfParamStrings = queryString.split('&').filter(paramString => paramString.length > 0);
    arrayOfParamObjects = arrayOfParamStrings.map(paramString => {

      let paramStrings:Array<string> = [],
      paramObject:KeyValueInterface = { key:'', value:'' };

      paramStrings = paramString.split('=');
      paramObject.key = paramStrings[0];
      paramObject.value = paramStrings[1] || '';
      return paramObject;
    });

    return arrayOfParamObjects;
  }

}