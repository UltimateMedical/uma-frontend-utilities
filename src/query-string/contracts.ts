export interface QueryStringObject {
  key:string;
  value:string;
}

export interface QueryStringParamConfig {
  key:string;
	queryStringOverrideSearch?:RegExp
	primaryValue?:string|boolean|number
  defaultValue?:string|boolean|number
  excludeIfFalsyValue?: { primary?:boolean, default?:boolean }|boolean;
}