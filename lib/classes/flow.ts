import { Layer } from './layer';

export class Flow {

    /** Array of Rule, usually related between themselves */
    private layers: Layer[];
    /** This function usually needs to return something and will be called by the Flow.resolve function.
     * Receives an array with the results of each Layer and the object that wnet througth the Flow */
    public resolve: Function;

    /**
     * @param r The function to execute after Flow finalization
     * @param lyrs The Layer objects in JSO for complete initialization
     */
    public constructor(r: Function, lyrs?: any[]) {
        this.layers = [];

        this.resolve = r;

        if (lyrs)
            this.initialize(lyrs);
    };

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
    private initialize(lyrs: any[]): void {
        let actLayer;
        for (let i = 0; i < lyrs.length; i++){
            actLayer = lyrs[i];
            this.addLayer(new Layer(actLayer.resolve, actLayer.rules));
        }
    };

    /**
     * @param layer The Layer object to add to the Flow
     */
    public addLayer(layer: Layer): void {
        this.layers.push(layer);
    };

    /**
     * Resolves all Layers and uses their results in the resolve final method
     * @param object The object that will go throught the Flow
     */
    public async execute(object: any): Promise<any> {
        const promises = [];

        for (let i = 0; i < this.layers.length; i++){
            promises.push(this.layers[i].execute(object));
        }

        const results = await Promise.all(promises);

        return await this.resolve(results, object);
    };

};