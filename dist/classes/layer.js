"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rule_1 = require("./rule");
var Layer = /** @class */ (function () {
    /**
     * @param r The function to execute after Layer finalization
     */
    function Layer(r, rls) {
        this.rules = [];
        this.resolve = r;
        if (rls)
            this.initialize(rls);
    }
    ;
    /**
     * Resolves all Rules and uses their results in the resolve final method
     * @param object The object that will go throught the Layer
     */
    Layer.prototype.execute = function (object) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rules;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rules = this.rules;
                        return [4 /*yield*/, this.resolve(rules, object)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    /**
     * Method used for complete initialization from JSO
     * @param rls: [{
     *      weight: number,
     *      content: any,
     *      conditions: [(){}]
     * }]
     */
    Layer.prototype.initialize = function (rls) {
        var actRule;
        for (var i = 0; i < rls.length; i++) {
            actRule = rls[i];
            this.addRule(new rule_1.Rule(actRule.weigth, actRule.content, actRule.conditions));
        }
    };
    ;
    /**
     * @param rule The Rule object to add to the Layer
     */
    Layer.prototype.addRule = function (rule) {
        this.rules.push(rule);
    };
    ;
    return Layer;
}());
exports.Layer = Layer;
;
