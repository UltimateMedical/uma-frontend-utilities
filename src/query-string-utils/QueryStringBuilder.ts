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

    this.configs.forEach(config => {
      let queryObject = this.createQueryObject(config);
      if(queryObject) {
        this.queryObjects.push(queryObject);
      }
    });

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

    let excludeIfFalsyValue = { primary: true, default: false };
    if(typeof config.excludeIfFalsyValue === 'boolean') {
      excludeIfFalsyValue.primary = config.excludeIfFalsyValue;
      excludeIfFalsyValue.default = config.excludeIfFalsyValue;
    }
    else {
      excludeIfFalsyValue = Object.assign(excludeIfFalsyValue, config.excludeIfFalsyValue);
    }

    let regex = config.queryStringOverrideSearch || null,
				paramName = config.key,
        primaryValue = config.primaryValue,
        defaultValue = config.defaultValue,
				urlOverride = false,
				param = {
					key: paramName.trim(),
          value: '',
        };

		if(regex) {
			this.overrideQueryObjects.forEach(queryObject => {

        // @ts-ignore 
        // `regex` is guaranteed not to be null at this
        // point. Not sure why TS is throwing an error here.
				if(queryObject.key.match(regex)) {
					param.value = queryObject.value;
					urlOverride = true;
				}
			});
    }

		if(!urlOverride) {
      if(excludeIfFalsyValue.primary && this.isFalsy(primaryValue)) {
        primaryValue = false;
      }
      else {
        primaryValue = typeof primaryValue !== 'undefined' ? String(primaryValue) : '';
        param.value = primaryValue.trim();
        primaryValue = true;
      }
		}

		if(!urlOverride && !primaryValue) {
      if(excludeIfFalsyValue.default && this.isFalsy(defaultValue)) {
        defaultValue = false;
      }
      else {
        defaultValue = typeof defaultValue !== 'undefined' ? String(defaultValue) : '';
        param.value = defaultValue.trim();
        defaultValue = true;
      }
		}

		if(urlOverride || primaryValue || defaultValue) {
			return param;
		}
		
		return null;
  }

  public isFalsy(value:string|number|boolean|undefined) {
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

export { QueryStringBuilder };