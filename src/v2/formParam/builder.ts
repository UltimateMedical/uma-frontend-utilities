import isFalsy from '../../functions/isFalsy';
import { KeyValueSchema, OverrideSchema, ParamSchema, UMAFormParamBuilder } from '../schemas';

/**
 * FormParamBuilder
 * 
 * @since 1.1.0
 */
export default class FormParamBuilder implements UMAFormParamBuilder {


  /**
   * formParamConfig
   * 
   * The options that will be reduced into key/value pairs and/or a query string.
   */
  private formParamConfig: ParamSchema[];


  /**
   * overridesBank
   * 
   * Holds the override specifications to be consulted at build time. Subsequent arrays
   * should get higher priority.
   */
  private overridesBank: OverrideSchema[];


  /**
   * resolvedFormParams
   * 
   * The built query string represented as an array of key/value pairs.
   */
  private resolvedFormParams: KeyValueSchema[];


  /**
   * wwwFormURLEncoded
   * 
   * The urlencoded form that's constructed from the provided configuration.
   */
  private wwwFormURLEncoded: string;


  /**
   * constructor()
   * 
   * @constructor
   */
  public constructor(formParamConfig: ParamSchema[]) {
    this.formParamConfig    = formParamConfig;
    this.overridesBank      = [];
    this.resolvedFormParams = [];
    this.wwwFormURLEncoded  = "";
  }


  /**
   * getKeyValuePairs()
   * 
   * Get the resolved key/value pairs.
   * These are availabe after the build method is called.
   * 
   * @method
   * */
  public getKeyValuePairs(): KeyValueSchema[] {
    return this.resolvedFormParams;
  }


  /**
   * getURLString()
   * 
   * Get the resolved key/value pairs in a URL string.
   * This is availabe after the build method is called.
   * 
   * @method
   */
  public getURLString(): string {
    return this.wwwFormURLEncoded;
  }


  /**
   * withOverrides()
   * 
   * Override the default configuration values by passing an array of key/value
   * pairs here. Useful if you'd like to override your default configuration with
   * values from the URL query string, LocalStorage, etc.
   * 
   * @method
   */
  public withOverrides(...overrides: OverrideSchema[]): FormParamBuilder {
    this.overridesBank = overrides;
    return this;
  }


  /**
   * build()
   * 
   * Builds the query string and key/value pairs using the given configuration.
   * 
   * @method
   */
  public build(): FormParamBuilder {

    this.formParamConfig.forEach(config => {

      const overridesResolved = this.resolveOverrides(config);

      if(!overridesResolved.excludeIfFalsy || (overridesResolved.excludeIfFalsy && !isFalsy(overridesResolved.value))) {
        this.resolvedFormParams.push({
          key: overridesResolved.key,
          value: overridesResolved.value
        });
      }
      
    });

    this.wwwFormURLEncoded = FormParamBuilder.KeyValuePairsToURLString(this.resolvedFormParams);

    return this;

  }


  /**
   * KeyValuePairsToURLString()
   * 
   * Builds a query string using an array of key/value pairs.
   * 
   * @method
   * @static
   */
  public static KeyValuePairsToURLString(keyValuePairs: KeyValueSchema[]): string {

    let str = '';
    
    str = keyValuePairs.reduce((acc, cur) => {
      if(cur.value === "" || cur.value === undefined) {
        return acc + `${cur.key}&`;
      }
			return acc + `${cur.key}=${cur.value}&`;
		}, '?');
    
    str = str.slice(0, -1);

		return str;
  }


  /**
   * resolveOverrides()
   * 
   * Compiles a query param config object down to it's key and value.
   * 
   * @method
   */
  protected resolveOverrides(config: ParamSchema): ParamSchema {

    // if we don't have an override then we can return the config,
    // as the value will not change.
    if(!config.override) return config;

    const regex      = config.override,
          now        = new Date();

    // prepare a parameter to return
		let param = {
					        key:            config.key,
                  value:          config.value,
                  excludeIfFalsy: config.excludeIfFalsy
                };

    // loop through through the overrides and see if one applies to
    // this param configuration. if so, change the value to be equal
    // to that of the override.
		if(regex && this.overridesBank.length > 0) {
      for(let i = 0; i < this.overridesBank.length; i++) {

        const override = this.overridesBank[i];
        
        // if the object is empty or if the override spec is expired
        // then we can continue to the next iteration
        if (Object.entries(override).length < 1 || (override.expires && new Date(override.expires) < now)) continue;

        for(let j = 0; j < override.pairs.length; j++) {
          if(override.pairs[j].key.match(regex)) {
            param.value = override.pairs[j].value;
          }
        }

      }
    }
		
		return param;
  }

}