import QueryStringParser from './parser';
import isFalsy from '../common/functions/isFalsy';
import KeyValueInterface from '../common/interfaces/keyValueInterface';
import QueryStringParamConfigInterface from './queryStringParamConfigInterface';

/**
 * QueryStringBuilder
 * 
 * @since 0.0.1
 */
class QueryStringBuilder {


  /**
   * keyValuePairs
   * 
   * @property {KeyValueInterface[]} keyValuePairs - The built query string
   * represented as an array of key/value pairs.
   */
  private keyValuePairs:Array<KeyValueInterface>;


  /**
   * builtQueryString
   * 
   * @property {String} builtQueryString - The query string that's constructed
   * from the provided configuration.
   */
  private builtQueryString:string;


  /**
   * queryStringConfig
   * 
   * @property {QueryStringParamConfigInterface[]} queryStringConfig - An 
   * array of QueryStringParamConfig. These are the configuration options
   * used to built a query string.
   */
  private queryStringConfig:Array<QueryStringParamConfigInterface>;


  /**
   * overrideQueryString
   * 
   * @property {string} overrideQueryString - The query string whose values 
   * will take precedence over all others - i.e. values in here will end up
   * in the build query string if specified.
   */
  private overrideQueryString:string;


  /**
   * overrideKeyValuePairs
   * 
   * @property {KeyValueInterface[]} overrideKeyValuePairs - The override
   * query string represented as an array of key/value pairs.
   */
  private overrideKeyValuePairs:Array<KeyValueInterface>;


  /**
   * constructor()
   * 
   * @constructor
   * @param {QueryStringParamConfigInterface[]} queryStringConfig - The array
   * of configuration options needed to build a query string.
   */
  public constructor(queryStringConfig:Array<QueryStringParamConfigInterface>) {
    this.keyValuePairs = [];
    this.builtQueryString = '';
    this.queryStringConfig = queryStringConfig;
    this.overrideQueryString = ''
    this.overrideKeyValuePairs = [];
  }


  /**
   * withOverrides()
   * 
   * @method
   * @param {string} queryString - A query string
   * @return {QueryStringBuilder}
   */
  public withOverrides(overrideQueryString:string):QueryStringBuilder {
    this.overrideQueryString = overrideQueryString;
    this.overrideKeyValuePairs = QueryStringParser.parse(this.overrideQueryString);
    return this;
  }


  /**
   * getString()
   * 
   * Returns the query string that's built with the given configuration represented
   * as a string.
   * 
   * @method
   * @param {void}
   * @return {string}
   */
  public getString():string {
    return this.builtQueryString;
  }


  /**
   * getKeyValuePairs()
   * 
   * Returns the query string that's built with the given configuration represented
   * as an array of key/value pairs.
   * 
   * @method
   * @param {void}
   * @return {KeyValueInterface[]}
   */
  public getKeyValuePairs():Array<KeyValueInterface> {
    return this.keyValuePairs;
  }


  /**
   * build()
   * 
   * Builds the query string and key/value pairs using the given configuration.
   * 
   * @method
   * @param {void}
   * @return {KeyValueInterface[]}
   */
  public build():QueryStringBuilder {

    this.queryStringConfig.forEach(queryStringParamConfig => {
      let keyValuePair = this.createKeyValuePair(queryStringParamConfig);
      if(keyValuePair) {
        this.keyValuePairs.push(keyValuePair);
      }
    });

    this.builtQueryString = QueryStringBuilder.createQueryString(this.keyValuePairs);

    return this;

  }


  /**
   * createQueryString()
   * 
   * Builds a query string using an array of key/value pairs.
   * 
   * @method
   * @static
   * @param {KeyValueInterface[]} keyValuePairs
   * @return {string}
   */
  public static createQueryString(keyValuePairs:Array<KeyValueInterface>):string {

    let queryString = '';
    
    queryString = keyValuePairs.reduce((acc, cur) => {
      if(!cur.value) {
        return acc + `${cur.key}&`;
      }
			return acc + `${cur.key}=${cur.value}&`;
		}, '?');
    
    queryString = queryString.slice(0, -1);

		return queryString;
  }


  /**
   * createKeyValuePair()
   * 
   * Compiles a query param config object down to it's key and value.
   * 
   * @method
   * @param {QueryStringParamConfigInterface} config
   * @return {KeyValueInterface|null}
   */
  protected createKeyValuePair(config:QueryStringParamConfigInterface):KeyValueInterface|null {

    let excludeIfFalsy = { primary: true, default: false };
    if(typeof config.excludeIfFalsy === 'boolean') {
      excludeIfFalsy.primary = config.excludeIfFalsy;
      excludeIfFalsy.default = config.excludeIfFalsy;
    }
    else {
      excludeIfFalsy = Object.assign(excludeIfFalsy, config.excludeIfFalsy);
    }

    let regex        = config.override || null,
				paramName    = config.key,
        primaryValue = config.primary,
        defaultValue = config.default,
				urlOverride  = false,
				param        = {
					            key: paramName,
                      value: '',
                    };

		if(regex) {
			this.overrideKeyValuePairs.forEach(keyValuePair => {

        // @ts-ignore 
        // `regex` is guaranteed not to be null at this
        // point. Not sure why TS is throwing an error here.
				if(keyValuePair.key.match(regex)) {
					param.value = keyValuePair.value;
					urlOverride = true;
				}
			});
    }

		if(!urlOverride) {
      if(excludeIfFalsy.primary && isFalsy(primaryValue)) {
        primaryValue = false;
      }
      else {
        primaryValue = typeof primaryValue !== 'undefined' ? String(primaryValue) : '';
        param.value = primaryValue;
        primaryValue = true;
      }
		}

		if(!urlOverride && !primaryValue) {
      if(excludeIfFalsy.default && isFalsy(defaultValue)) {
        defaultValue = false;
      }
      else {
        defaultValue = typeof defaultValue !== 'undefined' ? String(defaultValue) : '';
        param.value = defaultValue;
        defaultValue = true;
      }
		}

		if(urlOverride || primaryValue || defaultValue) {
			return param;
		}
		
		return null;
  }

}

export default QueryStringBuilder;