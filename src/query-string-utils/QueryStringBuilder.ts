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
			return acc + `${cur.key}=${cur.value}&`;
		}, '?');
    
    queryString = queryString.slice(0, -1);

		return queryString;
  }

  protected createQueryObject(config:QueryStringParamConfig) {

    let regex = config.overrideSearch || null,
				paramName = config.paramName,
				primaryValue = config.primaryValue || null,
				defaultValue = config.defaultValue || null,
				urlOverride = false,
				param:QueryStringObject = {
					key: paramName,
					value: ''
				};

		if(regex) {
			this.overrideQueryObjects.forEach(queryObject => {
				if(queryObject.key.match(regex)) {
					param.value = queryObject.value;
					urlOverride = true;
				}
			});
		}

		if(!urlOverride && primaryValue) {
			param.value = encodeURI(primaryValue);
		}

		else if(!urlOverride && !primaryValue && defaultValue) {
			param.value = defaultValue;
		}

		if(param.key && param.value) {
			return param;
		}
		
		return null;
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