interface GaTargetConfiguration {
    selector: string;
    firingEvents: Array<string>;
    argsForGa: Array<string>;
    fetchOnMutation?: Boolean;
}
interface GaTargetCollection {
    selector: string;
    gaTargets: Array<GaTarget>;
    argsForGa: Array<string>;
    firingEvents: Array<string>;
    fetchOnMutation: Boolean;
}
interface GaTarget {
    node: Element;
    gaCommand: string;
    gaType: string;
    gaCategory: string;
    gaAction: string;
    gaLabel: string;
    firingEvents: Array<string>;
    getArgsForGa(): Array<string>;
}
declare class GaTracker {
    DEBUG: Boolean;
    gaTargetConfigurations: Array<GaTargetConfiguration>;
    observeForMutations: Element;
    gaTargetCollections: Array<GaTargetCollection>;
    /**
     * constructor
     *
     * @param {void}
     * @return {void}
     */
    constructor();
    /**
     * init
     *
     * Start up the tracker. Set configuration settings
     * and register reactive elements.
     *
     * @param {object} config
     * @return {void}
     */
    init(config: {
        DEBUG: false;
        observeForMutations: null;
        gaTargetConfigurations: Array<GaTargetConfiguration>;
    }): void;
    observeParentWrapper(): void;
    parentWrapperObserver(): MutationObserver;
    onParentWrapperUpdate(mutations: Array<MutationRecord>, observer: MutationObserver): void;
    createGaTargetCollection(gaTargetConfiguration: GaTargetConfiguration): GaTargetCollection;
    createGaTargetInstance(node: Element, config: GaTargetConfiguration): {
        node: Element;
        firingEvents: string[];
        gaCommand: string;
        gaType: string;
        gaCategory: string;
        gaAction: string;
        gaLabel: string;
        getArgsForGa: () => string[];
    };
    addEventListeners(gaTarget: GaTarget): void;
    getNodeGaLabel(gaTarget: GaTarget): string;
}
declare const gaTracker: GaTracker;
export { gaTracker };
