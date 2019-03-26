import { Rule } from './rule';

export class Layer {

    /** Array of Rule, usually related between themselves */
    private rules: Rule[];
    /** This function usually needs to return something and will be called by the Flow.resolve function */
    public resolve: Function;

    /**
     * @param r The function to execute after Layer finalization
     */
    public constructor(r: Function, rls?: any[]) {
        this.rules = [];

        this.resolve = r;

        if (rls)
            this.initialize(rls);
    };

    /**
     * Resolves all Rules and uses their results in the resolve final method
     * @param object The object that will go throught the Layer
     */
    public async execute(object: any): Promise<any> {
        let rules = this.rules;

        return await this.resolve(rules, object);
    };

    /**
     * Method used for complete initialization from JSO
     * @param rls: [{
     *      weight: number,
     *      content: any,
     *      conditions: [(){}]
     * }]
     */
    private initialize(rls: any[]): void {
        for (let i = 0; i < rls.length; i++){
            let actRule = rls[i];
            this.addRule(new Rule(actRule.weigth, actRule.content, actRule.conditions));
        }
    };

    /**
     * @param rule The Rule object to add to the Layer
     */
    public addRule(rule: Rule): void {
        this.rules.push(rule);
    };

};