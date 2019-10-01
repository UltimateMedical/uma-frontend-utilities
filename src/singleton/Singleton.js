export class Singleton {
 
  // Instance stores a reference to the Singleton
  constructor() {
    this.instance = null;
    this.bag = {};
  }

  get(key) {
    return typeof bag[key] !== undefined ? bag[key] : null;
  }

  set(key, value) {
    bag[key] = value;
  }
 
  // Get the Singleton instance if one exists
  // or create one if it doesn't
  getInstance() {
    if ( !instance ) {
      instance = init();
    }
    return instance;
  }
 
}