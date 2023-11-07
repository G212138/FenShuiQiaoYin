
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
        _this.shiguan_posY = -250;
        _this.rightArea_posX = 723;
        _this.shiguan_1 = 1;
        _this.shiguan_2 = 1;
        _this.shiguan_3 = 6;
        _this.allTrueArr = [[1, 1, 6], [1, 2, 5], [1, 3, 4], [2, 2, 4], [2, 3, 3]];
        _this.isShot = false;
        _this.needChangeShiguan = false;
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
        if (this.needChangeShiguan) {
            this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 + 1);
        }
        else {
            this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 + 1);
            this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        }
        this.shiguan_1++;
        if (this.needChangeShiguan) {
            this.needChangeShiguan = false;
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
        if (this.needChangeShiguan) {
            this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 - 1);
        }
        else {
            this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 - 1);
            this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        }
        this.shiguan_1--;
        if (this.needChangeShiguan) {
            this.needChangeShiguan = false;
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
        if (this.needChangeShiguan) {
            this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 + 1);
        }
        else {
            this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 + 1);
            this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        }
        this.shiguan_2++;
        if (this.needChangeShiguan) {
            this.needChangeShiguan = false;
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
        if (this.needChangeShiguan) {
            this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 - 1);
        }
        else {
            this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 - 1);
            this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        }
        this.shiguan_2--;
        if (this.needChangeShiguan) {
            this.needChangeShiguan = false;
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
        console.log("arr1 = ", newArr);
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
        }
        else {
            this.resetAni(newArr);
        }
    };
    GameUI.prototype.changeShiguanAni = function (node, endPos, arr) {
        var _this = this;
        //用贝塞尔曲线移动到目标位置
        var startPos = node.position;
        var controlPos = cc.v3(startPos.x, endPos.y + 230);
        cc.tween(node)
            .then(cc.bezierTo(2, [cc.v2(startPos), cc.v2(controlPos), cc.v2(endPos)]).easing(cc.easeSineOut()))
            .call(function () {
            node.position = startPos;
            _this.resetAni(arr);
        })
            .start();
    };
    GameUI.prototype.resetAni = function (arr) {
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
        SoundManager_1.SoundManager.stopSoundByName(SoundConfig_1.SoundConfig.soudlist["照相机咔嚓音效"]);
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["照相机咔嚓音效"], false, false, false);
        if (isHave) {
            this.handleWrong(index);
        }
        else {
            this.handleTrue(arr);
        }
    };
    GameUI.prototype.handleWrong = function (index) {
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
        })
            .start();
    };
    GameUI.prototype.handleTrue = function (arr) {
        var _this = this;
        this.needChangeShiguan = true;
        this.shot_node.scale = 1;
        this.shot_node.x = -300;
        this.shot_node.y = 0;
        this.shot_node.active = true;
        var targetIndex = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length;
        //this.shot_node移动到rightArea.children[targetIndex]位置
        console.log("SyncDataManager.getSyncData().customSyncData.trueArr = " + SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr);
        var targetPos = this.rightArea.children[targetIndex].position;
        var endPos = cc.v3(this.rightArea_posX, targetPos.y);
        cc.tween(this.shot_node).to(0.5, { position: endPos, scale: 0.23 }).call(function () {
            _this.shot_node.active = false;
            _this.handleShowTrueNode(targetIndex, arr);
            _this.isShot = false;
            UIHelp_1.UIHelp.closeMask();
        }).start();
    };
    GameUI.prototype.handleShowTrueNode = function (index, arr) {
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.push(arr);
        console.log("arr = " + arr);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEdhbWVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRkFBb0Y7QUFDcEYsK0VBQThFO0FBQzlFLHFGQUFvRjtBQUNwRiwrREFBOEQ7QUFDOUQsaUVBQWdFO0FBQ2hFLGtEQUFpRDtBQUNqRCw2Q0FBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUEyYkM7UUF6YlcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixpQkFBVyxHQUFjLEVBQUUsQ0FBQztRQUU1QixrQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUU5QixrQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUU3QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGtCQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsb0JBQWMsR0FBRyxHQUFHLENBQUM7UUFDckIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFFdEIsZ0JBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQStPckUsWUFBTSxHQUFZLEtBQUssQ0FB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QUFFLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDM0YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQzNGLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNGLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNGLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzlGO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztJQUM3RyxDQUFDO0lBRU8sNEJBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENB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QUMsSUFBSSxDQUFDOzhDQUNpQjtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNnQjtJQWRqQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBMmIxQjtJQUFELGFBQUM7Q0EzYkQsQUEyYkMsQ0EzYm1DLEVBQUUsQ0FBQyxTQUFTLEdBMmIvQztrQkEzYm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0ZW5lck1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL0xpc3RlbmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTeW5jRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1N5bmNEYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1Rvb2xzXCI7XHJcbmltcG9ydCB7IFVJSGVscCB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1VJSGVscFwiO1xyXG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9FdmVudFR5cGVcIjtcclxuaW1wb3J0IHsgU291bmRDb25maWcgfSBmcm9tIFwiLi9Tb3VuZENvbmZpZ1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmlnaHRBcmVhOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzaGlndWFuTm9kZTogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHNoaWd1YW5MYWJlbDogY2MuTGFiZWxbXSA9IFtdO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bkFkZEFuZFN1YjogY2MuTm9kZVtdID0gW107XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuX3hpYW5namk6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bl90aWppYW86IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNob3Rfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzaGlndWFuX3Bvc1kgPSAtMjUwO1xyXG4gICAgcHJpdmF0ZSByaWdodEFyZWFfcG9zWCA9IDcyMztcclxuICAgIHByaXZhdGUgc2hpZ3Vhbl8xOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBzaGlndWFuXzI6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHNoaWd1YW5fMzogbnVtYmVyID0gNjtcclxuXHJcbiAgICBwcml2YXRlIGFsbFRydWVBcnIgPSBbWzEsIDEsIDZdLCBbMSwgMiwgNV0sIFsxLCAzLCA0XSwgWzIsIDIsIDRdLCBbMiwgMywgM11dO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub24oRXZlbnRUeXBlLkVOVEVSX0dBTUUsIHRoaXMuaGFuZGxlRW50ZXJHYW1lLCB0aGlzKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub24oRXZlbnRUeXBlLkdBTUVfUkVDT05ORUNULCB0aGlzLmluaXRVSSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5HQU1FX1JFUExBWSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub2ZmKEV2ZW50VHlwZS5FTlRFUl9HQU1FLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuR0FNRV9SRUNPTk5FQ1QsIHRoaXMuaW5pdFVJLCB0aGlzKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub2ZmKEV2ZW50VHlwZS5HQU1FX1JFUExBWSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRW50ZXJHYW1lKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFVJKCk7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuTGFiZWxbMF0uc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuTGFiZWxbMV0uc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuTGFiZWxbMl0uc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbMV0uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbM10uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbMF0uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbMl0uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhcnRBbmkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRVSSgpIHtcclxuICAgICAgICB0aGlzLmluaXRTaGlndWFuKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpZ3Vhbk5vZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuTm9kZVtpXS55ID0gdGhpcy5zaGlndWFuX3Bvc1k7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWl6aGFvXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSAhU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hvdEVuYWJsZTtcclxuICAgICAgICB0aGlzLmJ0bl94aWFuZ2ppLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5idG5fdGlqaWFvLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgbGV0IG91dExpbmUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdXRMaW5lXCIpO1xyXG4gICAgICAgIG91dExpbmUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHRoaXMucmlnaHRBcmVhKTtcclxuICAgICAgICB0aGlzLnJpZ2h0QXJlYS54ID0gdGhpcy5yaWdodEFyZWFfcG9zWDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJ1ZU5vZGUgPSB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBjdW93dSA9IHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2N1b3d1XCIpO1xyXG4gICAgICAgICAgICBjdW93dS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFycltpXTtcclxuICAgICAgICAgICAgbGV0IHRydWVOb2RlID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8xXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzBdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8yXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzFdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8zXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzJdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclswXS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9zaGlndWFuXzJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBhcnJbMV0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdHJ1ZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfc2hpZ3Vhbl8zXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYXJyWzJdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ195aW56aGFuZ1wiKS5hY3RpdmUgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5mcmFtZVN5bmNEYXRhLmlzR2FtZU92ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U2hpZ3VhbigpIHtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMSA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMiA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMjtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMyA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMztcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVswXSwgdGhpcy5zaGlndWFuXzEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMV0sIHRoaXMuc2hpZ3Vhbl8yKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2xibCh0aGlzLnNoaWd1YW5MYWJlbFswXSwgdGhpcy5zaGlndWFuXzEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9sYmwodGhpcy5zaGlndWFuTGFiZWxbMV0sIHRoaXMuc2hpZ3Vhbl8yKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fbGJsKHRoaXMuc2hpZ3VhbkxhYmVsWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lU3RhcnRBbmkoKSB7XHJcbiAgICAgICAgdGhpcy5yaWdodEFyZWEueCA9IDEyODA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaWd1YW5Ob2RlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbk5vZGVbaV0ueSA9IDYwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idG5feGlhbmdqaS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLmJ0bl90aWppYW8ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5yaWdodEFyZWEpLnRvKDAuNSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNoaWd1YW5Ob2RlWzBdKS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGlndWFuTm9kZVsxXSkuZGVsYXkoMC4yKS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGlndWFuTm9kZVsyXSkuZGVsYXkoMC40KS50bygwLjUsIHsgeTogdGhpcy5zaGlndWFuX3Bvc1kgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ0bl94aWFuZ2ppKS50bygwLjUsIHsgb3BhY2l0eTogMjU1IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ0bl90aWppYW8pLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQnRuU3RhdGUoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2hpZ3Vhbl9pZGxlKHNoaWd1YW46IGNjLk5vZGUsIG51bTogTnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGFuaU5hbWUgPSBudW0gKyBcImlkbGVcIjtcclxuICAgICAgICBUb29scy5wbGF5U3BpbmUoc2hpZ3Vhbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCBhbmlOYW1lLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNoaWd1YW5fbGJsKHNoaWd1YW46IGNjLkxhYmVsLCBudW06IE51bWJlcikge1xyXG4gICAgICAgIHNoaWd1YW4uc3RyaW5nID0gbnVtLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hpZ3Vhbl8xX2FkZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlndWFuXzEgPj0gNiB8fCB0aGlzLnNoaWd1YW5fMyA8IDEpIHJldHVybjtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNob3RFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLm5lZWRDaGFuZ2VTaGlndWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVswXSwgdGhpcy5zaGlndWFuXzEsIHRoaXMuc2hpZ3Vhbl8xICsgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzBdLCB0aGlzLnNoaWd1YW5fMSwgdGhpcy5zaGlndWFuXzEgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMywgdGhpcy5zaGlndWFuXzMgLSAxKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMSsrO1xyXG4gICAgICAgIGlmICh0aGlzLm5lZWRDaGFuZ2VTaGlndWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZENoYW5nZVNoaWd1YW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzIgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWd1YW5fMyA9IDggLSB0aGlzLnNoaWd1YW5fMSAtIHRoaXMuc2hpZ3Vhbl8yO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzFdLCB0aGlzLnNoaWd1YW5fMik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMl0sIHRoaXMuc2hpZ3Vhbl8zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNoaWd1YW5fMy0tO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMSA9IHRoaXMuc2hpZ3Vhbl8xO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMiA9IHRoaXMuc2hpZ3Vhbl8yO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMyA9IHRoaXMuc2hpZ3Vhbl8zO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnRuU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTaGlndWFuXzFfc3ViKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoaWd1YW5fMyA9PSA2IHx8IHRoaXMuc2hpZ3Vhbl8xID09IDEpIHJldHVybjtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNob3RFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLm5lZWRDaGFuZ2VTaGlndWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVswXSwgdGhpcy5zaGlndWFuXzEsIHRoaXMuc2hpZ3Vhbl8xIC0gMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzBdLCB0aGlzLnNoaWd1YW5fMSwgdGhpcy5zaGlndWFuXzEgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMywgdGhpcy5zaGlndWFuXzMgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzEtLTtcclxuICAgICAgICBpZiAodGhpcy5uZWVkQ2hhbmdlU2hpZ3Vhbikge1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRDaGFuZ2VTaGlndWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbl8yID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzMgPSA4IC0gdGhpcy5zaGlndWFuXzEgLSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVsxXSwgdGhpcy5zaGlndWFuXzIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzMrKztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzEgPSB0aGlzLnNoaWd1YW5fMTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzMgPSB0aGlzLnNoaWd1YW5fMztcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hpZ3Vhbl8yX2FkZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlndWFuXzIgPj0gNiB8fCB0aGlzLnNoaWd1YW5fMyA8IDEpIHJldHVybjtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNob3RFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLm5lZWRDaGFuZ2VTaGlndWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsxXSwgdGhpcy5zaGlndWFuXzIsIHRoaXMuc2hpZ3Vhbl8yICsgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzFdLCB0aGlzLnNoaWd1YW5fMiwgdGhpcy5zaGlndWFuXzIgKyAxKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMywgdGhpcy5zaGlndWFuXzMgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzIrKztcclxuICAgICAgICBpZiAodGhpcy5uZWVkQ2hhbmdlU2hpZ3Vhbikge1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRDaGFuZ2VTaGlndWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbl8xID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzMgPSA4IC0gdGhpcy5zaGlndWFuXzEgLSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVswXSwgdGhpcy5zaGlndWFuXzEpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaGlndWFuXzMtLTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzMgPSB0aGlzLnNoaWd1YW5fMztcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hpZ3Vhbl8yX3N1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlndWFuXzMgPT0gNiB8fCB0aGlzLnNoaWd1YW5fMiA9PSAxKSByZXR1cm47XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWl6aGFvXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaG90RW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5uZWVkQ2hhbmdlU2hpZ3Vhbikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMV0sIHRoaXMuc2hpZ3Vhbl8yLCB0aGlzLnNoaWd1YW5fMiAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsxXSwgdGhpcy5zaGlndWFuXzIsIHRoaXMuc2hpZ3Vhbl8yIC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsyXSwgdGhpcy5zaGlndWFuXzMsIHRoaXMuc2hpZ3Vhbl8zICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8yLS07XHJcbiAgICAgICAgaWYgKHRoaXMubmVlZENoYW5nZVNoaWd1YW4pIHtcclxuICAgICAgICAgICAgdGhpcy5uZWVkQ2hhbmdlU2hpZ3VhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWd1YW5fMSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbl8zID0gOCAtIHRoaXMuc2hpZ3Vhbl8xIC0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMF0sIHRoaXMuc2hpZ3Vhbl8xKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVsyXSwgdGhpcy5zaGlndWFuXzMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbl8zKys7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8zID0gdGhpcy5zaGlndWFuXzM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQnRuU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMYmwoKTtcclxuICAgICAgICB0aGlzLmJ0bkFkZEFuZFN1YlsxXS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdGhpcy5zaGlndWFuXzEgPT0gMSB8fCB0aGlzLnNoaWd1YW5fMyA9PSA2O1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzNdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0aGlzLnNoaWd1YW5fMiA9PSAxIHx8IHRoaXMuc2hpZ3Vhbl8zID09IDY7XHJcblxyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzBdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0aGlzLnNoaWd1YW5fMSA9PSA2IHx8IHRoaXMuc2hpZ3Vhbl8zID09IDE7XHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbMl0uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRoaXMuc2hpZ3Vhbl8yID09IDYgfHwgdGhpcy5zaGlndWFuXzMgPT0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxibCgpIHtcclxuICAgICAgICB0aGlzLnNoaWd1YW5MYWJlbFswXS5zdHJpbmcgPSB0aGlzLnNoaWd1YW5fMS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2hpZ3VhbkxhYmVsWzFdLnN0cmluZyA9IHRoaXMuc2hpZ3Vhbl8yLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuTGFiZWxbMl0uc3RyaW5nID0gdGhpcy5zaGlndWFuXzMudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNoaWd1YW5fYW5pKHNoaWd1YW46IGNjLk5vZGUsIGZyb21OdW06IE51bWJlciwgdG9OdW06IE51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmlOYW1lID0gZnJvbU51bSArIFwidG9cIiArIHRvTnVtO1xyXG4gICAgICAgIGxldCBpZGxlTmFtZSA9IHRvTnVtICsgXCJpZGxlXCI7XHJcbiAgICAgICAgVG9vbHMucGxheVNwaW5lKHNoaWd1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKSwgYW5pTmFtZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHNoaWd1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKSwgaWRsZU5hbWUsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTaG90OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIG5lZWRDaGFuZ2VTaGlndWFuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTaG90KCkge1xyXG4gICAgICAgIFVJSGVscC5zaG93TWFzaygpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvdCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNTaG90ID0gdHJ1ZTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hvdEVuYWJsZSA9IGZhbHNlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGFyciA9IFt0aGlzLnNoaWd1YW5fMSwgdGhpcy5zaGlndWFuXzIsIHRoaXMuc2hpZ3Vhbl8zXTtcclxuICAgICAgICBsZXQgbmV3QXJyID0gW107XHJcbiAgICAgICAgYXJyLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ld0Fyci5wdXNoKGFycltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJyMSA9IFwiICwgbmV3QXJyKTtcclxuICAgICAgICBsZXQgb2xkQXJyID0gW3RoaXMuc2hpZ3Vhbl8xLCB0aGlzLnNoaWd1YW5fMiwgdGhpcy5zaGlndWFuXzNdO1xyXG5cclxuICAgICAgICBsZXQgbmVlZF9jaGFuZ2VfaW5kZXggPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAob2xkQXJyW2ldICE9IG5ld0FycltpXSkge1xyXG4gICAgICAgICAgICAgICAgbmVlZF9jaGFuZ2VfaW5kZXgucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5lZWRfY2hhbmdlX2luZGV4Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkX2NoYW5nZV9pbmRleC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNoaWd1YW4gPSB0aGlzLnNoaWd1YW5Ob2RlW25lZWRfY2hhbmdlX2luZGV4W2ldXTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmRQb3MgPSB0aGlzLnNoaWd1YW5Ob2RlW25lZWRfY2hhbmdlX2luZGV4W25lZWRfY2hhbmdlX2luZGV4Lmxlbmd0aCAtIGkgLSAxXV0ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNoaWd1YW5Bbmkoc2hpZ3VhbiwgZW5kUG9zLCBuZXdBcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEFuaShuZXdBcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVNoaWd1YW5Bbmkobm9kZTogY2MuTm9kZSwgZW5kUG9zOiBjYy5WZWMzLCBhcnI6IG51bWJlcltdKSB7XHJcbiAgICAgICAgLy/nlKjotJ3loZ7lsJTmm7Lnur/np7vliqjliLDnm67moIfkvY3nva5cclxuICAgICAgICBsZXQgc3RhcnRQb3MgPSBub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCBjb250cm9sUG9zID0gY2MudjMoc3RhcnRQb3MueCwgZW5kUG9zLnkgKyAyMzApO1xyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgIC50aGVuKGNjLmJlemllclRvKDIsIFtjYy52MihzdGFydFBvcyksIGNjLnYyKGNvbnRyb2xQb3MpLCBjYy52MihlbmRQb3MpXSkuZWFzaW5nKGNjLmVhc2VTaW5lT3V0KCkpKVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gc3RhcnRQb3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QW5pKGFycik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXRBbmkoYXJyOiBudW1iZXJbXSkgeyAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVtpXSwgYXJyW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTaGlndWFuX2xibCh0aGlzLnNoaWd1YW5MYWJlbFtpXSwgYXJyW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzEgPSBhcnJbMF07XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzIgPSBhcnJbMV07XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzMgPSBhcnJbMl07XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG4gICAgICAgIC8v5Yik5patU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFycuS4reaYr+WQpuaciWFyclxyXG4gICAgICAgIGxldCBpc0hhdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHJ1ZUFyciA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnJbaV07XHJcbiAgICAgICAgICAgIGlmICh0cnVlQXJyWzBdID09IGFyclswXSAmJiB0cnVlQXJyWzFdID09IGFyclsxXSAmJiB0cnVlQXJyWzJdID09IGFyclsyXSkge1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54Wn55u45py65ZKU5ZqT6Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueFp+ebuOacuuWSlOWak+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChpc0hhdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVXcm9uZyhpbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUcnVlKGFycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlV3JvbmcoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5zdG9wU291bmRCeU5hbWUoU291bmRDb25maWcuc291ZGxpc3RbXCLplJnor6/pn7PmlYhcIl0pO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi6ZSZ6K+v6Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBsZXQgdHJ1ZU5vZGUgPSB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbltpbmRleF07XHJcbiAgICAgICAgdGhpcy5pc1Nob3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcGFpemhhb1wiKS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaG90RW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGN1b3d1ID0gdHJ1ZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfY3Vvd3VcIik7XHJcbiAgICAgICAgY3Vvd3UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjYy50d2VlbihjdW93dSkudG8oMC4xLCB7IG9wYWNpdHk6IDI1NSB9KS5kZWxheSgwLjE1KS50bygwLjEsIHsgb3BhY2l0eTogMCB9KVxyXG4gICAgICAgICAgICAudG8oMC4xLCB7IG9wYWNpdHk6IDI1NSB9KS5kZWxheSgwLjE1KS50bygwLjEsIHsgb3BhY2l0eTogMCB9KVxyXG4gICAgICAgICAgICAudG8oMC4xLCB7IG9wYWNpdHk6IDI1NSB9KS5kZWxheSgwLjE1KS50bygwLjEsIHsgb3BhY2l0eTogMCB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBVSUhlbHAuY2xvc2VNYXNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRydWUoYXJyOiBudW1iZXJbXSkge1xyXG4gICAgICAgIHRoaXMubmVlZENoYW5nZVNoaWd1YW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvdF9ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICB0aGlzLnNob3Rfbm9kZS54ID0gLTMwMDtcclxuICAgICAgICB0aGlzLnNob3Rfbm9kZS55ID0gMDtcclxuICAgICAgICB0aGlzLnNob3Rfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCB0YXJnZXRJbmRleCA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoO1xyXG4gICAgICAgIC8vdGhpcy5zaG90X25vZGXnp7vliqjliLByaWdodEFyZWEuY2hpbGRyZW5bdGFyZ2V0SW5kZXhd5L2N572uXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyID0gXCIgKyBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyKTtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5bdGFyZ2V0SW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCBlbmRQb3MgPSBjYy52Myh0aGlzLnJpZ2h0QXJlYV9wb3NYLCB0YXJnZXRQb3MueSk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5zaG90X25vZGUpLnRvKDAuNSwgeyBwb3NpdGlvbjogZW5kUG9zLCBzY2FsZTogMC4yMyB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG90X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU2hvd1RydWVOb2RlKHRhcmdldEluZGV4LCBhcnIpO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBVSUhlbHAuY2xvc2VNYXNrKCk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVNob3dUcnVlTm9kZShpbmRleCwgYXJyOiBudW1iZXJbXSkge1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIucHVzaChhcnIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJyID0gXCIgKyBhcnIpO1xyXG4gICAgICAgIGxldCB0cnVlTm9kZSA9IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2luZGV4XTtcclxuICAgICAgICB0cnVlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8xXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzBdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgdHJ1ZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzaGlndWFuXzJcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5hbmltYXRpb24gPSBhcnJbMV0gKyBcImlkbGVcIjtcclxuICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoaWd1YW5fM1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IGFyclsyXSArIFwiaWRsZVwiO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclswXS50b1N0cmluZygpO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fMlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclsxXS50b1N0cmluZygpO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fM1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclsyXS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1N1Ym1pdCgpIHtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgaWYgKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoIDwgNSkge1xyXG4gICAgICAgICAgICBMaXN0ZW5lck1hbmFnZXIuZGlzcGF0Y2goRXZlbnRUeXBlLlNVQk1JVCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi6ZSZ6K+v6Z+z5pWIXCJdKTtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLplJnor6/pn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBVSUhlbHAuc2hvd01hc2soKTtcclxuICAgICAgICAgICAgVUlIZWxwLnNob3dUaXAoXCLov5jmnInliIbms5XmsqHmnInmib7liLDlk6bvvIFcIik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIFVJSGVscC5jbG9zZU1hc2soKTtcclxuICAgICAgICAgICAgLy8gfSwgMSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yaWdodEFyZWHovbvlvq7mipbliqhcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5yaWdodEFyZWEpLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYICsgNSB9KS50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCAtIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCArIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCAtIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgb3V0TGluZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm91dExpbmVcIik7XHJcbiAgICAgICAgICAgIG91dExpbmUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MudHdlZW4ob3V0TGluZSkudG8oMC4xLCB7IHg6IHRoaXMucmlnaHRBcmVhX3Bvc1ggKyA1IH0pLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIC0gNSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYICsgNSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIC0gNSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG91dExpbmUpLnRvKDAuMSwgeyBvcGFjaXR5OiAyNTUgfSkuZGVsYXkoMC4xNSkudG8oMC4xLCB7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgb3BhY2l0eTogMjU1IH0pLmRlbGF5KDAuMTUpLnRvKDAuMSwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IG9wYWNpdHk6IDI1NSB9KS5kZWxheSgwLjE1KS50bygwLjEsIHsgb3BhY2l0eTogMCB9KVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFVJSGVscC5jbG9zZU1hc2soKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMaXN0ZW5lck1hbmFnZXIuZGlzcGF0Y2goRXZlbnRUeXBlLlNVQk1JVCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBpbWdfeWluemhhbmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfeWluemhhbmdcIik7XHJcbiAgICAgICAgICAgIC8vaW1nX3lpbnpoYW5n5YGa5LiA56eN5b6A5LiL56C455qE5Yqo55S7XHJcbiAgICAgICAgICAgIGltZ195aW56aGFuZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbWdfeWluemhhbmcuc2NhbGUgPSAzO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl94aWFuZ2ppLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl90aWppYW8ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGltZ195aW56aGFuZykudG8oMC4xLCB7IHNjYWxlOiAxIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdhbWVPdmVyKCkge1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5kaXNwYXRjaChFdmVudFR5cGUuR0FNRV9PVkVSKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19