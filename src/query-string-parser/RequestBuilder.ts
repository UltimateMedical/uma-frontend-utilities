interface QueryStringBuilderConfig {
  paramName:string;
	regex:RegExp
	pageLevelValue:string
	defaultValue:string
}

interface QueryStringBuilder {
  config:QueryStringBuilderConfig|null;
  overridesAsQueryString:string|null
}

class QueryStringBuilder {

  constructor(config:Array<QueryStringBuilderConfig>|null) {
    this.config = null;
    this.overridesAsQueryString = null;
  }

  public static buildQueryString() {
    
  }

}