import QueryStringParser from './QueryStringParser';
import { QueryStringObject, QueryStringParamConfig } from './contracts';

class QueryStringBuilder {

  private queryObjects:Array<QueryStringObject>;
  private builtQueryString:string;
  private configs:Array<QueryStringParamConfig>;
  private overrideQueryString:string;
  private overrideQueryObjects:Array<QueryStringObject>;

  public constructor() {
    this.queryObjects = [];
    this.builtQueryString = '';
    this.configs = [];
    this.overrideQueryString = ''
    this.overrideQueryObjects = [];
  }

  public withConfig(configs:Array<QueryStringParamConfig>) {
    this.configs = configs;
    return this;
  }

  public withOverrides(overrideQueryString:string) {
    this.overrideQueryString = overrideQueryString;
    this.overrideQueryObjects = QueryStringParser.getQueryObject(overrideQueryString);
    return this;
  }

  public getString() {
    return this.builtQueryString;
  }

  public getObjects() {
    return this.queryObjects;
  }

  public build() {

    this.queryObjects = this.configs.map(config => {
      return this.createQueryObject(config);
    }).filter(queryObject => queryObject);

    this.builtQueryString = this.createQueryString(this.queryObjects);

    return this;

  }

  protected createQueryString(queryObjects:Array<QueryStringObject>) {

    let queryString = '';
    
    queryString = queryObjects.reduce((acc, cur) => {
      if(!cur.value) {
        return acc + `${cur.key}&`;
      }
			return acc + `${cur.key}=${cur.value}&`;
		}, '?');
    
    queryString = queryString.slice(0, -1);

		return queryString;
  }

  protected createQueryObject(config:QueryStringParamConfig) {

    let omitKeyWithFalsyValue = { primary: true, default: false };
    if(typeof config.omitKeyWithFalsyValue === 'boolean') {
      omitKeyWithFalsyValue.primary = config.omitKeyWithFalsyValue;
      omitKeyWithFalsyValue.default = config.omitKeyWithFalsyValue;
    }
    else {
      omitKeyWithFalsyValue = Object.assign(omitKeyWithFalsyValue, config.omitKeyWithFalsyValue);
    }

    let regex = config.overrideSearch || null,
				paramName = config.paramName,
        primaryValue = config.primaryValue,
        defaultValue = config.defaultValue,
				urlOverride = false,
				param = {
					key: encodeURI(paramName.trim()),
          value: '',
        };

		if(regex) {
			this.overrideQueryObjects.forEach(queryObject => {
				if(queryObject.key.match(regex)) {
					param.value = queryObject.value;
					urlOverride = true;
				}
			});
    }

		if(!urlOverride) {
      if(omitKeyWithFalsyValue.primary && this.isFalsy(primaryValue)) {
        primaryValue = false;
      }
      else {
        primaryValue = typeof primaryValue !== 'undefined' ? String(primaryValue) : '';
        param.value = encodeURI(primaryValue.trim());
        primaryValue = true;
      }
		}

		if(!urlOverride && !primaryValue) {
      if(omitKeyWithFalsyValue.default && this.isFalsy(defaultValue)) {
        defaultValue = false;
      }
      else {
        defaultValue = typeof defaultValue !== 'undefined' ? String(defaultValue) : '';
        param.value = encodeURI(defaultValue.trim());
        defaultValue = true;
      }
		}

		if(urlOverride || primaryValue || defaultValue) {
			return param;
		}
		
		return null;
  }

  public isFalsy(value:string|number|boolean) {
    if(
      value === 'undefined' || value === null || 
      value === 0 || value === false || value === '' ||
      typeof value === 'undefined'
    ) {
      return true;
    }
    return false;
  }

}

class QueryStringifier {

  private queryObjects:Array<QueryStringObject>;
  private builtQueryString:string;
  private configs:Array<QueryStringParamConfig>;
  private overrideQueryString:string;
  private overrideQueryObjects:Array<QueryStringObject>;

  static createBuilder() {
    return new QueryStringBuilder();
  }

}

export { QueryStringBuilder, QueryStringifier };