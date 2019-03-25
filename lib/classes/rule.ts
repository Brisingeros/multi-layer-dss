export class Rule {

    /** Array of functions that will act as conditions for the Rule to be selectable */
    private conditions: Function[];
    /** Variable that determines the overall posibility of this Rule to be selected between all posible */
    private weigth: number;
    /** Content that usually will be used at the end of the Flow */
    private content: any;

    /**
     * @param w The weigth to use when comparing to the other Rule
     * @param c The content to use if this Rule is used
     * @param cnd? The conditions for this Rule. Used in the init from JSO
     */
    public constructor(w: number, c: any, cnd?: Function[]) {
        this.conditions = cnd || [];

        this.weigth = w;
        this.content = c;
    };

    /**
     * @param condition A condition function to add to this Rule
     */
    public addCondition(condition: Function): void {
        this.conditions.push(condition);
    };

    public getWeight(): number {
        return this.weigth;
    };

    public getContent(): any {
        return this.content;
    };

    /**
     * Receives an object and asserts if this Rule could be selected
     * @param object The object that will be evaluated by this Rule
     */
    public resolve(object: any): boolean {
        let passing = true;
        let index = 0;

        while (index < this.conditions.length && passing){
            passing = this.conditions[index](object);
            index++;
        }

        return passing;
    };

};