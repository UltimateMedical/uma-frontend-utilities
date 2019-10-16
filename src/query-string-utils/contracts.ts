export interface QueryStringObject {
  key:string;
  value:string;
}

export interface QueryStringParamConfig {
  paramName:string;
	overrideSearch?:RegExp
	primaryValue?:string|boolean|number
  defaultValue?:string|boolean|number
  omitIfNoValue?:boolean;
}