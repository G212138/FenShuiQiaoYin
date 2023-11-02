
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Item/GameUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f73c56FnmVJYpv47A7O8GFZ', 'GameUI');
// game/scripts/UI/Item/GameUI.ts

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
var ListenerManager_1 = require("../../../../frame/scripts/Manager/ListenerManager");
var SyncDataManager_1 = require("../../../../frame/scripts/Manager/SyncDataManager");
var Tools_1 = require("../../../../frame/scripts/Utils/Tools");
var EventType_1 = require("../../Data/EventType");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rightArea = null;
        _this.shiguanNode = [];
        _this.shiguanLabel = [];
        _this.btnAddAndSub = [];
        _this.btn_xiangji = null;
        _this.btn_tijiao = null;
        _this.shiguan_posY = -250;
        _this.rightArea_posX = 723;
        _this.shiguan_1 = 1;
        _this.shiguan_2 = 1;
        _this.shiguan_3 = 6;
        _this.allTrueArr = [[1, 1, 6], [1, 2, 5], [1, 3, 4], [2, 2, 4], [2, 3, 3]];
        return _this;
    }
    GameUI.prototype.onLoad = function () {
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.GAME_RECONNECT, this.initUI, this);
    };
    GameUI.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.GAME_RECONNECT, this.initUI, this);
    };
    GameUI.prototype.handleEnterGame = function () {
        this.initUI();
        this.gameStartAni();
    };
    GameUI.prototype.initUI = function () {
        this.initShiguan();
        this.updateBtnState();
    };
    GameUI.prototype.initShiguan = function () {
        this.shiguan_1 = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_1;
        this.shiguan_2 = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2;
        this.shiguan_3 = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3;
        this.setShiguan_idle(this.shiguanNode[0], this.shiguan_1);
        this.setShiguan_idle(this.shiguanNode[1], this.shiguan_2);
        this.setShiguan_idle(this.shiguanNode[2], this.shiguan_3);
        this.setShiguan_lbl(this.shiguanLabel[0], this.shiguan_1);
        this.setShiguan_lbl(this.shiguanLabel[1], this.shiguan_2);
        this.setShiguan_lbl(this.shiguanLabel[2], this.shiguan_3);
    };
    GameUI.prototype.gameStartAni = function () {
        var _this = this;
        this.rightArea.x = 1280;
        for (var i = 0; i < this.shiguanNode.length; i++) {
            this.shiguanNode[i].y = 600;
        }
        this.btn_xiangji.opacity = 0;
        this.btn_tijiao.opacity = 0;
        cc.tween(this.rightArea).to(0.5, { x: this.rightArea_posX }).call(function () {
            cc.tween(_this.shiguanNode[0]).to(0.5, { y: _this.shiguan_posY }).start();
            cc.tween(_this.shiguanNode[1]).delay(0.2).to(0.5, { y: _this.shiguan_posY }).start();
            cc.tween(_this.shiguanNode[2]).delay(0.4).to(0.5, { y: _this.shiguan_posY }).call(function () {
                cc.tween(_this.btn_xiangji).to(0.5, { opacity: 255 }).start();
                cc.tween(_this.btn_tijiao).to(0.5, { opacity: 255 }).start();
            }).start();
        }).start();
    };
    GameUI.prototype.setShiguan_idle = function (shiguan, num) {
        var aniName = num + "idle";
        Tools_1.Tools.playSpine(shiguan.getComponent(sp.Skeleton), aniName, true);
    };
    GameUI.prototype.setShiguan_lbl = function (shiguan, num) {
        shiguan.string = num.toString();
    };
    GameUI.prototype.onClickShiguan_1_add = function () {
        if (this.shiguan_1 >= 6 || this.shiguan_3 < 1)
            return;
        this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 + 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        this.shiguan_1++;
        this.shiguan_3--;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_1 = this.shiguan_1;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    };
    GameUI.prototype.onClickShiguan_1_sub = function () {
        if (this.shiguan_3 == 6 || this.shiguan_1 == 1)
            return;
        this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 - 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        this.shiguan_1--;
        this.shiguan_3++;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_1 = this.shiguan_1;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    };
    GameUI.prototype.onClickShiguan_2_add = function () {
        if (this.shiguan_2 >= 6 || this.shiguan_3 < 1)
            return;
        this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 + 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        this.shiguan_2++;
        this.shiguan_3--;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    };
    GameUI.prototype.onClickShiguan_2_sub = function () {
        if (this.shiguan_3 == 6 || this.shiguan_2 == 1)
            return;
        this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 - 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        this.shiguan_2--;
        this.shiguan_3++;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    };
    GameUI.prototype.updateBtnState = function () {
        this.updateLbl();
        this.btnAddAndSub[1].getChildByName("disable").active = this.shiguan_1 == 1 || this.shiguan_3 == 6;
        this.btnAddAndSub[3].getChildByName("disable").active = this.shiguan_2 == 1 || this.shiguan_3 == 6;
        this.btnAddAndSub[0].getChildByName("disable").active = this.shiguan_1 == 6 || this.shiguan_3 == 1;
        this.btnAddAndSub[2].getChildByName("disable").active = this.shiguan_2 == 6 || this.shiguan_3 == 1;
    };
    GameUI.prototype.updateLbl = function () {
        this.shiguanLabel[0].string = this.shiguan_1.toString();
        this.shiguanLabel[1].string = this.shiguan_2.toString();
        this.shiguanLabel[2].string = this.shiguan_3.toString();
    };
    GameUI.prototype.setShiguan_ani = function (shiguan, fromNum, toNum) {
        var aniName = fromNum + "to" + toNum;
        var idleName = toNum + "idle";
        Tools_1.Tools.playSpine(shiguan.getComponent(sp.Skeleton), aniName, false, function () {
            Tools_1.Tools.playSpine(shiguan.getComponent(sp.Skeleton), idleName, true);
        });
    };
    GameUI.prototype.onClickShot = function () {
        var arr = [this.shiguan_1, this.shiguan_2, this.shiguan_3];
        arr.sort(function (a, b) {
            return a - b;
        });
        for (var i = 0; i < 3; i++) {
            this.setShiguan_idle(this.shiguanNode[i], arr[i]);
            this.setShiguan_lbl(this.shiguanLabel[i], arr[i]);
        }
        this.shiguan_1 = arr[0];
        this.shiguan_2 = arr[1];
        this.shiguan_3 = arr[2];
    };
    GameUI.prototype.onClickSubmit = function () {
    };
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "rightArea", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "shiguanNode", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "shiguanLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "btnAddAndSub", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "btn_xiangji", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "btn_tijiao", void 0);
    GameUI = __decorate([
        ccclass
    ], GameUI);
    return GameUI;
}(cc.Component));
exports.default = GameUI;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEdhbWVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRkFBb0Y7QUFDcEYscUZBQW9GO0FBQ3BGLCtEQUE4RDtBQUM5RCxrREFBaUQ7QUFFM0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUF1S0M7UUFyS1csZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixpQkFBVyxHQUFjLEVBQUUsQ0FBQztRQUU1QixrQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUU5QixrQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUU3QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixrQkFBWSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBbUpqRixDQUFDO0lBakpHLHVCQUFNLEdBQU47UUFDSSxpQ0FBZSxDQUFDLEVBQUUsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFB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SUFBSSxDQUFDOytDQUNrQjtJQUVwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNpQjtJQVpsQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBdUsxQjtJQUFELGFBQUM7Q0F2S0QsQUF1S0MsQ0F2S21DLEVBQUUsQ0FBQyxTQUFTLEdBdUsvQztrQkF2S29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0ZW5lck1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL0xpc3RlbmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTeW5jRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1N5bmNEYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1Rvb2xzXCI7XHJcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0V2ZW50VHlwZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmlnaHRBcmVhOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzaGlndWFuTm9kZTogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHNoaWd1YW5MYWJlbDogY2MuTGFiZWxbXSA9IFtdO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bkFkZEFuZFN1YjogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuX3hpYW5namk6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bl90aWppYW86IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgc2hpZ3Vhbl9wb3NZID0gLTI1MDtcclxuICAgIHByaXZhdGUgcmlnaHRBcmVhX3Bvc1ggPSA3MjM7XHJcbiAgICBwcml2YXRlIHNoaWd1YW5fMTogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgc2hpZ3Vhbl8yOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBzaGlndWFuXzM6IG51bWJlciA9IDY7XHJcblxyXG4gICAgcHJpdmF0ZSBhbGxUcnVlQXJyID0gW1sxLCAxLCA2XSwgWzEsIDIsIDVdLCBbMSwgMywgNF0sIFsyLCAyLCA0XSwgWzIsIDMsIDNdXTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5FTlRFUl9HQU1FLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5HQU1FX1JFQ09OTkVDVCwgdGhpcy5pbml0VUksIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub2ZmKEV2ZW50VHlwZS5FTlRFUl9HQU1FLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuR0FNRV9SRUNPTk5FQ1QsIHRoaXMuaW5pdFVJLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVudGVyR2FtZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGFydEFuaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFVJKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFNoaWd1YW4oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U2hpZ3VhbigpIHtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMSA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMiA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMjtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMyA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMztcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVswXSwgdGhpcy5zaGlndWFuXzEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMV0sIHRoaXMuc2hpZ3Vhbl8yKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2xibCh0aGlzLnNoaWd1YW5MYWJlbFswXSwgdGhpcy5zaGlndWFuXzEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9sYmwodGhpcy5zaGlndWFuTGFiZWxbMV0sIHRoaXMuc2hpZ3Vhbl8yKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fbGJsKHRoaXMuc2hpZ3VhbkxhYmVsWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lU3RhcnRBbmkoKSB7XHJcbiAgICAgICAgdGhpcy5yaWdodEFyZWEueCA9IDEyODA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaWd1YW5Ob2RlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbk5vZGVbaV0ueSA9IDYwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idG5feGlhbmdqaS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLmJ0bl90aWppYW8ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5yaWdodEFyZWEpLnRvKDAuNSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNoaWd1YW5Ob2RlWzBdKS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGlndWFuTm9kZVsxXSkuZGVsYXkoMC4yKS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGlndWFuTm9kZVsyXSkuZGVsYXkoMC40KS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ0bl94aWFuZ2ppKS50bygwLjUsIHsgb3BhY2l0eTogMjU1IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ0bl90aWppYW8pLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2hpZ3Vhbl9pZGxlKHNoaWd1YW46IGNjLk5vZGUsIG51bTogTnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFuaU5hbWUgPSBudW0gKyBcImlkbGVcIjtcclxuICAgICAgICBUb29scy5wbGF5U3BpbmUoc2hpZ3Vhbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCBhbmlOYW1lLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNoaWd1YW5fbGJsKHNoaWd1YW46IGNjLkxhYmVsLCBudW06IE51bWJlcikge1xyXG4gICAgICAgIHNoaWd1YW4uc3RyaW5nID0gbnVtLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hpZ3Vhbl8xX2FkZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlndWFuXzEgPj0gNiB8fCB0aGlzLnNoaWd1YW5fMyA8IDEpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMF0sIHRoaXMuc2hpZ3Vhbl8xLCB0aGlzLnNoaWd1YW5fMSArIDEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsyXSwgdGhpcy5zaGlndWFuXzMsIHRoaXMuc2hpZ3Vhbl8zIC0gMSk7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzErKztcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMy0tO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMSA9IHRoaXMuc2hpZ3Vhbl8xO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMyA9IHRoaXMuc2hpZ3Vhbl8zO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnRuU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTaGlndWFuXzFfc3ViKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoaWd1YW5fMyA9PSA2IHx8IHRoaXMuc2hpZ3Vhbl8xID09IDEpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMF0sIHRoaXMuc2hpZ3Vhbl8xLCB0aGlzLnNoaWd1YW5fMSAtIDEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsyXSwgdGhpcy5zaGlndWFuXzMsIHRoaXMuc2hpZ3Vhbl8zICsgMSk7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzEtLTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMysrO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMSA9IHRoaXMuc2hpZ3Vhbl8xO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMyA9IHRoaXMuc2hpZ3Vhbl8zO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnRuU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTaGlndWFuXzJfYWRkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoaWd1YW5fMiA+PSA2IHx8IHRoaXMuc2hpZ3Vhbl8zIDwgMSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsxXSwgdGhpcy5zaGlndWFuXzIsIHRoaXMuc2hpZ3Vhbl8yICsgMSk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMywgdGhpcy5zaGlndWFuXzMgLSAxKTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMisrO1xyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8zLS07XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8zID0gdGhpcy5zaGlndWFuXzM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1NoaWd1YW5fMl9zdWIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpZ3Vhbl8zID09IDYgfHwgdGhpcy5zaGlndWFuXzIgPT0gMSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsxXSwgdGhpcy5zaGlndWFuXzIsIHRoaXMuc2hpZ3Vhbl8yIC0gMSk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMywgdGhpcy5zaGlndWFuXzMgKyAxKTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMi0tO1xyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8zKys7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8zID0gdGhpcy5zaGlndWFuXzM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQnRuU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMYmwoKTtcclxuICAgICAgICB0aGlzLmJ0bkFkZEFuZFN1YlsxXS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdGhpcy5zaGlndWFuXzEgPT0gMSB8fCB0aGlzLnNoaWd1YW5fMyA9PSA2O1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzNdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0aGlzLnNoaWd1YW5fMiA9PSAxIHx8IHRoaXMuc2hpZ3Vhbl8zID09IDY7XHJcblxyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzBdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0aGlzLnNoaWd1YW5fMSA9PSA2IHx8IHRoaXMuc2hpZ3Vhbl8zID09IDE7XHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbMl0uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRoaXMuc2hpZ3Vhbl8yID09IDYgfHwgdGhpcy5zaGlndWFuXzMgPT0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxibCgpIHtcclxuICAgICAgICB0aGlzLnNoaWd1YW5MYWJlbFswXS5zdHJpbmcgPSB0aGlzLnNoaWd1YW5fMS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2hpZ3VhbkxhYmVsWzFdLnN0cmluZyA9IHRoaXMuc2hpZ3Vhbl8yLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuTGFiZWxbMl0uc3RyaW5nID0gdGhpcy5zaGlndWFuXzMudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNoaWd1YW5fYW5pKHNoaWd1YW46IGNjLk5vZGUsIGZyb21OdW06IE51bWJlciwgdG9OdW06IE51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmlOYW1lID0gZnJvbU51bSArIFwidG9cIiArIHRvTnVtO1xyXG4gICAgICAgIGxldCBpZGxlTmFtZSA9IHRvTnVtICsgXCJpZGxlXCI7XHJcbiAgICAgICAgVG9vbHMucGxheVNwaW5lKHNoaWd1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKSwgYW5pTmFtZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHNoaWd1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKSwgaWRsZU5hbWUsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1Nob3QoKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IFt0aGlzLnNoaWd1YW5fMSwgdGhpcy5zaGlndWFuXzIsIHRoaXMuc2hpZ3Vhbl8zXTtcclxuICAgICAgICBhcnIuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVtpXSwgYXJyW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2xibCh0aGlzLnNoaWd1YW5MYWJlbFtpXSwgYXJyW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzEgPSBhcnJbMF07XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzIgPSBhcnJbMV07XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzMgPSBhcnJbMl07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU3VibWl0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19