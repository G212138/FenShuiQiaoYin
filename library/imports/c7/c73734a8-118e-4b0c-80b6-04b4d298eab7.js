"use strict";
cc._RF.push(module, 'c7373SoEY5LDIC2BLTSmOq3', 'Tip');
// frame/scripts/UI/Item/Tip.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tip = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tip = /** @class */ (function (_super) {
    __extends(Tip, _super);
    function Tip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.neiRongNode = null;
        _this.tipLabel = null;
        _this.ready = true;
        return _this;
    }
    Tip.prototype.playTip = function (message) {
        var _this = this;
        this.neiRongNode.active = true;
        this.node.stopAllActions();
        this.ready = false;
        this.tipLabel.string = message;
        this.reset();
        cc.tween(this.node)
            .delay(1)
            .to(0.5, { y: 128, opacity: 0 })
            .call(function () {
            _this.ready = true;
        })
            .start();
    };
    Tip.prototype.isReady = function () {
        return this.ready;
    };
    Tip.prototype.reset = function () {
        this.node.setPosition(0, 0);
        this.node.opacity = 255;
    };
    __decorate([
        property(cc.Node)
    ], Tip.prototype, "neiRongNode", void 0);
    __decorate([
        property(cc.Label)
    ], Tip.prototype, "tipLabel", void 0);
    Tip = __decorate([
        ccclass
    ], Tip);
    return Tip;
}(cc.Component));
exports.Tip = Tip;

cc._RF.pop();