export class Container {

  bag: object
 
  constructor() {
    this.bag = {};
  }

  get(key: string) {
    // @ts-ignore
    return typeof this.bag[key] !== undefined ? this.bag[key] : null;
  }

  set(key: string, value: any) {
    // @ts-ignore
    this.bag[key] = value;
  }
 
}