# multi-layer-dss

A npm package that builds a multi-layered Decisión Support System (DSS) for Node.js.

This package makes use of three core clases: Flow, Layer, Rule; written in TypeScript and builded to JS.

* A Flow is the complete system. It contains Layers and a "resolve" function (Coded by the user) receiving all Layers results. Flow.execute receives the Object to pass the Flow.
* A Layer contains related Rules and a "resolve" function (Coded by the user) receiving all Rules of this Layer and the Object. "resolve" should call the "resolve" function of each Rule.
* A Rule contains any number of "conditions" as functions that receive the Object and should return a boolean, a "content" of any type, a number "weigth" useful in it's "resolve" function, that also receives the Object.

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

* Make use of 'debug.js':
>>
```sh
npm run debug
```
### Code example

```javascript
    var mldss = require('multi-layer-dss');
    var flow = mldss.Flow;
    var layer = mldss.Layer;
    var rule = mldss.Rule;
```

#### Step by step
You can also créate the Flow, his Layers and their Rules separately, using the "add" methods of each class.

#### JSO

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