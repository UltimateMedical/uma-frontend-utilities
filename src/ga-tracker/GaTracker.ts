interface GaTargetConfiguration {
  selector: string
  firing_events: Array<string>
  args_for_ga: Array<string>
  reselect_on_mutation?: Boolean
}

interface GaTargetCollection {
  selector: string
  nodes: Array<Element>
  reselect_on_mutation: Boolean
}

interface GaTarget {
  node: HTMLElement
}

export class GaTracker  {

  DEBUG: Boolean;
  gaTargetConfigurations: Array<GaTargetConfiguration>
  parentToObserve: HTMLElement
  trackedDomElements: Array<HTMLElement>

  /**
   * constructor
   * 
   * @param {void}
   * @return {void}
   */
  constructor() {

    /**
     * Use this flag if you want to console.log stuff and
     * not send to GA.
     * 
     */
    this.DEBUG = false;

    /**
     * Specify the DOM elements you'd like to attach event 
     * listeners to in this array.
     * 
     */
    this.gaTargetConfigurations = [];

    /**
     * Specify the parent to observe for DOM changes.
     * 
     */
    this.parentToObserve = null;

    /**
     * The elements we are tracking.
     * 
     */
    this.trackedDomElements = [];


    /**
     * Bind methods
     */
    this.init = this.init.bind(this);
    this.observeParentWrapper = this.observeParentWrapper.bind(this);
    this.parentWrapperObserver = this.parentWrapperObserver.bind(this);
    this.onParentWrapperUpdate = this.onParentWrapperUpdate.bind(this);
    this.createGaTargetCollection = this.createGaTargetCollection.bind(this);
    this.handleDomElement = this.handleDomElement.bind(this);
    this.getGaArguments = this.getGaArguments.bind(this);
  }


  /**
   * init
   * 
   * Start up the tracker. Set configuration settings 
   * and register reactive elements.
   * 
   * @param {object} config
   * @return {void}
   */
  init(config=null) {

    // initialize variables used in this function
    let gaTargetCollections: Array<GaTargetCollection> = [];

    // take care of configuration settings
    if ( config ) {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      });
    }

    // create an array of GaTargetCollections
    this.gaTargetConfigurations.forEach(gaTargetConfig => {
      gaTargetCollections.push(this.createGaTargetCollection(gaTargetConfig));
    });

    

    if (this.parentToObserve) {
      this.observeParentWrapper();
    }
  }


  /**
   | ---------------------------------------------------
   | Functionality
   | ---------------------------------------------------
   */

  // observe the specified parent wrapper for DOM changes
  observeParentWrapper() {
    this.parentWrapperObserver().observe(this.parentToObserve, {
      childList: true
    });
  }

  // return the instance of the mutation observer
  parentWrapperObserver() {
    return new MutationObserver(this.onParentWrapperUpdate);
  }

  // when DOM changes are detected within the specified
  // parent wrapper
  onParentWrapperUpdate(mutations, observer) {
    this.gaEventConfigs.forEach(this.handleClickable);
  }

  // handle the gaEventConfig configuration
  createGaTargetCollection(gaTargetConfiguration: GaTargetConfiguration) {

    let gaTargetsCollection = {
      selector: gaTargetConfiguration.selector,
      firing_events: gaTargetConfiguration.firing_events,
      nodes: [...document.querySelectorAll(gaTargetConfiguration.selector)],
      reselect_on_mutation: gaTargetConfiguration.reselect_on_mutation || false
    };

    return gaTargetsCollection;

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

  }

  // Handle each DOM element
  handleDomElement(domAndConfig) {
    
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

  }


  getGaArguments(domElement, currentClickableConfig) {

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