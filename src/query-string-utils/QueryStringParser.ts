import { QueryStringObject  } from './contracts';

class QueryStringParser {

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