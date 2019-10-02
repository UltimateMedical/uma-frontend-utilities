export const TrackGa = {

  /**
   | ---------------------------------------------------
   | Config
   | ---------------------------------------------------
   */
  
  config: {

    /**
     * Use this flag if you want to console.log stuff and
     * not send to GA.
     * 
     */
    DEBUG: false,

    /**
     * Specify the parent to observe for DOM changes.
     * 
     */
    parentToObserve: null,

    /**
     * Specify the DOM elements you'd like to attach event 
     * listeners to in this array.
     * 
     */
    clickables: [],

  },

  trackedDomElements: [],

  /**
   * The process initializer
   * 
   */
  init: function(config=null) {
    var self = this;
    if ( config ) {
      Object.keys(config).forEach(function(key) {
        self.config[key] = config[key];
      });
    }
    this.config.clickables.forEach(function(clickable) {
      self.handleClickable(clickable);
    });
    if (this.config.parentToObserve) {
      this.observeParentWrapper();
    }
  },


  /**
   | ---------------------------------------------------
   | Functionality
   | ---------------------------------------------------
   */

  // observe the specified parent wrapper for DOM changes
  observeParentWrapper: function() {
    this.parentWrapperObserver().observe(this.config.parentToObserve, {
      childList: true
    });
  },

  // return the instance of the mutation observer
  parentWrapperObserver: function() {
    return new MutationObserver(this.onParentWrapperUpdate);
  },

  // when DOM changes are detected within the specified
  // parent wrapper
  onParentWrapperUpdate: (mutations, observer) => {
    var clickables = TrackGa.config.clickables;
    clickables.forEach(TrackGa.handleClickable, TrackGa);
  },

  // handle the clickables configuration
  handleClickable: function(clickable) {

    var self = this,
        domElements,
        selectorIsId,
        defaultGaIsDefined,
        currentClickable = {};

    selectorIsId = typeof clickable.id !== 'undefined';
    defaultGaIsDefined = typeof clickable.ga !== 'undefined';

    currentClickable.selector = !selectorIsId ? clickable.selector : null;
    currentClickable.defaultGa = defaultGaIsDefined ? clickable.ga : null;
    currentClickable.reselect = typeof clickable.reselect !== 'undefined' ? clickable.reselect : false;

    try {

      currentClickable.events = clickable.events;  

      if (selectorIsId) {
        domElements = document.getElementById(clickable.id);
        if (domElements) {
          domElements.currentClickableConfig = currentClickable;
          self.handleDomElement(domElements);
        }
      }
      else {
        domElements = [...document.querySelectorAll(currentClickable.selector)];
        domElements.forEach(function(domElement) {
          domElement.currentClickableConfig = currentClickable;
          var domAndConfig = {};
          domAndConfig.currentClickableConfig = currentClickable;
          domAndConfig.element = domElement;
          self.handleDomElement(domAndConfig);
        });
      }

    }
    catch (err) {
      console.log(
        'There was a problem with your TrackGa configuration in the "clickables" array.\n',
        err
      );
    }

  },

  // Handle each DOM element
  handleDomElement: function(domAndConfig) {
    
    var domElement = domAndConfig.element;

    var self = this;

    if (!domElement) return;
    if (self.trackedDomElements.includes(domElement)) return;

    var currentClickableConfig = domAndConfig.currentClickableConfig,
        ga = self.getGaArguments( domElement, currentClickableConfig ),
        handle, eventName;

    if (!ga) {
      throw new Error(
        `Please include a "ga" attribute on the element you wish to track or include 
        a default in the "clickables" array.`,
        domElement
      );
    }


    if (typeof currentClickableConfig.events === 'string') {
      currentClickableConfig.events = currentClickableConfig.events.split(' ');
    }

    if (Array.isArray(currentClickableConfig.events)) {
      currentClickableConfig.events.forEach(function(event) {

        handle = function(e) {
          var condition = typeof event.condition === 'function' ? event.condition(e) : true;
          if (condition) {
            if (self.config.DEBUG) {
              console.log('ga: ', ga);
            }
            else {
              window.ga(...ga);
            }
          }
        };

        try {
          if (typeof event === 'string') {
            eventName = event;
          }
          else if (typeof event === 'object') {
            eventName = event.name;
          }
          domElement.addEventListener(eventName, handle);
          if (currentClickableConfig.reselect) {
          } else {
            self.trackedDomElements.push(domElement);
          }
        }
        catch(err) {
          console.log(
            `There was a problem adding an event listener to a DOM element.
             This is probably because there's an error in your "clickables" config.`,
            err
          );
        }
      });
    }

  },


  getGaArguments: function(domElement, currentClickableConfig) {

    let ga = currentClickableConfig.defaultGa,
        gaLabel = domElement.getAttribute('ga-label');

    if (gaLabel) {
      ga = ga.map(arg => {
        return arg.replace(/{{\s*label\s*}}/gi, gaLabel);
      });
    }

    return ga;

  }

}