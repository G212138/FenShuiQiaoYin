
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
var SoundManager_1 = require("../../../../frame/scripts/Manager/SoundManager");
var SyncDataManager_1 = require("../../../../frame/scripts/Manager/SyncDataManager");
var Tools_1 = require("../../../../frame/scripts/Utils/Tools");
var UIHelp_1 = require("../../../../frame/scripts/Utils/UIHelp");
var EventType_1 = require("../../Data/EventType");
var SoundConfig_1 = require("./SoundConfig");
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
        _this.shot_node = null;
        _this.shotMask = null;
        _this.shiguan_posY = -250;
        _this.rightArea_posX = 723;
        _this.shiguan_1 = 1;
        _this.shiguan_2 = 1;
        _this.shiguan_3 = 6;
        _this.allTrueArr = [[1, 1, 6], [1, 2, 5], [1, 3, 4], [2, 2, 4], [2, 3, 3]];
        _this.isShot = false;
        return _this;
    }
    GameUI.prototype.onLoad = function () {
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.GAME_RECONNECT, this.initUI, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.GAME_REPLAY, this.handleEnterGame, this);
    };
    GameUI.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.GAME_RECONNECT, this.initUI, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.GAME_REPLAY, this.handleEnterGame, this);
    };
    GameUI.prototype.handleEnterGame = function () {
        this.initUI();
        this.shiguanLabel[0].string = "0";
        this.shiguanLabel[1].string = "0";
        this.shiguanLabel[2].string = "0";
        this.btnAddAndSub[1].getChildByName("disable").active = true;
        this.btnAddAndSub[3].getChildByName("disable").active = true;
        this.btnAddAndSub[0].getChildByName("disable").active = true;
        this.btnAddAndSub[2].getChildByName("disable").active = true;
        this.gameStartAni();
    };
    GameUI.prototype.initUI = function () {
        this.shotMask.active = false;
        this.initShiguan();
        this.updateBtnState();
        for (var i = 0; i < this.shiguanNode.length; i++) {
            this.shiguanNode[i].y = this.shiguan_posY;
        }
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = !SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shotEnable;
        this.btn_xiangji.opacity = 255;
        this.btn_tijiao.opacity = 255;
        var outLine = this.node.getChildByName("outLine");
        outLine.active = false;
        cc.Tween.stopAllByTarget(this.rightArea);
        this.rightArea.x = this.rightArea_posX;
        for (var i = 0; i < this.rightArea.childrenCount; i++) {
            var trueNode = this.rightArea.children[i];
            this.rightArea.children[i].active = false;
            var cuowu = trueNode.getChildByName("img_cuowu");
            cuowu.active = false;
        }
        for (var i = 0; i < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length; i++) {
            var arr = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr[i];
            var trueNode = this.rightArea.children[i];
            trueNode.active = true;
            trueNode.getChildByName("shiguan_1").getComponent(sp.Skeleton).animation = arr[0] + "idle";
            trueNode.getChildByName("shiguan_2").getComponent(sp.Skeleton).animation = arr[1] + "idle";
            trueNode.getChildByName("shiguan_3").getComponent(sp.Skeleton).animation = arr[2] + "idle";
            trueNode.getChildByName("lbl_shiguan_1").getComponent(cc.Label).string = arr[0].toString();
            trueNode.getChildByName("lbl_shiguan_2").getComponent(cc.Label).string = arr[1].toString();
            trueNode.getChildByName("lbl_shiguan_3").getComponent(cc.Label).string = arr[2].toString();
        }
        this.node.getChildByName("img_yinzhang").active = SyncDataManager_1.SyncDataManager.getSyncData().frameSyncData.isGameOver;
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
                _this.updateBtnState();
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
        SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["点击音效"]);
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = false;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shotEnable = true;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan) {
            this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 + 1);
        }
        else {
            this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 + 1);
            this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        }
        this.shiguan_1++;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan = false;
            this.shiguan_2 = 1;
            this.shiguan_3 = 8 - this.shiguan_1 - this.shiguan_2;
            this.setShiguan_idle(this.shiguanNode[1], this.shiguan_2);
            this.setShiguan_idle(this.shiguanNode[2], this.shiguan_3);
        }
        else {
            this.shiguan_3--;
        }
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_1 = this.shiguan_1;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    };
    GameUI.prototype.onClickShiguan_1_sub = function () {
        if (this.shiguan_3 == 6 || this.shiguan_1 == 1)
            return;
        SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["点击音效"]);
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = false;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shotEnable = true;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan) {
            this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 - 1);
        }
        else {
            this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 - 1);
            this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        }
        this.shiguan_1--;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan = false;
            this.shiguan_2 = 1;
            this.shiguan_3 = 8 - this.shiguan_1 - this.shiguan_2;
            this.setShiguan_idle(this.shiguanNode[1], this.shiguan_2);
            this.setShiguan_idle(this.shiguanNode[2], this.shiguan_3);
        }
        else {
            this.shiguan_3++;
        }
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_1 = this.shiguan_1;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    };
    GameUI.prototype.onClickShiguan_2_add = function () {
        if (this.shiguan_2 >= 6 || this.shiguan_3 < 1)
            return;
        SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["点击音效"]);
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = false;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shotEnable = true;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan) {
            this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 + 1);
        }
        else {
            this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 + 1);
            this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        }
        this.shiguan_2++;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan = false;
            this.shiguan_1 = 1;
            this.shiguan_3 = 8 - this.shiguan_1 - this.shiguan_2;
            this.setShiguan_idle(this.shiguanNode[0], this.shiguan_1);
            this.setShiguan_idle(this.shiguanNode[2], this.shiguan_3);
        }
        else {
            this.shiguan_3--;
        }
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    };
    GameUI.prototype.onClickShiguan_2_sub = function () {
        if (this.shiguan_3 == 6 || this.shiguan_2 == 1)
            return;
        SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["点击音效"]);
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = false;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shotEnable = true;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan) {
            this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 - 1);
        }
        else {
            this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 - 1);
            this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        }
        this.shiguan_2--;
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan = false;
            this.shiguan_1 = 1;
            this.shiguan_3 = 8 - this.shiguan_1 - this.shiguan_2;
            this.setShiguan_idle(this.shiguanNode[0], this.shiguan_1);
            this.setShiguan_idle(this.shiguanNode[2], this.shiguan_3);
        }
        else {
            this.shiguan_3++;
        }
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
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
        var _this = this;
        UIHelp_1.UIHelp.showMask();
        if (this.isShot)
            return;
        this.isShot = true;
        SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["点击音效"]);
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = true;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shotEnable = false;
        var arr = [this.shiguan_1, this.shiguan_2, this.shiguan_3];
        var newArr = [];
        arr.sort(function (a, b) {
            return a - b;
        });
        for (var i = 0; i < arr.length; i++) {
            newArr.push(arr[i]);
        }
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_1 = newArr[0];
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_2 = newArr[1];
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shiguan_3 = newArr[2];
        var oldArr = [this.shiguan_1, this.shiguan_2, this.shiguan_3];
        var need_change_index = [];
        for (var i = 0; i < newArr.length; i++) {
            if (oldArr[i] != newArr[i]) {
                need_change_index.push(i);
            }
        }
        if (need_change_index.length > 0) {
            for (var i = 0; i < need_change_index.length; i++) {
                var shiguan = this.shiguanNode[need_change_index[i]];
                var endPos = this.shiguanNode[need_change_index[need_change_index.length - i - 1]].position;
                this.changeShiguanAni(shiguan, endPos, newArr);
            }
            this.scheduleOnce(function () {
                _this.resetAni(newArr);
            }, 2);
        }
        else {
            this.resetAni(newArr);
        }
    };
    GameUI.prototype.changeShiguanAni = function (node, endPos, arr) {
        //用贝塞尔曲线移动到目标位置
        var startPos = node.position;
        var controlPos = cc.v3(startPos.x, endPos.y + 230);
        cc.tween(node)
            .then(cc.bezierTo(2, [cc.v2(startPos), cc.v2(controlPos), cc.v2(endPos)]).easing(cc.easeSineOut()))
            .call(function () {
            node.position = startPos;
        })
            .start();
    };
    GameUI.prototype.resetAni = function (arr) {
        var _this = this;
        for (var i = 0; i < 3; i++) {
            this.setShiguan_idle(this.shiguanNode[i], arr[i]);
            this.setShiguan_lbl(this.shiguanLabel[i], arr[i]);
        }
        this.shiguan_1 = arr[0];
        this.shiguan_2 = arr[1];
        this.shiguan_3 = arr[2];
        this.updateBtnState();
        //判断SyncDataManager.getSyncData().customSyncData.trueArr中是否有arr
        var isHave = false;
        var index = 0;
        for (var i = 0; i < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length; i++) {
            var trueArr = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr[i];
            if (trueArr[0] == arr[0] && trueArr[1] == arr[1] && trueArr[2] == arr[2]) {
                isHave = true;
                index = i;
                break;
            }
        }
        this.scheduleOnce(function () {
            SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["照相机咔嚓音效"]);
            SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["照相机咔嚓音效"], false, false, false);
            _this.shotMask.active = true;
            _this.shotMask.color = cc.Color.WHITE;
            _this.shotMask.opacity = 200;
            cc.tween(_this.shotMask).to(0.2, { opacity: 50 }).call(function () {
                _this.shotMask.color = cc.Color.BLACK;
                _this.shot_node.scale = 1;
                _this.shot_node.x = -300;
                _this.shot_node.y = 0;
                _this.shot_node.active = true;
                for (var i = 0; i < 3; i++) {
                    _this.setShiguan_idle(_this.shot_node.getChildByName("guan_" + (i + 1)), arr[i]);
                }
                if (isHave) {
                    _this.handleWrong(index);
                }
                else {
                    _this.handleTrue(arr);
                }
            }).start();
        }, 0.2);
    };
    GameUI.prototype.handleWrong = function (index) {
        var _this = this;
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.SUBMIT, false);
        SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["错误音效"]);
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["错误音效"], false, false, false);
        var trueNode = this.rightArea.children[index];
        this.isShot = false;
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = true;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.shotEnable = false;
        var cuowu = trueNode.getChildByName("img_cuowu");
        cuowu.active = true;
        cc.tween(cuowu).to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
            .to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
            .to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
            .call(function () {
            UIHelp_1.UIHelp.closeMask();
            _this.shotMask.active = false;
            _this.shot_node.active = false;
        }).start();
    };
    GameUI.prototype.handleTrue = function (arr) {
        var _this = this;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.needChangeShiguan = true;
        //先根据arr在allTrueArr中的数据找到最终的位置
        var trueIndex = 0;
        for (var i = 0; i < this.allTrueArr.length; i++) {
            var trueArr = this.allTrueArr[i];
            if (trueArr[0] == arr[0] && trueArr[1] == arr[1] && trueArr[2] == arr[2]) {
                trueIndex = i;
                break;
            }
        }
        for (var i = 0; i < this.allTrueArr.length; i++) {
            var trueArr = this.allTrueArr[i];
            var _loop_1 = function (j) {
                var arr_1 = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr[j];
                if (trueArr[0] == arr_1[0] && trueArr[1] == arr_1[1] && trueArr[2] == arr_1[2]) {
                    if (i > trueIndex) {
                        var trueNode_1 = this_1.rightArea.children[j];
                        var selfPos_1 = cc.v3(trueNode_1.position);
                        var nextTrueNode = this_1.rightArea.children[j + 1];
                        var endPos = nextTrueNode.position;
                        cc.tween(trueNode_1).delay(0.5).to(1, { position: endPos }).call(function () {
                            trueNode_1.position = selfPos_1;
                        }).start();
                    }
                }
            };
            var this_1 = this;
            for (var j = 0; j < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length; j++) {
                _loop_1(j);
            }
        }
        if (trueIndex + 1 <= SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length) {
            var _loop_2 = function (i) {
                var trueNode = this_2.rightArea.children[i];
                var selfPos = cc.v3(trueNode.position);
                var nextTrueNode = this_2.rightArea.children[i + 1];
                var endPos_1 = nextTrueNode.position;
                cc.tween(trueNode).delay(0.5).to(1, { position: endPos_1 }).call(function () {
                    trueNode.position = selfPos;
                }).start();
            };
            var this_2 = this;
            for (var i = trueIndex; i < this.rightArea.childrenCount - 1; i++) {
                _loop_2(i);
            }
            var targetPos = this.rightArea.children[trueIndex].position;
            var endPos = cc.v3(this.rightArea_posX, targetPos.y);
            cc.tween(this.shot_node).delay(0.5).to(1, { position: endPos, scale: 0.23 }).call(function () {
                _this.shot_node.active = false;
                _this.handleShowTrueNode(trueIndex, arr);
                _this.isShot = false;
                UIHelp_1.UIHelp.closeMask();
                _this.shotMask.active = false;
                _this.rightArea.children.forEach(function (node) {
                    node.active = false;
                });
                for (var i = 0; i < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length; i++) {
                    _this.handleShowTrueNode(i, SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr[i]);
                }
            }).start();
        }
        else {
            var targetIndex_1 = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length;
            var targetPos = this.rightArea.children[targetIndex_1].position;
            var endPos = cc.v3(this.rightArea_posX, targetPos.y);
            cc.tween(this.shot_node).delay(0.5).to(1, { position: endPos, scale: 0.23 }).call(function () {
                _this.shot_node.active = false;
                _this.handleShowTrueNode(targetIndex_1, arr);
                _this.isShot = false;
                UIHelp_1.UIHelp.closeMask();
                _this.shotMask.active = false;
            }).start();
        }
    };
    GameUI.prototype.handleShowTrueNode = function (index, arr) {
        var isHave = false;
        for (var i = 0; i < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length; i++) {
            var trueArr = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr[i];
            if (trueArr[0] == arr[0] && trueArr[1] == arr[1] && trueArr[2] == arr[2]) {
                isHave = true;
                break;
            }
        }
        if (!isHave) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.push(arr);
        }
        var tempTrueArr = [];
        for (var i = 0; i < this.allTrueArr.length; i++) {
            var allTrueArr = this.allTrueArr[i];
            for (var j = 0; j < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length; j++) {
                var trueArr = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr[j];
                if (trueArr[0] == allTrueArr[0] && trueArr[1] == allTrueArr[1] && trueArr[2] == allTrueArr[2]) {
                    tempTrueArr.push(trueArr);
                }
            }
        }
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr = tempTrueArr;
        var trueNode = this.rightArea.children[index];
        trueNode.active = true;
        trueNode.getChildByName("shiguan_1").getComponent(sp.Skeleton).animation = arr[0] + "idle";
        trueNode.getChildByName("shiguan_2").getComponent(sp.Skeleton).animation = arr[1] + "idle";
        trueNode.getChildByName("shiguan_3").getComponent(sp.Skeleton).animation = arr[2] + "idle";
        trueNode.getChildByName("lbl_shiguan_1").getComponent(cc.Label).string = arr[0].toString();
        trueNode.getChildByName("lbl_shiguan_2").getComponent(cc.Label).string = arr[1].toString();
        trueNode.getChildByName("lbl_shiguan_3").getComponent(cc.Label).string = arr[2].toString();
    };
    GameUI.prototype.onClickSubmit = function () {
        var _this = this;
        SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["点击音效"]);
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false, false);
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length < 5) {
            ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.SUBMIT, false);
            SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["错误音效"]);
            SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["错误音效"], false, false, false);
            UIHelp_1.UIHelp.showMask();
            UIHelp_1.UIHelp.showTip("还有分法没有找到哦！");
            // this.scheduleOnce(() => {
            //     UIHelp.closeMask();
            // }, 1);
            //this.rightArea轻微抖动
            cc.tween(this.rightArea).to(0.1, { x: this.rightArea_posX + 5 }).to(0.1, { x: this.rightArea_posX - 5 })
                .to(0.1, { x: this.rightArea_posX + 5 })
                .to(0.1, { x: this.rightArea_posX - 5 })
                .to(0.1, { x: this.rightArea_posX }).start();
            var outLine = this.node.getChildByName("outLine");
            outLine.active = true;
            cc.tween(outLine).to(0.1, { x: this.rightArea_posX + 5 }).to(0.1, { x: this.rightArea_posX - 5 })
                .to(0.1, { x: this.rightArea_posX + 5 })
                .to(0.1, { x: this.rightArea_posX - 5 })
                .to(0.1, { x: this.rightArea_posX }).start();
            cc.tween(outLine).to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
                .to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
                .to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
                .call(function () {
                UIHelp_1.UIHelp.closeMask();
            })
                .start();
        }
        else {
            ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.SUBMIT, true);
            var img_yinzhang = this.node.getChildByName("img_yinzhang");
            //img_yinzhang做一种往下砸的动画
            img_yinzhang.active = true;
            img_yinzhang.scale = 3;
            this.btn_xiangji.opacity = 0;
            this.btn_tijiao.opacity = 0;
            cc.tween(img_yinzhang).to(0.1, { scale: 1 }).call(function () {
                _this.gameOver();
            }).start();
        }
    };
    GameUI.prototype.gameOver = function () {
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.GAME_OVER);
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
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "shot_node", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "shotMask", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEdhbWVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRkFBb0Y7QUFDcEYsK0VBQThFO0FBQzlFLHFGQUFvRjtBQUNwRiwrREFBOEQ7QUFDOUQsaUVBQWdFO0FBQ2hFLGtEQUFpRDtBQUNqRCw2Q0FBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUE2aEJDO1FBM2hCVyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGlCQUFXLEdBQWMsRUFBRSxDQUFDO1FBRTVCLGtCQUFZLEdBQWUsRUFBRSxDQUFDO1FBRTlCLGtCQUFZLEdBQWMsRUFBRSxDQUFDO1FBRTdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixrQkFBWSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENB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QUNtQjtJQUV0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNtQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNrQjtJQUVwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNpQjtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNnQjtJQUVsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNlO0lBaEJoQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBNmhCMUI7SUFBRCxhQUFDO0NBN2hCRCxBQTZoQkMsQ0E3aEJtQyxFQUFFLENBQUMsU0FBUyxHQTZoQi9DO2tCQTdoQm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0ZW5lck1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL0xpc3RlbmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTeW5jRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1N5bmNEYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1Rvb2xzXCI7XHJcbmltcG9ydCB7IFVJSGVscCB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1VJSGVscFwiO1xyXG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9FdmVudFR5cGVcIjtcclxuaW1wb3J0IHsgU291bmRDb25maWcgfSBmcm9tIFwiLi9Tb3VuZENvbmZpZ1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmlnaHRBcmVhOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzaGlndWFuTm9kZTogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHNoaWd1YW5MYWJlbDogY2MuTGFiZWxbXSA9IFtdO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bkFkZEFuZFN1YjogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuX3hpYW5namk6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bl90aWppYW86IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNob3Rfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgc2hvdE1hc2s6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgc2hpZ3Vhbl9wb3NZID0gLTI1MDtcclxuICAgIHByaXZhdGUgcmlnaHRBcmVhX3Bvc1ggPSA3MjM7XHJcbiAgICBwcml2YXRlIHNoaWd1YW5fMTogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgc2hpZ3Vhbl8yOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBzaGlndWFuXzM6IG51bWJlciA9IDY7XHJcblxyXG4gICAgcHJpdmF0ZSBhbGxUcnVlQXJyID0gW1sxLCAxLCA2XSwgWzEsIDIsIDVdLCBbMSwgMywgNF0sIFsyLCAyLCA0XSwgWzIsIDMsIDNdXTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5FTlRFUl9HQU1FLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5HQU1FX1JFQ09OTkVDVCwgdGhpcy5pbml0VUksIHRoaXMpO1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihFdmVudFR5cGUuR0FNRV9SRVBMQVksIHRoaXMuaGFuZGxlRW50ZXJHYW1lLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuRU5URVJfR0FNRSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkdBTUVfUkVDT05ORUNULCB0aGlzLmluaXRVSSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuR0FNRV9SRVBMQVksIHRoaXMuaGFuZGxlRW50ZXJHYW1lLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVudGVyR2FtZSgpIHtcclxuICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgICAgIHRoaXMuc2hpZ3VhbkxhYmVsWzBdLnN0cmluZyA9IFwiMFwiO1xyXG4gICAgICAgIHRoaXMuc2hpZ3VhbkxhYmVsWzFdLnN0cmluZyA9IFwiMFwiO1xyXG4gICAgICAgIHRoaXMuc2hpZ3VhbkxhYmVsWzJdLnN0cmluZyA9IFwiMFwiO1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzFdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzNdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzBdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzJdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXJ0QW5pKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VUkoKSB7XHJcbiAgICAgICAgdGhpcy5zaG90TWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmluaXRTaGlndWFuKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpZ3Vhbk5vZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuTm9kZVtpXS55ID0gdGhpcy5zaGlndWFuX3Bvc1k7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWl6aGFvXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSAhU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hvdEVuYWJsZTtcclxuICAgICAgICB0aGlzLmJ0bl94aWFuZ2ppLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5idG5fdGlqaWFvLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgbGV0IG91dExpbmUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdXRMaW5lXCIpO1xyXG4gICAgICAgIG91dExpbmUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHRoaXMucmlnaHRBcmVhKTtcclxuICAgICAgICB0aGlzLnJpZ2h0QXJlYS54ID0gdGhpcy5yaWdodEFyZWFfcG9zWDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJ1ZU5vZGUgPSB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBjdW93dSA9IHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2N1b3d1XCIpO1xyXG4gICAgICAgICAgICBjdW93dS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFycltpXTtcclxuICAgICAgICAgICAgbGV0IHRydWVOb2RlID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8xXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzBdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8yXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzFdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8zXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzJdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclswXS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9zaGlndWFuXzJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBhcnJbMV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdHJ1ZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfc2hpZ3Vhbl8zXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYXJyWzJdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ195aW56aGFuZ1wiKS5hY3RpdmUgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5mcmFtZVN5bmNEYXRhLmlzR2FtZU92ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U2hpZ3VhbigpIHtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMSA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMiA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMjtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMyA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMztcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVswXSwgdGhpcy5zaGlndWFuXzEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMV0sIHRoaXMuc2hpZ3Vhbl8yKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2xibCh0aGlzLnNoaWd1YW5MYWJlbFswXSwgdGhpcy5zaGlndWFuXzEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9sYmwodGhpcy5zaGlndWFuTGFiZWxbMV0sIHRoaXMuc2hpZ3Vhbl8yKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fbGJsKHRoaXMuc2hpZ3VhbkxhYmVsWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lU3RhcnRBbmkoKSB7XHJcbiAgICAgICAgdGhpcy5yaWdodEFyZWEueCA9IDEyODA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaWd1YW5Ob2RlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbk5vZGVbaV0ueSA9IDYwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idG5feGlhbmdqaS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLmJ0bl90aWppYW8ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5yaWdodEFyZWEpLnRvKDAuNSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNoaWd1YW5Ob2RlWzBdKS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGlndWFuTm9kZVsxXSkuZGVsYXkoMC4yKS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGlndWFuTm9kZVsyXSkuZGVsYXkoMC40KS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ0bl94aWFuZ2ppKS50bygwLjUsIHsgb3BhY2l0eTogMjU1IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ0bl90aWppYW8pLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQnRuU3RhdGUoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2hpZ3Vhbl9pZGxlKHNoaWd1YW46IGNjLk5vZGUsIG51bTogTnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFuaU5hbWUgPSBudW0gKyBcImlkbGVcIjtcclxuICAgICAgICBUb29scy5wbGF5U3BpbmUoc2hpZ3Vhbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCBhbmlOYW1lLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNoaWd1YW5fbGJsKHNoaWd1YW46IGNjLkxhYmVsLCBudW06IE51bWJlcikge1xyXG4gICAgICAgIHNoaWd1YW4uc3RyaW5nID0gbnVtLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hpZ3Vhbl8xX2FkZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlndWFuXzEgPj0gNiB8fCB0aGlzLnNoaWd1YW5fMyA8IDEpIHJldHVybjtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNob3RFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIGlmIChTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5uZWVkQ2hhbmdlU2hpZ3Vhbikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMF0sIHRoaXMuc2hpZ3Vhbl8xLCB0aGlzLnNoaWd1YW5fMSArIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVswXSwgdGhpcy5zaGlndWFuXzEsIHRoaXMuc2hpZ3Vhbl8xICsgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsyXSwgdGhpcy5zaGlndWFuXzMsIHRoaXMuc2hpZ3Vhbl8zIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8xKys7XHJcbiAgICAgICAgaWYgKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLm5lZWRDaGFuZ2VTaGlndWFuKSB7XHJcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLm5lZWRDaGFuZ2VTaGlndWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbl8yID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzMgPSA4IC0gdGhpcy5zaGlndWFuXzEgLSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVsxXSwgdGhpcy5zaGlndWFuXzIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzMtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8xID0gdGhpcy5zaGlndWFuXzE7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8zID0gdGhpcy5zaGlndWFuXzM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1NoaWd1YW5fMV9zdWIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpZ3Vhbl8zID09IDYgfHwgdGhpcy5zaGlndWFuXzEgPT0gMSkgcmV0dXJuO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5zdG9wU291bmRCeU5hbWUoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0pO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcGFpemhhb1wiKS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hvdEVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLm5lZWRDaGFuZ2VTaGlndWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVswXSwgdGhpcy5zaGlndWFuXzEsIHRoaXMuc2hpZ3Vhbl8xIC0gMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzBdLCB0aGlzLnNoaWd1YW5fMSwgdGhpcy5zaGlndWFuXzEgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMywgdGhpcy5zaGlndWFuXzMgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8xLS07XHJcbiAgICAgICAgaWYgKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLm5lZWRDaGFuZ2VTaGlndWFuKSB7XHJcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLm5lZWRDaGFuZ2VTaGlndWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbl8yID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzMgPSA4IC0gdGhpcy5zaGlndWFuXzEgLSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVsxXSwgdGhpcy5zaGlndWFuXzIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzMrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8xID0gdGhpcy5zaGlndWFuXzE7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8zID0gdGhpcy5zaGlndWFuXzM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1NoaWd1YW5fMl9hZGQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpZ3Vhbl8yID49IDYgfHwgdGhpcy5zaGlndWFuXzMgPCAxKSByZXR1cm47XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWl6aGFvXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaG90RW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEubmVlZENoYW5nZVNoaWd1YW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzFdLCB0aGlzLnNoaWd1YW5fMiwgdGhpcy5zaGlndWFuXzIgKyAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMV0sIHRoaXMuc2hpZ3Vhbl8yLCB0aGlzLnNoaWd1YW5fMiArIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMl0sIHRoaXMuc2hpZ3Vhbl8zLCB0aGlzLnNoaWd1YW5fMyAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzIrKztcclxuICAgICAgICBpZiAoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEubmVlZENoYW5nZVNoaWd1YW4pIHtcclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEubmVlZENoYW5nZVNoaWd1YW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzEgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWd1YW5fMyA9IDggLSB0aGlzLnNoaWd1YW5fMSAtIHRoaXMuc2hpZ3Vhbl8yO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzBdLCB0aGlzLnNoaWd1YW5fMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMl0sIHRoaXMuc2hpZ3Vhbl8zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNoaWd1YW5fMy0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzMgPSB0aGlzLnNoaWd1YW5fMztcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hpZ3Vhbl8yX3N1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlndWFuXzMgPT0gNiB8fCB0aGlzLnNoaWd1YW5fMiA9PSAxKSByZXR1cm47XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWl6aGFvXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaG90RW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEubmVlZENoYW5nZVNoaWd1YW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzFdLCB0aGlzLnNoaWd1YW5fMiwgdGhpcy5zaGlndWFuXzIgLSAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMV0sIHRoaXMuc2hpZ3Vhbl8yLCB0aGlzLnNoaWd1YW5fMiAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMl0sIHRoaXMuc2hpZ3Vhbl8zLCB0aGlzLnNoaWd1YW5fMyArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzItLTtcclxuICAgICAgICBpZiAoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEubmVlZENoYW5nZVNoaWd1YW4pIHtcclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEubmVlZENoYW5nZVNoaWd1YW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzEgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWd1YW5fMyA9IDggLSB0aGlzLnNoaWd1YW5fMSAtIHRoaXMuc2hpZ3Vhbl8yO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzBdLCB0aGlzLnNoaWd1YW5fMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMl0sIHRoaXMuc2hpZ3Vhbl8zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNoaWd1YW5fMysrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzMgPSB0aGlzLnNoaWd1YW5fMztcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVCdG5TdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxibCgpO1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzFdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0aGlzLnNoaWd1YW5fMSA9PSAxIHx8IHRoaXMuc2hpZ3Vhbl8zID09IDY7XHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbM10uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRoaXMuc2hpZ3Vhbl8yID09IDEgfHwgdGhpcy5zaGlndWFuXzMgPT0gNjtcclxuXHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbMF0uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRoaXMuc2hpZ3Vhbl8xID09IDYgfHwgdGhpcy5zaGlndWFuXzMgPT0gMTtcclxuICAgICAgICB0aGlzLmJ0bkFkZEFuZFN1YlsyXS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdGhpcy5zaGlndWFuXzIgPT0gNiB8fCB0aGlzLnNoaWd1YW5fMyA9PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlTGJsKCkge1xyXG4gICAgICAgIHRoaXMuc2hpZ3VhbkxhYmVsWzBdLnN0cmluZyA9IHRoaXMuc2hpZ3Vhbl8xLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuTGFiZWxbMV0uc3RyaW5nID0gdGhpcy5zaGlndWFuXzIudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5MYWJlbFsyXS5zdHJpbmcgPSB0aGlzLnNoaWd1YW5fMy50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2hpZ3Vhbl9hbmkoc2hpZ3VhbjogY2MuTm9kZSwgZnJvbU51bTogTnVtYmVyLCB0b051bTogTnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFuaU5hbWUgPSBmcm9tTnVtICsgXCJ0b1wiICsgdG9OdW07XHJcbiAgICAgICAgbGV0IGlkbGVOYW1lID0gdG9OdW0gKyBcImlkbGVcIjtcclxuICAgICAgICBUb29scy5wbGF5U3BpbmUoc2hpZ3Vhbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCBhbmlOYW1lLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBUb29scy5wbGF5U3BpbmUoc2hpZ3Vhbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCBpZGxlTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1Nob3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgb25DbGlja1Nob3QoKSB7XHJcbiAgICAgICAgVUlIZWxwLnNob3dNYXNrKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaG90KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1Nob3QgPSB0cnVlO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5zdG9wU291bmRCeU5hbWUoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0pO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcGFpemhhb1wiKS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaG90RW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGFyciA9IFt0aGlzLnNoaWd1YW5fMSwgdGhpcy5zaGlndWFuXzIsIHRoaXMuc2hpZ3Vhbl8zXTtcclxuICAgICAgICBsZXQgbmV3QXJyID0gW107XHJcbiAgICAgICAgYXJyLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ld0Fyci5wdXNoKGFycltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMSA9IG5ld0FyclswXTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSBuZXdBcnJbMV07XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8zID0gbmV3QXJyWzJdO1xyXG4gICAgICAgIGxldCBvbGRBcnIgPSBbdGhpcy5zaGlndWFuXzEsIHRoaXMuc2hpZ3Vhbl8yLCB0aGlzLnNoaWd1YW5fM107XHJcblxyXG4gICAgICAgIGxldCBuZWVkX2NoYW5nZV9pbmRleCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRBcnJbaV0gIT0gbmV3QXJyW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBuZWVkX2NoYW5nZV9pbmRleC5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmVlZF9jaGFuZ2VfaW5kZXgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5lZWRfY2hhbmdlX2luZGV4Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hpZ3VhbiA9IHRoaXMuc2hpZ3Vhbk5vZGVbbmVlZF9jaGFuZ2VfaW5kZXhbaV1dO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFBvcyA9IHRoaXMuc2hpZ3Vhbk5vZGVbbmVlZF9jaGFuZ2VfaW5kZXhbbmVlZF9jaGFuZ2VfaW5kZXgubGVuZ3RoIC0gaSAtIDFdXS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2hpZ3VhbkFuaShzaGlndWFuLCBlbmRQb3MsIG5ld0Fycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldEFuaShuZXdBcnIpO1xyXG4gICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0QW5pKG5ld0Fycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlU2hpZ3VhbkFuaShub2RlOiBjYy5Ob2RlLCBlbmRQb3M6IGNjLlZlYzMsIGFycjogbnVtYmVyW10pIHtcclxuICAgICAgICAvL+eUqOi0neWhnuWwlOabsue6v+enu+WKqOWIsOebruagh+S9jee9rlxyXG4gICAgICAgIGxldCBzdGFydFBvcyA9IG5vZGUucG9zaXRpb247XHJcbiAgICAgICAgbGV0IGNvbnRyb2xQb3MgPSBjYy52MyhzdGFydFBvcy54LCBlbmRQb3MueSArIDIzMCk7XHJcbiAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgLnRoZW4oY2MuYmV6aWVyVG8oMiwgW2NjLnYyKHN0YXJ0UG9zKSwgY2MudjIoY29udHJvbFBvcyksIGNjLnYyKGVuZFBvcyldKS5lYXNpbmcoY2MuZWFzZVNpbmVPdXQoKSkpXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBzdGFydFBvcztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldEFuaShhcnI6IG51bWJlcltdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVtpXSwgYXJyW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2xibCh0aGlzLnNoaWd1YW5MYWJlbFtpXSwgYXJyW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzEgPSBhcnJbMF07XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzIgPSBhcnJbMV07XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzMgPSBhcnJbMl07XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG4gICAgICAgIC8v5Yik5patU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFycuS4reaYr+WQpuaciWFyclxyXG4gICAgICAgIGxldCBpc0hhdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJ1ZUFyciA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnJbaV07XHJcbiAgICAgICAgICAgIGlmICh0cnVlQXJyWzBdID09IGFyclswXSAmJiB0cnVlQXJyWzFdID09IGFyclsxXSAmJiB0cnVlQXJyWzJdID09IGFyclsyXSkge1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5zdG9wU291bmRCeU5hbWUoU291bmRDb25maWcuc291ZGxpc3RbXCLnhafnm7jmnLrlkpTlmpPpn7PmlYhcIl0pO1xyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueFp+ebuOacuuWSlOWak+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdE1hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaG90TWFzay5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICB0aGlzLnNob3RNYXNrLm9wYWNpdHkgPSAyMDA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hvdE1hc2spLnRvKDAuMiwgeyBvcGFjaXR5OiA1MCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdE1hc2suY29sb3IgPSBjYy5Db2xvci5CTEFDSztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3Rfbm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3Rfbm9kZS54ID0gLTMwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdF9ub2RlLnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90X25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaG90X25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJndWFuX1wiICsgKGkgKyAxKSksIGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzSGF2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlV3JvbmcoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVRydWUoYXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9LCAwLjIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlV3JvbmcoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5kaXNwYXRjaChFdmVudFR5cGUuU1VCTUlULCBmYWxzZSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIumUmeivr+mfs+aViFwiXSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLplJnor6/pn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIGxldCB0cnVlTm9kZSA9IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2luZGV4XTtcclxuICAgICAgICB0aGlzLmlzU2hvdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWl6aGFvXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNob3RFbmFibGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgY3Vvd3UgPSB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19jdW93dVwiKTtcclxuICAgICAgICBjdW93dS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNjLnR3ZWVuKGN1b3d1KS50bygwLjEsIHsgb3BhY2l0eTogMjU1IH0pLmRlbGF5KDAuMTUpLnRvKDAuMSwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgIC50bygwLjEsIHsgb3BhY2l0eTogMjU1IH0pLmRlbGF5KDAuMTUpLnRvKDAuMSwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgIC50bygwLjEsIHsgb3BhY2l0eTogMjU1IH0pLmRlbGF5KDAuMTUpLnRvKDAuMSwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIFVJSGVscC5jbG9zZU1hc2soKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdE1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3Rfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUcnVlKGFycjogbnVtYmVyW10pIHtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5uZWVkQ2hhbmdlU2hpZ3VhbiA9IHRydWU7XHJcblxyXG4gICAgICAgIC8v5YWI5qC55o2uYXJy5ZyoYWxsVHJ1ZUFycuS4reeahOaVsOaNruaJvuWIsOacgOe7iOeahOS9jee9rlxyXG4gICAgICAgIGxldCB0cnVlSW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxUcnVlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cnVlQXJyID0gdGhpcy5hbGxUcnVlQXJyW2ldO1xyXG4gICAgICAgICAgICBpZiAodHJ1ZUFyclswXSA9PSBhcnJbMF0gJiYgdHJ1ZUFyclsxXSA9PSBhcnJbMV0gJiYgdHJ1ZUFyclsyXSA9PSBhcnJbMl0pIHtcclxuICAgICAgICAgICAgICAgIHRydWVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFsbFRydWVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRydWVBcnIgPSB0aGlzLmFsbFRydWVBcnJbaV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnJbal07XHJcbiAgICAgICAgICAgICAgICBpZiAodHJ1ZUFyclswXSA9PSBhcnJbMF0gJiYgdHJ1ZUFyclsxXSA9PSBhcnJbMV0gJiYgdHJ1ZUFyclsyXSA9PSBhcnJbMl0pIHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gdHJ1ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cnVlTm9kZSA9IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZlBvcyA9IGNjLnYzKHRydWVOb2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRUcnVlTm9kZSA9IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2ogKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZFBvcyA9IG5leHRUcnVlTm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odHJ1ZU5vZGUpLmRlbGF5KDAuNSkudG8oMSwgeyBwb3NpdGlvbjogZW5kUG9zIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZU5vZGUucG9zaXRpb24gPSBzZWxmUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRydWVJbmRleCArIDEgPD0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRydWVJbmRleDsgaSA8IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuQ291bnQgLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cnVlTm9kZSA9IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGZQb3MgPSBjYy52Myh0cnVlTm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFRydWVOb2RlID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5baSArIDFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFBvcyA9IG5leHRUcnVlTm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRydWVOb2RlKS5kZWxheSgwLjUpLnRvKDEsIHsgcG9zaXRpb246IGVuZFBvcyB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0cnVlTm9kZS5wb3NpdGlvbiA9IHNlbGZQb3M7XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlblt0cnVlSW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gY2MudjModGhpcy5yaWdodEFyZWFfcG9zWCwgdGFyZ2V0UG9zLnkpO1xyXG5cclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaG90X25vZGUpLmRlbGF5KDAuNSkudG8oMSwgeyBwb3NpdGlvbjogZW5kUG9zLCBzY2FsZTogMC4yMyB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTaG93VHJ1ZU5vZGUodHJ1ZUluZGV4LCBhcnIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Nob3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFVJSGVscC5jbG9zZU1hc2soKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdE1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2hvd1RydWVOb2RlKGksIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRJbmRleCA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5bdGFyZ2V0SW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gY2MudjModGhpcy5yaWdodEFyZWFfcG9zWCwgdGFyZ2V0UG9zLnkpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNob3Rfbm9kZSkuZGVsYXkoMC41KS50bygxLCB7IHBvc2l0aW9uOiBlbmRQb3MsIHNjYWxlOiAwLjIzIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNob3dUcnVlTm9kZSh0YXJnZXRJbmRleCwgYXJyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTaG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBVSUhlbHAuY2xvc2VNYXNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3RNYXNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVNob3dUcnVlTm9kZShpbmRleCwgYXJyOiBudW1iZXJbXSkge1xyXG4gICAgICAgIGxldCBpc0hhdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRydWVBcnIgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyW2ldO1xyXG4gICAgICAgICAgICBpZiAodHJ1ZUFyclswXSA9PSBhcnJbMF0gJiYgdHJ1ZUFyclsxXSA9PSBhcnJbMV0gJiYgdHJ1ZUFyclsyXSA9PSBhcnJbMl0pIHtcclxuICAgICAgICAgICAgICAgIGlzSGF2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzSGF2ZSkge1xyXG4gICAgICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyLnB1c2goYXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0ZW1wVHJ1ZUFyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxUcnVlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxUcnVlQXJyID0gdGhpcy5hbGxUcnVlQXJyW2ldO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cnVlQXJyID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFycltqXTtcclxuICAgICAgICAgICAgICAgIGlmICh0cnVlQXJyWzBdID09IGFsbFRydWVBcnJbMF0gJiYgdHJ1ZUFyclsxXSA9PSBhbGxUcnVlQXJyWzFdICYmIHRydWVBcnJbMl0gPT0gYWxsVHJ1ZUFyclsyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBUcnVlQXJyLnB1c2godHJ1ZUFycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyciA9IHRlbXBUcnVlQXJyO1xyXG5cclxuICAgICAgICBsZXQgdHJ1ZU5vZGUgPSB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbltpbmRleF07XHJcbiAgICAgICAgdHJ1ZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoaWd1YW5fMVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IGFyclswXSArIFwiaWRsZVwiO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8yXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzFdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgdHJ1ZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzaGlndWFuXzNcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5hbmltYXRpb24gPSBhcnJbMl0gKyBcImlkbGVcIjtcclxuICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9zaGlndWFuXzFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBhcnJbMF0udG9TdHJpbmcoKTtcclxuICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9zaGlndWFuXzJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBhcnJbMV0udG9TdHJpbmcoKTtcclxuICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9zaGlndWFuXzNcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBhcnJbMl0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTdWJtaXQoKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIGlmIChTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyLmxlbmd0aCA8IDUpIHtcclxuICAgICAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5TVUJNSVQsIGZhbHNlKTtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIumUmeivr+mfs+aViFwiXSk7XHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi6ZSZ6K+v6Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgVUlIZWxwLnNob3dNYXNrKCk7XHJcbiAgICAgICAgICAgIFVJSGVscC5zaG93VGlwKFwi6L+Y5pyJ5YiG5rOV5rKh5pyJ5om+5Yiw5ZOm77yBXCIpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICBVSUhlbHAuY2xvc2VNYXNrKCk7XHJcbiAgICAgICAgICAgIC8vIH0sIDEpO1xyXG4gICAgICAgICAgICAvL3RoaXMucmlnaHRBcmVh6L275b6u5oqW5YqoXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucmlnaHRBcmVhKS50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCArIDUgfSkudG8oMC4xLCB7IHg6IHRoaXMucmlnaHRBcmVhX3Bvc1ggLSA1IH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IHg6IHRoaXMucmlnaHRBcmVhX3Bvc1ggKyA1IH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IHg6IHRoaXMucmlnaHRBcmVhX3Bvc1ggLSA1IH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IHg6IHRoaXMucmlnaHRBcmVhX3Bvc1ggfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgbGV0IG91dExpbmUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdXRMaW5lXCIpO1xyXG4gICAgICAgICAgICBvdXRMaW5lLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG91dExpbmUpLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYICsgNSB9KS50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCAtIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCArIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCAtIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBjYy50d2VlbihvdXRMaW5lKS50bygwLjEsIHsgb3BhY2l0eTogMjU1IH0pLmRlbGF5KDAuMTUpLnRvKDAuMSwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IG9wYWNpdHk6IDI1NSB9KS5kZWxheSgwLjE1KS50bygwLjEsIHsgb3BhY2l0eTogMCB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyBvcGFjaXR5OiAyNTUgfSkuZGVsYXkoMC4xNSkudG8oMC4xLCB7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBVSUhlbHAuY2xvc2VNYXNrKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5TVUJNSVQsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgaW1nX3lpbnpoYW5nID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3lpbnpoYW5nXCIpO1xyXG4gICAgICAgICAgICAvL2ltZ195aW56aGFuZ+WBmuS4gOenjeW+gOS4i+eguOeahOWKqOeUu1xyXG4gICAgICAgICAgICBpbWdfeWluemhhbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaW1nX3lpbnpoYW5nLnNjYWxlID0gMztcclxuICAgICAgICAgICAgdGhpcy5idG5feGlhbmdqaS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5idG5fdGlqaWFvLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBjYy50d2VlbihpbWdfeWluemhhbmcpLnRvKDAuMSwgeyBzY2FsZTogMSB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lT3ZlcigpIHtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIuZGlzcGF0Y2goRXZlbnRUeXBlLkdBTUVfT1ZFUik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==