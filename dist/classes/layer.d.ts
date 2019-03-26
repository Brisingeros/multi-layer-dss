import { Rule } from './rule';
export declare class Layer {
    /** Array of Rule, usually related between themselves */
    private rules;
    /** This function usually needs to return something and will be called by the Flow.resolve function */
    resolve: Function;
    /**
     * @param r The function to execute after Layer finalization
     */
    constructor(r: Function, rls?: any[]);
    /**
     * Resolves all Rules and uses their results in the resolve final method
     * @param object The object that will go throught the Layer
     */
    execute(object: any): Promise<any>;
    /**
     * Method used for complete initialization from JSO
     * @param rls: [{
     *      weight: number,
     *      content: any,
     *      conditions: [(){}]
     * }]
     */
    private initialize;
    /**
     * @param rule The Rule object to add to the Layer
     */
    addRule(rule: Rule): void;
}
