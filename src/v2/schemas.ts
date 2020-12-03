export interface KeyValueSchema {
  key:   string;
  value: string|boolean|number|null|undefined;
};

export interface OverrideSchema {
  expires?: Date;
  pairs:   KeyValueSchema[];
}

export interface ParamSchema {
  key:              string;
	value?:           string|boolean|number|null;
	override?:        RegExp;
  excludeIfFalsy?:  boolean;
};

export interface UMAFormParamBuilder {
  getURLString(): string;
  getKeyValuePairs(): KeyValueSchema[];
};