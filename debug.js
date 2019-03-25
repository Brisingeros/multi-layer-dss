'use strict';
var index = require('./dist/index.js');
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