interface GaTargetConfiguration {
  selector: string
  firingEvents: Array<string>
  argsForGa: Array<string>
  fetchOnMutation?: Boolean
}

interface GaTargetCollection {
  selector: string
  gaTargets: Array<GaTarget>
  argsForGa: Array<string>
  firingEvents: Array<string>
  fetchOnMutation: Boolean
}

interface GaTarget {
  node: Element
  gaCommand: string
  gaType: string
  gaCategory: string
  gaAction: string
  gaLabel: string 
  firingEvents: Array<string>
  getArgsForGa(): Array<string>
}

class GaTracker  {

  DEBUG: Boolean;
  gaTargetConfigurations: Array<GaTargetConfiguration>
  observeForMutations: Element
  gaTargetCollections: Array<GaTargetCollection> = [];

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
    this.observeForMutations = null;

    /**
     * The elements we are tracking.
     * 
     */
    this.gaTargetCollections = [];


    /**
     * Bind methods
     */
    this.init = this.init.bind(this);
    this.observeParentWrapper = this.observeParentWrapper.bind(this);
    this.parentWrapperObserver = this.parentWrapperObserver.bind(this);
    this.onParentWrapperUpdate = this.onParentWrapperUpdate.bind(this);
    this.createGaTargetCollection = this.createGaTargetCollection.bind(this);
    this.createGaTargetInstance = this.createGaTargetInstance.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);
    this.getNodeGaLabel = this.getNodeGaLabel.bind(this);
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
  init(config: {DEBUG: false, observeForMutations: null, gaTargetConfigurations: Array<GaTargetConfiguration>}) {

    // take care of configuration settings
    if ( config ) {
      Object.keys(config).forEach(key => {
        // @ts-ignore
        this[key] = config[key];
      });
    }

    // create an array of GaTargetCollections
    let gaTargetCollection;

    this.gaTargetConfigurations.forEach(gaTargetConfig => {
      gaTargetCollection = this.createGaTargetCollection(gaTargetConfig);
      if(gaTargetCollection.gaTargets.length) {
        this.gaTargetCollections.push(gaTargetCollection);
      }
    });

    if (this.observeForMutations) {
      this.observeParentWrapper();
    }
  }

  // observe the specified parent wrapper for DOM changes
  observeParentWrapper() {
    this.parentWrapperObserver().observe(this.observeForMutations, {
      childList: true
    });
  }

  // return the instance of the mutation observer
  parentWrapperObserver() {
    return new MutationObserver(this.onParentWrapperUpdate);
  }

  // when DOM changes are detected within the specified
  // parent wrapper
  onParentWrapperUpdate(mutations: Array<MutationRecord>, observer: MutationObserver) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        this.gaTargetConfigurations.forEach(gaTargetConfig => {
          if(gaTargetConfig.fetchOnMutation) {
            if(document.querySelector(gaTargetConfig.selector) === node) {
              this.gaTargetCollections.push(this.createGaTargetCollection(gaTargetConfig));
            }
          }
        });
      });
    });
  }

  // handle the gaEventConfig configuration
  createGaTargetCollection(gaTargetConfiguration: GaTargetConfiguration) {

    let nodes: Array<Element>,
        gaTargetCollection: GaTargetCollection;

    nodes = Array.prototype.slice.call(document.querySelectorAll(gaTargetConfiguration.selector));

    gaTargetCollection = {

      // set these group properties
      selector: gaTargetConfiguration.selector,
      firingEvents: gaTargetConfiguration.firingEvents,
      argsForGa: gaTargetConfiguration.argsForGa,
      fetchOnMutation: gaTargetConfiguration.fetchOnMutation || false,

      // create an array of gaTargets
      gaTargets: nodes.map(node => this.createGaTargetInstance(node, gaTargetConfiguration))
    };

    return gaTargetCollection;
  }

  createGaTargetInstance(node: Element, config: GaTargetConfiguration) {
    let gaTarget = {
      node: node,
      firingEvents: config.firingEvents,
      gaCommand: config.argsForGa[0],
      gaType: config.argsForGa[1],
      gaCategory: config.argsForGa[2],
      gaAction: config.argsForGa[3],
      gaLabel: config.argsForGa[4],
      getArgsForGa: () => {
        return [gaTarget.gaCommand, gaTarget.gaType, gaTarget.gaCategory, gaTarget.gaAction, gaTarget.gaLabel];
      }
    };
    gaTarget.gaLabel = this.getNodeGaLabel(gaTarget);
    this.addEventListeners(gaTarget);
    return gaTarget;
  }


  // Handle each DOM element
  addEventListeners( gaTarget: GaTarget ) {

    let handle = () => {
      if (this.DEBUG) {
        console.log('gaTarget: ', gaTarget.getArgsForGa());
      }
      else {
        // @ts-ignore
        window.ga(...gaTarget.getArgsForGa());
      }
    }

    gaTarget.firingEvents.forEach(firingEvent => {
      gaTarget.node.addEventListener(firingEvent, handle);
    });

  }


  getNodeGaLabel(gaTarget: GaTarget) {

    let gaLabel,
        nodeLabel = gaTarget.node.getAttribute('ga-label');

    if (nodeLabel) {
      gaLabel = gaTarget.gaLabel.replace(/{{\s*label\s*}}/gi, nodeLabel);
    }
    else {
      gaLabel = gaTarget.gaLabel.replace(/{{\s*label\s*}}/gi, '');
    }

    return gaLabel;
  }

}

const gaTracker = new GaTracker();
export { gaTracker };