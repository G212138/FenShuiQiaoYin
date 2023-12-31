"use strict";
cc._RF.push(module, '75b2dk5WVVO7LtxMPb6Uw7K', 'TeacherPanelLoading');
// frame/scripts/UI/Item/TeacherPanelLoading.ts

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
var FrameMsgType_1 = require("../../Data/FrameMsgType");
var ListenerManager_1 = require("../../Manager/ListenerManager");
var BindNode_1 = require("../BindNode");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TeacherPanelLoading = /** @class */ (function (_super) {
    __extends(TeacherPanelLoading, _super);
    function TeacherPanelLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nd_panel = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TeacherPanelLoading.prototype.start = function () {
        ListenerManager_1.ListenerManager.on(FrameMsgType_1.FrameMsgType.TEACHER_PANEL_LOADING, this.onEnableEvent, this);
    };
    TeacherPanelLoading.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.removeAll(this);
    };
    TeacherPanelLoading.prototype.onEnableEvent = function (isShow) {
        this._nd_panel.active = isShow;
    };
    TeacherPanelLoading = __decorate([
        ccclass
    ], TeacherPanelLoading);
    return TeacherPanelLoading;
}(BindNode_1.default));
exports.default = TeacherPanelLoading;

cc._RF.pop();