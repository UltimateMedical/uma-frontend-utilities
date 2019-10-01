var Singleton = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    var bag = {};
 
    return {

      get: function(key) {
        return typeof bag[key] !== undefined ? bag[key] : null;
      },

      set: function(key, value) {
        bag[key] = value;
      }
      
    };
 
  };
 
  return {
 
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();

export default Singleton;
 
 
// Usage:
 
// var singleA = mySingleton.getInstance();
// var singleB = mySingleton.getInstance();
// console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true

 
// Note: as we are working with random numbers, there is a
// mathematical possibility both numbers will be the same,
// however unlikely. The above example should otherwise still
// be valid.