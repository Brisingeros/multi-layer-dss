import { Layer } from './layer';
export declare class Flow {
    /** Array of Rule, usually related between themselves */
    private layers;
    /** This function usually needs to return something and will be called by the Flow.resolve function.
     * Receives an array with the results of each Layer and the object that wnet througth the Flow */
    resolve: Function;
    /** Results of each Layer */
    results: any[];
    /**
     * @param r The function to execute after Flow finalization
     * @param lyrs The Layer objects in JSO for complete initialization
     */
    constructor(r: Function, lyrs?: any[]);
    /**
     * Method used for complete initialization from JSO
     * @param lyrs: [{
     *      resolve: (){},
     *      rules: [{
     *          weight: number,
     *          content: any,
     *          conditions: [(){}]
     *      }]
     * }]
     */
    private initialize;
    /**
     * @param layer The Layer object to add to the Flow
     */
    addLayer(layer: Layer): void;
    /**
     * Resolves all Layer and uses their results in the resolve final method
     * @param object The object that will go throught the Flow
     */
    execute(object: any): Promise<any>;
}
