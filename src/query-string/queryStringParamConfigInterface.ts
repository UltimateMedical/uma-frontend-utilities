export default interface QueryStringParamConfigInterface {
  key:string;
	override?:RegExp
	primary?:string|boolean|number|null
  default?:string|boolean|number|null
  excludeIfFalsy?: { primary?:boolean, default?:boolean }|boolean;
}