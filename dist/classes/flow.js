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
        this.results = [];
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
        for (var i = 0; i < lyrs.length; i++) {
            var actLayer = lyrs[i];
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
            var i, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < this.layers.length)) return [3 /*break*/, 4];
                        _b = (_a = this.results).push;
                        return [4 /*yield*/, this.layers[i].execute(object)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.resolve(this.results, object)];
                    case 5: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ;
    return Flow;
}());
exports.Flow = Flow;
;
