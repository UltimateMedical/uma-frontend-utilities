export default interface QueryStringParamConfigInterface {
  key:string;
	override?:RegExp
	primary?:string|boolean|number
  default?:string|boolean|number
  excludeIfFalsy?: { primary?:boolean, default?:boolean }|boolean;
}