export class Container {
 
  constructor() {
    this.bag = {};
  }

  get(key) {
    return typeof this.bag[key] !== undefined ? this.bag[key] : null;
  }

  set(key, value) {
    this.bag[key] = value;
  }
 
}