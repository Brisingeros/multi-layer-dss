"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var layer_1 = require("./layer");
var Flow = /** @class */ (function () {
    /**
     * @param r The function to execute after Flow finalization
     * @param lyrs The Layer objects in JSO for complete initialization
     */
    function Flow(r, lyrs) {
        this.layers = [];
        this.resolve = r;
        if (lyrs)
            this.initialize(lyrs);
    }
    ;
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
    Flow.prototype.initialize = function (lyrs) {
        var actLayer;
        for (var i = 0; i < lyrs.length; i++) {
            actLayer = lyrs[i];
            this.addLayer(new layer_1.Layer(actLayer.resolve, actLayer.rules));
        }
    };
    ;
    /**
     * @param layer The Layer object to add to the Flow
     */
    Flow.prototype.addLayer = function (layer) {
        this.layers.push(layer);
    };
    ;
    /**
     * Resolves all Layers and uses their results in the resolve final method
     * @param object The object that will go throught the Flow
     */
    Flow.prototype.execute = function (object) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises, i, results;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        for (i = 0; i < this.layers.length; i++) {
                            promises.push(this.layers[i].execute(object));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        results = _a.sent();
                        return [4 /*yield*/, this.resolve(results, object)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    return Flow;
}());
exports.Flow = Flow;
;
