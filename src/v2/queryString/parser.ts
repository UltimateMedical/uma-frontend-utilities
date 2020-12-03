import { KeyValueSchema, ParamSchema } from "../schemas";


/**
 * QueryStringParser
 * 
 * @since 1.1.0
 */
export default class QueryStringParser {


  /**
   * queryString
   * 
   * @property
   */
  private queryString: string;

  
  /**
   * keyValuePairs
   * 
   * @property
   */
  private keyValuePairs: KeyValueSchema[];


  /**
   * constructor()
   * 
   * @constructor
   */
  public constructor(queryString: string) {
    this.queryString = queryString;
    this.keyValuePairs = QueryStringParser.GetKVPairs(this.queryString);
  }


  /**
   * all()
   * 
   * Get all the components of the given query string represented as an array
   * of key/value pairs.
   * 
   * @method
   */
  public all(): KeyValueSchema[] {
    return this.keyValuePairs;
  }


  /**
   * get()
   * 
   * Get a value within the query string by its key. If the value doesn't exist, return undefined.
   * 
   * @method
   * @param {string} key - The key of the desired value. If the key does not exist in the query string,
   *                       return undefined.
   * @param {string} fallback - Optional argument. Specify a fallback value if the key isn't fount in the query string.
   */
  public get(key: string, fallback?:any): any {

    let result = this.keyValuePairs.filter(queryObject => {
      return queryObject.key === key;
    });

    if(result.length > 0) {
      let lastItem = result.pop();
      if(lastItem) {
        return lastItem.value;
      }
    }

    if(arguments.length > 1) {
      return fallback;
    }

    return undefined;
  }


  /**
   * GetKVPairs()
   * 
   * Break a query string down into an array of key/value pairs.
   * 
   * @method
   */
  public static GetKVPairs(queryString: string): KeyValueSchema[] {

    let arrayOfParamStrings: string[] = [],
        arrayOfParamObjects: KeyValueSchema[] = [];

    // remove the beginning "?" if it's there
    if(queryString.charAt(0) === '?') {
      queryString = queryString.substr(1);
    }

    arrayOfParamStrings = queryString.split('&').filter(paramString => paramString.length > 0);

    arrayOfParamObjects = arrayOfParamStrings.map(paramString => {

      let paramStrings: string[] = [],
          paramObject:  KeyValueSchema = { key:'', value:'' };

      paramStrings = paramString.split('=');
      paramObject.key = paramStrings[0];
      paramObject.value = paramStrings[1] || undefined;
      return paramObject;
    });

    return arrayOfParamObjects;
  }


  /**
   * saveToLocalStorage()
   * 
   * Save parameters passed through the query string in local storage
   * as designated by the given parameter configuration.
   * 
   */
  public saveToLocalStorage(
    saveAs: string, expires: Date, paramConfig: ParamSchema[], alwaysOverwrite: boolean = false
  ) {

    if(typeof window === "undefined" && typeof localStorage === "undefined") {
      return;
    }

    const paramsToSave: KeyValueSchema[] = [];

    for(var i = 0; i < paramConfig.length; i++) {
      const paramSpec = paramConfig[i];
      if(!paramSpec.override) continue;
      for(var j = 0; j < this.keyValuePairs.length; j++) {
        if(this.keyValuePairs[j].key.match(paramSpec.override)) {
          paramsToSave.push({
            key: this.keyValuePairs[j].key,
            value: this.keyValuePairs[j].value
          })
        }
      }
    }

    if(alwaysOverwrite || !alwaysOverwrite && paramsToSave.length > 0) {
      localStorage.setItem(saveAs, JSON.stringify({
        expires: expires,
        pairs: paramsToSave
      }));
    }

  }

}