"use strict";
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