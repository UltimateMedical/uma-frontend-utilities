import { QueryStringObject  } from './contracts';

class QueryStringParser {

  private queryString:string
  private queryObjects:Array<QueryStringObject>

  public constructor(queryString:string) {
    this.queryString = queryString;
    this.queryObjects = QueryStringParser.getQueryObject(this.queryString);
  }

  public all() {
    return this.queryObjects;
  }

  public get(key:string) {
    let result = this.queryObjects.filter(queryObject => {
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

  public static getQueryObject(queryString:string): Array<QueryStringObject> {

    let arrayOfParamStrings:Array<string> = [],
        arrayOfParamObjects:Array<QueryStringObject> = [];

    if(queryString.charAt(0) === '?') {
      queryString = queryString.substr(1);
    }

    arrayOfParamStrings = queryString.split('&').filter(paramString => paramString.length > 0);
    arrayOfParamObjects = arrayOfParamStrings.map(paramString => {

      let paramStrings:Array<string> = [],
      paramObject:{key:string, value:string} = { key:'', value:'' };

      paramStrings = paramString.split('=');
      paramObject.key = paramStrings[0];
      paramObject.value = paramStrings[1] || '';
      return paramObject;
    });

    return arrayOfParamObjects;
  }

}

export default QueryStringParser;