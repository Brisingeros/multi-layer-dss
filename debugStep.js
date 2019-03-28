'use strict';
var index = require('./');
var flow = index.Flow;
var layer = index.Layer;
var rule = index.Rule;

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

actualFlow.execute(obj)
.then(val => {
    console.log(val);
})
.catch(err => {
    console.log(err);
});