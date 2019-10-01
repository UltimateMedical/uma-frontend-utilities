export class Singleton {
 
  // Instance stores a reference to the Singleton
  constructor() {
    this.instance = null;
    this.bag = {};
  }

  get(key) {
    return typeof this.bag[key] !== undefined ? this.bag[key] : null;
  }

  set(key, value) {
    this.bag[key] = value;
  }
 
  // Get the Singleton instance if one exists
  // or create one if it doesn't
  getInstance() {
    if ( !this.instance ) {
      this.instance = init();
    }
    return this.instance;
  }
 
}