'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var flow = index.Flow;
var layer = index.Layer;
var rule = index.Rule;

describe('Prequel memes', () => {
    it('Should return General Kenobi', async () => {
        let layers = [{
            resolve: (rul, o) => {
                let ret = 'Hello there';
                console.log(ret);
    
                for (let i = 0; i < rul.length; i++){
                    if (rul[i].resolve(o))
                        ret = rul[i].getContent();
                }
    
                return ret;
            },
            rules: [
                {
                    weigth: 1,
                    content: 'General Kenobi',
                    conditions: [
                        (o) => {
                            return o.value === 1;
                        }
                    ]
                },
                {
                    weigth: 1,
                    content: 'General Grievous',
                    conditions: [
                        (o) => {
                            return o.value === 2;
                        }
                    ]
                }
            ]
        }];

        let resolveFunc = (results) => {
            return results[0];
        };
        
        let actualFlow = new flow(resolveFunc, layers);
        let obj = {
            value: 1
        }

        let val = await actualFlow.execute(obj);
        expect(val).to.equal('General Kenobi');
        console.log(val);
    });

    it('Should return General Kenobi', async () => {
        let rules = [];
        rules.push(new rule(1, 'General Grievous', [(o) => { return o.value === 2; }]));
        rules.push(new rule(1, 'General Kenobi', [(o) => { return o.value === 1; }]));

        let layers = [];
        layers.push(new layer((rul, o) => {
            let ret = 'Hello there';
            console.log(ret);

            for (let i = 0; i < rul.length; i++){
                if (rul[i].resolve(o) && rul[i].getWeight() === 1)
                    ret = rul[i].getContent();
            }

            return ret;
        }, rules));

        let newRule = new rule(1, 'Master Skywalker', [(o) => { return o.value === 3; }]);
        layers[0].addRule(newRule);

        let resolveFunc = (results) => {
            return results[0];
        };
        let actualFlow = new flow(resolveFunc);
        for (let i = 0; i < layers.length; i++){
            actualFlow.addLayer(layers[i]);
        }

        let obj = {
            value: 1
        }

        let val = await actualFlow.execute(obj);
        expect(val).to.equal('General Kenobi');
        expect(val).to.not.equal('General Grievous');
        console.log(val);
    });
});