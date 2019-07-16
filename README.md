[![Build Status](https://travis-ci.org/Brisingeros/multi-layer-dss.svg?branch=master)](https://travis-ci.org/Brisingeros/multi-layer-dss)
[![Coverage Status](https://coveralls.io/repos/github/Brisingeros/multi-layer-dss/badge.svg)](https://coveralls.io/github/Brisingeros/multi-layer-dss)

# multi-layer-dss

A npm package that builds a multi-layered Decision Support System (DSS) for Node.js.

This package makes use of three core clases: Flow, Layer, Rule; written in TypeScript and builded to JS.

* A Flow is the complete system. It contains Layers and a "resolve" function (Coded by the user) receiving all Layers results. Flow.execute receives the Object to pass the Flow.
* A Layer contains related Rules and a "resolve" function (Coded by the user) receiving all Rules of this Layer and the Object. "resolve" should call the "resolve" function of each Rule.
* A Rule contains any number of "conditions" as functions that receive the Object and should return a boolean, a "content" of any type, a number "weigth" useful in its "resolve" function, that also receives the Object.

## Installation

```sh
npm install multi-layer-dss --save
```
## Usage

### Commands
* Run EsLint test:
>>
```sh
npm run lint
```

* Run Mocha test (If builded):
>>
```sh
npm run test
```

* Build JS:
>>
```sh
npm run build
```

* Make use of 'debugFlow.js':
>>
```sh
npm run debugFlow
```

* Make use of 'debugStep.js':
>>
```sh
npm run debugStep
```
### Code example

```javascript
var mldss = require('multi-layer-dss');
var flow = mldss.Flow;
var layer = mldss.Layer;
var rule = mldss.Rule;
```

#### Step by step

See debugStep.js

```javascript
'use strict';
var index = require('multi-layer-dss');
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
        if (rul[i].resolve(o))
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
```

#### JSO

See debugFlow.js

```javascript
'use strict';
var index = require('multi-layer-dss');
var flow = index.Flow;

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
    }
];
let resolveFunc = (results) => {
    return results[0];
};

let actualFlow = new flow(resolveFunc, layers);
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
```