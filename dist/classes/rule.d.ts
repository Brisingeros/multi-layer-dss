export declare class Rule {
    /** Array of functions that will act as conditions for the Rule to be selectable */
    private conditions;
    /** Variable that determines the overall posibility of this Rule to be selected between all posible */
    private weigth;
    /** Content that usually will be used at the end of the Flow */
    private content;
    /**
     * @param w The weigth to use when comparing to the other Rule
     * @param c The content to use if this Rule is used
     * @param cnd? The conditions for this Rule. Used in the init from JSO
     */
    constructor(w: number, c: any, cnd?: Function[]);
    /**
     * @param condition A condition function to add to this Rule
     */
    addCondition(condition: Function): void;
    getWeight(): number;
    getContent(): any;
    /**
     * Receives an object and asserts if this Rule could be selected
     * @param object The object that will be evaluated by this Rule
     */
    resolve(object: any): boolean;
}
