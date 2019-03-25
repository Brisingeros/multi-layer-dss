"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rule = /** @class */ (function () {
    /**
     * @param w The weigth to use when comparing to the other Rule
     * @param c The content to use if this Rule is used
     * @param cnd? The conditions for this Rule. Used in the init from JSO
     */
    function Rule(w, c, cnd) {
        this.conditions = cnd || [];
        this.weigth = w;
        this.content = c;
    }
    ;
    /**
     * @param condition A condition function to add to this Rule
     */
    Rule.prototype.addCondition = function (condition) {
        this.conditions.push(condition);
    };
    ;
    Rule.prototype.getWeight = function () {
        return this.weigth;
    };
    ;
    Rule.prototype.getContent = function () {
        return this.content;
    };
    ;
    /**
     * Receives an object and asserts if this Rule could be selected
     * @param object The object that will be evaluated by this Rule
     */
    Rule.prototype.resolve = function (object) {
        var passing = true;
        var index = 0;
        while (index < this.conditions.length && passing) {
            passing = this.conditions[index](object);
            index++;
        }
        return passing;
    };
    ;
    return Rule;
}());
exports.Rule = Rule;
;
