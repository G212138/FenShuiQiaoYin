
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
        this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 + 1);
        this.shiguan_1++;
        this.shiguan_2 = 1;
        this.shiguan_3 = 8 - this.shiguan_1 - this.shiguan_2;
        this.setShiguan_idle(this.shiguanNode[1], this.shiguan_2);
        this.setShiguan_idle(this.shiguanNode[2], this.shiguan_3);
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
        this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 - 1);
        this.shiguan_1--;
        this.shiguan_2 = 1;
        this.shiguan_3 = 8 - this.shiguan_1 - this.shiguan_2;
        this.setShiguan_idle(this.shiguanNode[1], this.shiguan_2);
        this.setShiguan_idle(this.shiguanNode[2], this.shiguan_3);
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
        this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 + 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        this.shiguan_2++;
        this.shiguan_3--;
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
        this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 - 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        this.shiguan_2--;
        this.shiguan_3++;
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
        var trueIndex = 0;
        for (var i = 0; i < this.allTrueArr.length; i++) {
            var trueArr = this.allTrueArr[i];
            if (trueArr[0] == arr[0] && trueArr[1] == arr[1] && trueArr[2] == arr[2]) {
                trueIndex = i;
                break;
            }
        }
        console.log("trueIndex", trueIndex);
        var index = Number(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length);
        for (var i = 0; i < this.allTrueArr.length; i++) {
            var trueArr = this.allTrueArr[i];
            var _loop_1 = function (j) {
                var arr_1 = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr[j];
                if (trueArr[0] == arr_1[0] && trueArr[1] == arr_1[1] && trueArr[2] == arr_1[2]) {
                    if (i > trueIndex) {
                        index--;
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
        console.log("trueIndex222", trueIndex);
        console.log("index", index);
        if (trueIndex < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length - 1) {
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
            for (var i = trueIndex; i < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.trueArr.length - 1; i++) {
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
            var targetIndex_1 = index;
            var targetPos = this.rightArea.children[targetIndex_1].position;
            var endPos = cc.v3(this.rightArea_posX, targetPos.y);
            cc.tween(this.shot_node).delay(0.5).to(1, { position: endPos, scale: 0.23 }).call(function () {
                _this.shot_node.active = false;
                _this.handleShowTrueNode(targetIndex_1, arr);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEdhbWVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRkFBb0Y7QUFDcEYsK0VBQThFO0FBQzlFLHFGQUFvRjtBQUNwRiwrREFBOEQ7QUFDOUQsaUVBQWdFO0FBQ2hFLGtEQUFpRDtBQUNqRCw2Q0FBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUEwZkM7UUF4ZlcsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixpQkFBVyxHQUFjLEVBQUUsQ0FBQztRQUU1QixrQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUU5QixrQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUU3QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsa0JBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixvQkFBYyxHQUFHLEdBQUcsQ0FBQztRQUNyQixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixnQkFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBd01yRSxZQUFNLEdBQVksS0FBSyxDQUFDOztJQTBScEMsQ0FBQztJQWhlRyx1QkFBTSxHQUFOO1FBQ0ksaUNBQWUsQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxpQ0FBZSxDQUFDLEVBQUUsQ0FBQyxxQkFBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hFLGlDQUFlLENBQUMsRUFBRSxDQUFDLHFCQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxpQ0FBZSxDQUFDLEdBQUcsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RFLGlDQUFlLENBQUMsR0FBRyxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakUsaUNBQWUsQ0FBQyxHQUFHLENBQUMscUJBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU8sZ0NBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzdELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sdUJBQU0sR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUNwSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzFDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakQsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDeEI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRixJQUFJLEdBQUcsR0FBRyxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdkIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQzNGLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUMzRixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDM0YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDOUY7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQzdHLENBQUM7SUFFTyw0QkFBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBRXhFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyw2QkFBWSxHQUFwQjtRQUFBLGlCQWdCQztRQWZHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM5RCxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25GLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDNUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3RCxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzVELEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVPLGdDQUFlLEdBQXZCLFVBQXdCLE9BQWdCLEVBQUUsR0FBVztRQUNqRCxJQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQzNCLGFBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTywrQkFBYyxHQUF0QixVQUF1QixPQUFpQixFQUFFLEdBQVc7UUFDakQsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVPLHFDQUFvQixHQUE1QjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO1lBQUUsT0FBTztRQUN0RCwyQkFBWSxDQUFDLGVBQWUsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNELDJCQUFZLENBQUMsVUFBVSxDQUFDLHlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakYsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUUvRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFELGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hFLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hFLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8scUNBQW9CLEdBQTVCO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ3ZELDJCQUFZLENBQUMsZUFBZSxDQUFDLHlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0QsMkJBQVksQ0FBQyxVQUFVLENBQUMseUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqRixpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRS9ELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxxQ0FBb0IsR0FBNUI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztZQUFFLE9BQU87UUFDdEQsMkJBQVksQ0FBQyxlQUFlLENBQUMseUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzRCwyQkFBWSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pGLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFL0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxxQ0FBb0IsR0FBNUI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQztZQUFFLE9BQU87UUFDdkQsMkJBQVksQ0FBQyxlQUFlLENBQUMseUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzRCwyQkFBWSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pGLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFL0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTywrQkFBYyxHQUF0QjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDbkcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7SUFDdkcsQ0FBQztJQUVPLDBCQUFTLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVPLCtCQUFjLEdBQXRCLFVBQXVCLE9BQWdCLEVBQUUsT0FBZSxFQUFFLEtBQWE7UUFDbkUsSUFBSSxPQUFPLEdBQUcsT0FBTyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUM5QixhQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDL0QsYUFBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR08sNEJBQVcsR0FBbkI7UUFBQSxpQkF3Q0M7UUF2Q0csZUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLDJCQUFZLENBQUMsZUFBZSxDQUFDLHlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0QsMkJBQVksQ0FBQyxVQUFVLENBQUMseUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNoRixpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ2hFLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtRQUNELGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU5RCxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNKO1FBRUQsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUM1RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDVDthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFTyxpQ0FBZ0IsR0FBeEIsVUFBeUIsSUFBYSxFQUFFLE1BQWUsRUFBRSxHQUFhO1FBQ2xFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbkQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDVCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ2xHLElBQUksQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUMsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTyx5QkFBUSxHQUFoQixVQUFpQixHQUFhO1FBQTlCLGlCQTZDQztRQTVDRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckQ7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xGLElBQUksT0FBTyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0RSxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ1YsTUFBTTthQUNUO1NBQ0o7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsMkJBQVksQ0FBQyxlQUFlLENBQUMseUJBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM5RCwyQkFBWSxDQUFDLFVBQVUsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlFLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM1QixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNyQyxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBRXJDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN4QixLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsRjtnQkFFRCxJQUFJLE1BQU0sRUFBRTtvQkFDUixLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDSCxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjtZQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVPLDRCQUFXLEdBQW5CLFVBQW9CLEtBQWE7UUFBakMsaUJBbUJDO1FBbEJHLGlDQUFlLENBQUMsUUFBUSxDQUFDLHFCQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELDJCQUFZLENBQUMsZUFBZSxDQUFDLHlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0QsMkJBQVksQ0FBQyxVQUFVLENBQUMseUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNoRixpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ2hFLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDeEUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQzdELEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUM3RCxJQUFJLENBQUM7WUFDRixlQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBRU8sMkJBQVUsR0FBbEIsVUFBbUIsR0FBYTtRQUFoQyxpQkE0RUM7UUEzRUcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RFLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN4QixDQUFDO2dCQUNOLElBQUksS0FBRyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDdEUsSUFBSSxDQUFDLEdBQUcsU0FBUyxFQUFFO3dCQUNmLEtBQUssRUFBRSxDQUFDO3dCQUNSLElBQUksVUFBUSxHQUFHLE9BQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxTQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3ZDLElBQUksWUFBWSxHQUFHLE9BQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7d0JBQ25DLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQzNELFVBQVEsQ0FBQyxRQUFRLEdBQUcsU0FBTyxDQUFDO3dCQUNoQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDZDtpQkFDSjs7O1lBYkwsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO3dCQUEzRSxDQUFDO2FBY1Q7U0FDSjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29DQUNwRSxDQUFDO2dCQUNOLElBQUksUUFBUSxHQUFHLE9BQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksWUFBWSxHQUFHLE9BQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELElBQUksUUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzNELFFBQVEsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7O1lBUGYsS0FBSyxJQUFJLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFBdkYsQ0FBQzthQVFUO1lBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDOUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixLQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsZUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNuQixLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7b0JBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbEYsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkY7WUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO2FBQU07WUFDSCxJQUFJLGFBQVcsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBVyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzlELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDOUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixLQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsZUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNuQixLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7b0JBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbEYsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkY7WUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0wsQ0FBQztJQUVPLG1DQUFrQixHQUExQixVQUEyQixLQUFLLEVBQUUsR0FBYTtRQUMzQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEYsSUFBSSxPQUFPLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RFLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2QsTUFBTTthQUNUO1NBQ0o7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsRTtRQUVELElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEYsSUFBSSxPQUFPLEdBQUcsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMzRixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QjthQUNKO1NBQ0o7UUFDRCxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ25FLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUMzRixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDM0YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzNGLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNGLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNGLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9GLENBQUM7SUFFTyw4QkFBYSxHQUFyQjtRQUFBLGlCQTBDQztRQXpDRywyQkFBWSxDQUFDLGVBQWUsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNELDJCQUFZLENBQUMsVUFBVSxDQUFDLHlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0UsSUFBSSxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRSxpQ0FBZSxDQUFDLFFBQVEsQ0FBQyxxQkFBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCwyQkFBWSxDQUFDLGVBQWUsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzNELDJCQUFZLENBQUMsVUFBVSxDQUFDLHlCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0UsZUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLGVBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0IsNEJBQTRCO1lBQzVCLDBCQUEwQjtZQUMxQixTQUFTO1lBQ1Qsb0JBQW9CO1lBQ3BCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQztpQkFDbkcsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDO2lCQUN2QyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUM7aUJBQ3ZDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUM7aUJBQzVGLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQztpQkFDdkMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDO2lCQUN2QyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUMxRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQzdELEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDN0QsSUFBSSxDQUFDO2dCQUNGLGVBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUM7aUJBQ0QsS0FBSyxFQUFFLENBQUM7U0FDaEI7YUFBTTtZQUNILGlDQUFlLENBQUMsUUFBUSxDQUFDLHFCQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVELHVCQUF1QjtZQUN2QixZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMzQixZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDOUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0lBRU8seUJBQVEsR0FBaEI7UUFDSSxpQ0FBZSxDQUFDLFFBQVEsQ0FBQyxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUF0ZkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDZ0I7SUFFbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDa0I7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDbUI7SUFFdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDbUI7SUFFckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDa0I7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDaUI7SUFFbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDZ0I7SUFFbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDZTtJQWhCaEIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQTBmMUI7SUFBRCxhQUFDO0NBMWZELEFBMGZDLENBMWZtQyxFQUFFLENBQUMsU0FBUyxHQTBmL0M7a0JBMWZvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9MaXN0ZW5lck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3luY0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9TeW5jRGF0YU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9VdGlscy9Ub29sc1wiO1xyXG5pbXBvcnQgeyBVSUhlbHAgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9VdGlscy9VSUhlbHBcIjtcclxuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL0RhdGEvRXZlbnRUeXBlXCI7XHJcbmltcG9ydCB7IFNvdW5kQ29uZmlnIH0gZnJvbSBcIi4vU291bmRDb25maWdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJpZ2h0QXJlYTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgc2hpZ3Vhbk5vZGU6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBzaGlndWFuTGFiZWw6IGNjLkxhYmVsW10gPSBbXTtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidG5BZGRBbmRTdWI6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bl94aWFuZ2ppOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidG5fdGlqaWFvOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzaG90X25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNob3RNYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHNoaWd1YW5fcG9zWSA9IC0yNTA7XHJcbiAgICBwcml2YXRlIHJpZ2h0QXJlYV9wb3NYID0gNzIzO1xyXG4gICAgcHJpdmF0ZSBzaGlndWFuXzE6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHNoaWd1YW5fMjogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgc2hpZ3Vhbl8zOiBudW1iZXIgPSA2O1xyXG5cclxuICAgIHByaXZhdGUgYWxsVHJ1ZUFyciA9IFtbMSwgMSwgNl0sIFsxLCAyLCA1XSwgWzEsIDMsIDRdLCBbMiwgMiwgNF0sIFsyLCAzLCAzXV07XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihFdmVudFR5cGUuRU5URVJfR0FNRSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihFdmVudFR5cGUuR0FNRV9SRUNPTk5FQ1QsIHRoaXMuaW5pdFVJLCB0aGlzKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub24oRXZlbnRUeXBlLkdBTUVfUkVQTEFZLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkVOVEVSX0dBTUUsIHRoaXMuaGFuZGxlRW50ZXJHYW1lLCB0aGlzKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub2ZmKEV2ZW50VHlwZS5HQU1FX1JFQ09OTkVDVCwgdGhpcy5pbml0VUksIHRoaXMpO1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkdBTUVfUkVQTEFZLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFbnRlckdhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5MYWJlbFswXS5zdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLnNoaWd1YW5MYWJlbFsxXS5zdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLnNoaWd1YW5MYWJlbFsyXS5zdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLmJ0bkFkZEFuZFN1YlsxXS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJ0bkFkZEFuZFN1YlszXS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJ0bkFkZEFuZFN1YlswXS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJ0bkFkZEFuZFN1YlsyXS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdhbWVTdGFydEFuaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFVJKCkge1xyXG4gICAgICAgIHRoaXMuc2hvdE1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbml0U2hpZ3VhbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnRuU3RhdGUoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaWd1YW5Ob2RlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZ3Vhbk5vZGVbaV0ueSA9IHRoaXMuc2hpZ3Vhbl9wb3NZO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcGFpemhhb1wiKS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gIVN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNob3RFbmFibGU7XHJcbiAgICAgICAgdGhpcy5idG5feGlhbmdqaS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMuYnRuX3Rpamlhby5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGxldCBvdXRMaW5lID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwib3V0TGluZVwiKTtcclxuICAgICAgICBvdXRMaW5lLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLnJpZ2h0QXJlYSk7XHJcbiAgICAgICAgdGhpcy5yaWdodEFyZWEueCA9IHRoaXMucmlnaHRBcmVhX3Bvc1g7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRydWVOb2RlID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgY3Vvd3UgPSB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19jdW93dVwiKTtcclxuICAgICAgICAgICAgY3Vvd3UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnJbaV07XHJcbiAgICAgICAgICAgIGxldCB0cnVlTm9kZSA9IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICB0cnVlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoaWd1YW5fMVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IGFyclswXSArIFwiaWRsZVwiO1xyXG4gICAgICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoaWd1YW5fMlwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IGFyclsxXSArIFwiaWRsZVwiO1xyXG4gICAgICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoaWd1YW5fM1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IGFyclsyXSArIFwiaWRsZVwiO1xyXG4gICAgICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcImxibF9zaGlndWFuXzFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBhcnJbMF0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdHJ1ZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYmxfc2hpZ3Vhbl8yXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYXJyWzFdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fM1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclsyXS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfeWluemhhbmdcIikuYWN0aXZlID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuZnJhbWVTeW5jRGF0YS5pc0dhbWVPdmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFNoaWd1YW4oKSB7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzEgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzE7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzIgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzI7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzMgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzM7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMF0sIHRoaXMuc2hpZ3Vhbl8xKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzFdLCB0aGlzLnNoaWd1YW5fMik7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVsyXSwgdGhpcy5zaGlndWFuXzMpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9sYmwodGhpcy5zaGlndWFuTGFiZWxbMF0sIHRoaXMuc2hpZ3Vhbl8xKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fbGJsKHRoaXMuc2hpZ3VhbkxhYmVsWzFdLCB0aGlzLnNoaWd1YW5fMik7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2xibCh0aGlzLnNoaWd1YW5MYWJlbFsyXSwgdGhpcy5zaGlndWFuXzMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2FtZVN0YXJ0QW5pKCkge1xyXG4gICAgICAgIHRoaXMucmlnaHRBcmVhLnggPSAxMjgwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlndWFuTm9kZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNoaWd1YW5Ob2RlW2ldLnkgPSA2MDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnRuX3hpYW5namkub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5idG5fdGlqaWFvLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMucmlnaHRBcmVhKS50bygwLjUsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGlndWFuTm9kZVswXSkudG8oMC41LCB7IHk6IHRoaXMuc2hpZ3Vhbl9wb3NZIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hpZ3Vhbk5vZGVbMV0pLmRlbGF5KDAuMikudG8oMC41LCB7IHk6IHRoaXMuc2hpZ3Vhbl9wb3NZIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hpZ3Vhbk5vZGVbMl0pLmRlbGF5KDAuNCkudG8oMC41LCB7IHk6IHRoaXMuc2hpZ3Vhbl9wb3NZIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5idG5feGlhbmdqaSkudG8oMC41LCB7IG9wYWNpdHk6IDI1NSB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5idG5fdGlqaWFvKS50bygwLjUsIHsgb3BhY2l0eTogMjU1IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNoaWd1YW5faWRsZShzaGlndWFuOiBjYy5Ob2RlLCBudW06IE51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmlOYW1lID0gbnVtICsgXCJpZGxlXCI7XHJcbiAgICAgICAgVG9vbHMucGxheVNwaW5lKHNoaWd1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKSwgYW5pTmFtZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaGlndWFuX2xibChzaGlndWFuOiBjYy5MYWJlbCwgbnVtOiBOdW1iZXIpIHtcclxuICAgICAgICBzaGlndWFuLnN0cmluZyA9IG51bS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1NoaWd1YW5fMV9hZGQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpZ3Vhbl8xID49IDYgfHwgdGhpcy5zaGlndWFuXzMgPCAxKSByZXR1cm47XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWl6aGFvXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaG90RW5hYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzBdLCB0aGlzLnNoaWd1YW5fMSwgdGhpcy5zaGlndWFuXzEgKyAxKTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMSsrO1xyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8yID0gMTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMyA9IDggLSB0aGlzLnNoaWd1YW5fMSAtIHRoaXMuc2hpZ3Vhbl8yO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMV0sIHRoaXMuc2hpZ3Vhbl8yKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlWzJdLCB0aGlzLnNoaWd1YW5fMyk7XHJcblxyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMSA9IHRoaXMuc2hpZ3Vhbl8xO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMiA9IHRoaXMuc2hpZ3Vhbl8yO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMyA9IHRoaXMuc2hpZ3Vhbl8zO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnRuU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTaGlndWFuXzFfc3ViKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoaWd1YW5fMyA9PSA2IHx8IHRoaXMuc2hpZ3Vhbl8xID09IDEpIHJldHVybjtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNob3RFbmFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMF0sIHRoaXMuc2hpZ3Vhbl8xLCB0aGlzLnNoaWd1YW5fMSAtIDEpO1xyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8xLS07XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzIgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8zID0gOCAtIHRoaXMuc2hpZ3Vhbl8xIC0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2lkbGUodGhpcy5zaGlndWFuTm9kZVsxXSwgdGhpcy5zaGlndWFuXzIpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9pZGxlKHRoaXMuc2hpZ3Vhbk5vZGVbMl0sIHRoaXMuc2hpZ3Vhbl8zKTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzEgPSB0aGlzLnNoaWd1YW5fMTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzMgPSB0aGlzLnNoaWd1YW5fMztcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hpZ3Vhbl8yX2FkZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlndWFuXzIgPj0gNiB8fCB0aGlzLnNoaWd1YW5fMyA8IDEpIHJldHVybjtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNob3RFbmFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMV0sIHRoaXMuc2hpZ3Vhbl8yLCB0aGlzLnNoaWd1YW5fMiArIDEpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hpZ3Vhbl9hbmkodGhpcy5zaGlndWFuTm9kZVsyXSwgdGhpcy5zaGlndWFuXzMsIHRoaXMuc2hpZ3Vhbl8zIC0gMSk7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzIrKztcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMy0tO1xyXG5cclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzIgPSB0aGlzLnNoaWd1YW5fMjtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzMgPSB0aGlzLnNoaWd1YW5fMztcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hpZ3Vhbl8yX3N1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlndWFuXzMgPT0gNiB8fCB0aGlzLnNoaWd1YW5fMiA9PSAxKSByZXR1cm47XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wYWl6aGFvXCIpLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaG90RW5hYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTaGlndWFuX2FuaSh0aGlzLnNoaWd1YW5Ob2RlWzFdLCB0aGlzLnNoaWd1YW5fMiwgdGhpcy5zaGlndWFuXzIgLSAxKTtcclxuICAgICAgICB0aGlzLnNldFNoaWd1YW5fYW5pKHRoaXMuc2hpZ3Vhbk5vZGVbMl0sIHRoaXMuc2hpZ3Vhbl8zLCB0aGlzLnNoaWd1YW5fMyArIDEpO1xyXG4gICAgICAgIHRoaXMuc2hpZ3Vhbl8yLS07XHJcbiAgICAgICAgdGhpcy5zaGlndWFuXzMrKztcclxuXHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gdGhpcy5zaGlndWFuXzI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8zID0gdGhpcy5zaGlndWFuXzM7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQnRuU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMYmwoKTtcclxuICAgICAgICB0aGlzLmJ0bkFkZEFuZFN1YlsxXS5nZXRDaGlsZEJ5TmFtZShcImRpc2FibGVcIikuYWN0aXZlID0gdGhpcy5zaGlndWFuXzEgPT0gMSB8fCB0aGlzLnNoaWd1YW5fMyA9PSA2O1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzNdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0aGlzLnNoaWd1YW5fMiA9PSAxIHx8IHRoaXMuc2hpZ3Vhbl8zID09IDY7XHJcblxyXG4gICAgICAgIHRoaXMuYnRuQWRkQW5kU3ViWzBdLmdldENoaWxkQnlOYW1lKFwiZGlzYWJsZVwiKS5hY3RpdmUgPSB0aGlzLnNoaWd1YW5fMSA9PSA2IHx8IHRoaXMuc2hpZ3Vhbl8zID09IDE7XHJcbiAgICAgICAgdGhpcy5idG5BZGRBbmRTdWJbMl0uZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRoaXMuc2hpZ3Vhbl8yID09IDYgfHwgdGhpcy5zaGlndWFuXzMgPT0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxibCgpIHtcclxuICAgICAgICB0aGlzLnNoaWd1YW5MYWJlbFswXS5zdHJpbmcgPSB0aGlzLnNoaWd1YW5fMS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc2hpZ3VhbkxhYmVsWzFdLnN0cmluZyA9IHRoaXMuc2hpZ3Vhbl8yLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zaGlndWFuTGFiZWxbMl0uc3RyaW5nID0gdGhpcy5zaGlndWFuXzMudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNoaWd1YW5fYW5pKHNoaWd1YW46IGNjLk5vZGUsIGZyb21OdW06IE51bWJlciwgdG9OdW06IE51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmlOYW1lID0gZnJvbU51bSArIFwidG9cIiArIHRvTnVtO1xyXG4gICAgICAgIGxldCBpZGxlTmFtZSA9IHRvTnVtICsgXCJpZGxlXCI7XHJcbiAgICAgICAgVG9vbHMucGxheVNwaW5lKHNoaWd1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKSwgYW5pTmFtZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHNoaWd1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKSwgaWRsZU5hbWUsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTaG90OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTaG90KCkge1xyXG4gICAgICAgIFVJSGVscC5zaG93TWFzaygpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvdCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNTaG90ID0gdHJ1ZTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hvdEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBhcnIgPSBbdGhpcy5zaGlndWFuXzEsIHRoaXMuc2hpZ3Vhbl8yLCB0aGlzLnNoaWd1YW5fM107XHJcbiAgICAgICAgbGV0IG5ld0FyciA9IFtdO1xyXG4gICAgICAgIGFyci5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBuZXdBcnIucHVzaChhcnJbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zaGlndWFuXzEgPSBuZXdBcnJbMF07XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hpZ3Vhbl8yID0gbmV3QXJyWzFdO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNoaWd1YW5fMyA9IG5ld0FyclsyXTtcclxuICAgICAgICBsZXQgb2xkQXJyID0gW3RoaXMuc2hpZ3Vhbl8xLCB0aGlzLnNoaWd1YW5fMiwgdGhpcy5zaGlndWFuXzNdO1xyXG5cclxuICAgICAgICBsZXQgbmVlZF9jaGFuZ2VfaW5kZXggPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAob2xkQXJyW2ldICE9IG5ld0FycltpXSkge1xyXG4gICAgICAgICAgICAgICAgbmVlZF9jaGFuZ2VfaW5kZXgucHVzaChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5lZWRfY2hhbmdlX2luZGV4Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkX2NoYW5nZV9pbmRleC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNoaWd1YW4gPSB0aGlzLnNoaWd1YW5Ob2RlW25lZWRfY2hhbmdlX2luZGV4W2ldXTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmRQb3MgPSB0aGlzLnNoaWd1YW5Ob2RlW25lZWRfY2hhbmdlX2luZGV4W25lZWRfY2hhbmdlX2luZGV4Lmxlbmd0aCAtIGkgLSAxXV0ucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNoaWd1YW5Bbmkoc2hpZ3VhbiwgZW5kUG9zLCBuZXdBcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRBbmkobmV3QXJyKTtcclxuICAgICAgICAgICAgfSwgMik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEFuaShuZXdBcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVNoaWd1YW5Bbmkobm9kZTogY2MuTm9kZSwgZW5kUG9zOiBjYy5WZWMzLCBhcnI6IG51bWJlcltdKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0UG9zID0gbm9kZS5wb3NpdGlvbjtcclxuICAgICAgICBsZXQgY29udHJvbFBvcyA9IGNjLnYzKHN0YXJ0UG9zLngsIGVuZFBvcy55ICsgMjMwKTtcclxuICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAudGhlbihjYy5iZXppZXJUbygyLCBbY2MudjIoc3RhcnRQb3MpLCBjYy52Mihjb250cm9sUG9zKSwgY2MudjIoZW5kUG9zKV0pLmVhc2luZyhjYy5lYXNlU2luZU91dCgpKSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IHN0YXJ0UG9zO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2V0QW5pKGFycjogbnVtYmVyW10pIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNoaWd1YW5Ob2RlW2ldLCBhcnJbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5fbGJsKHRoaXMuc2hpZ3VhbkxhYmVsW2ldLCBhcnJbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNoaWd1YW5fMSA9IGFyclswXTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMiA9IGFyclsxXTtcclxuICAgICAgICB0aGlzLnNoaWd1YW5fMyA9IGFyclsyXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0blN0YXRlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGlzSGF2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cnVlQXJyID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFycltpXTtcclxuICAgICAgICAgICAgaWYgKHRydWVBcnJbMF0gPT0gYXJyWzBdICYmIHRydWVBcnJbMV0gPT0gYXJyWzFdICYmIHRydWVBcnJbMl0gPT0gYXJyWzJdKSB7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLnN0b3BTb3VuZEJ5TmFtZShTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueFp+ebuOacuuWSlOWak+mfs+aViFwiXSk7XHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54Wn55u45py65ZKU5ZqT6Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zaG90TWFzay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3RNYXNrLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdE1hc2sub3BhY2l0eSA9IDIwMDtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaG90TWFzaykudG8oMC4yLCB7IG9wYWNpdHk6IDUwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90TWFzay5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdF9ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdF9ub2RlLnggPSAtMzAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90X25vZGUueSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3Rfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNoaWd1YW5faWRsZSh0aGlzLnNob3Rfbm9kZS5nZXRDaGlsZEJ5TmFtZShcImd1YW5fXCIgKyAoaSArIDEpKSwgYXJyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNIYXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVXcm9uZyhpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVHJ1ZShhcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0sIDAuMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVXcm9uZyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5TVUJNSVQsIGZhbHNlKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi6ZSZ6K+v6Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIumUmeivr+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IHRydWVOb2RlID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5baW5kZXhdO1xyXG4gICAgICAgIHRoaXMuaXNTaG90ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX3BhaXpoYW9cIikuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNhYmxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2hvdEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjdW93dSA9IHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2N1b3d1XCIpO1xyXG4gICAgICAgIGN1b3d1LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY2MudHdlZW4oY3Vvd3UpLnRvKDAuMSwgeyBvcGFjaXR5OiAyNTUgfSkuZGVsYXkoMC4xNSkudG8oMC4xLCB7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgLnRvKDAuMSwgeyBvcGFjaXR5OiAyNTUgfSkuZGVsYXkoMC4xNSkudG8oMC4xLCB7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgLnRvKDAuMSwgeyBvcGFjaXR5OiAyNTUgfSkuZGVsYXkoMC4xNSkudG8oMC4xLCB7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgVUlIZWxwLmNsb3NlTWFzaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90TWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRydWUoYXJyOiBudW1iZXJbXSkge1xyXG4gICAgICAgIGxldCB0cnVlSW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxUcnVlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cnVlQXJyID0gdGhpcy5hbGxUcnVlQXJyW2ldO1xyXG4gICAgICAgICAgICBpZiAodHJ1ZUFyclswXSA9PSBhcnJbMF0gJiYgdHJ1ZUFyclsxXSA9PSBhcnJbMV0gJiYgdHJ1ZUFyclsyXSA9PSBhcnJbMl0pIHtcclxuICAgICAgICAgICAgICAgIHRydWVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInRydWVJbmRleFwiLCB0cnVlSW5kZXgpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IE51bWJlcihTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFsbFRydWVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRydWVBcnIgPSB0aGlzLmFsbFRydWVBcnJbaV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnJbal07XHJcbiAgICAgICAgICAgICAgICBpZiAodHJ1ZUFyclswXSA9PSBhcnJbMF0gJiYgdHJ1ZUFyclsxXSA9PSBhcnJbMV0gJiYgdHJ1ZUFyclsyXSA9PSBhcnJbMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IHRydWVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJ1ZU5vZGUgPSB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbltqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGZQb3MgPSBjYy52Myh0cnVlTm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0VHJ1ZU5vZGUgPSB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbltqICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmRQb3MgPSBuZXh0VHJ1ZU5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRydWVOb2RlKS5kZWxheSgwLjUpLnRvKDEsIHsgcG9zaXRpb246IGVuZFBvcyB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVOb2RlLnBvc2l0aW9uID0gc2VsZlBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidHJ1ZUluZGV4MjIyXCIsIHRydWVJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbmRleFwiLCBpbmRleCk7XHJcbiAgICAgICAgaWYgKHRydWVJbmRleCA8IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoIC0gMSkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdHJ1ZUluZGV4OyBpIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cnVlTm9kZSA9IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGZQb3MgPSBjYy52Myh0cnVlTm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFRydWVOb2RlID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5baSArIDFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFBvcyA9IG5leHRUcnVlTm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRydWVOb2RlKS5kZWxheSgwLjUpLnRvKDEsIHsgcG9zaXRpb246IGVuZFBvcyB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0cnVlTm9kZS5wb3NpdGlvbiA9IHNlbGZQb3M7XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlblt0cnVlSW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gY2MudjModGhpcy5yaWdodEFyZWFfcG9zWCwgdGFyZ2V0UG9zLnkpO1xyXG5cclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaG90X25vZGUpLmRlbGF5KDAuNSkudG8oMSwgeyBwb3NpdGlvbjogZW5kUG9zLCBzY2FsZTogMC4yMyB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTaG93VHJ1ZU5vZGUodHJ1ZUluZGV4LCBhcnIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Nob3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFVJSGVscC5jbG9zZU1hc2soKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdE1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0QXJlYS5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2hvd1RydWVOb2RlKGksIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5yaWdodEFyZWEuY2hpbGRyZW5bdGFyZ2V0SW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gY2MudjModGhpcy5yaWdodEFyZWFfcG9zWCwgdGFyZ2V0UG9zLnkpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNob3Rfbm9kZSkuZGVsYXkoMC41KS50bygxLCB7IHBvc2l0aW9uOiBlbmRQb3MsIHNjYWxlOiAwLjIzIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNob3dUcnVlTm9kZSh0YXJnZXRJbmRleCwgYXJyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTaG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBVSUhlbHAuY2xvc2VNYXNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3RNYXNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodEFyZWEuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNob3dUcnVlTm9kZShpLCBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVTaG93VHJ1ZU5vZGUoaW5kZXgsIGFycjogbnVtYmVyW10pIHtcclxuICAgICAgICBsZXQgaXNIYXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50cnVlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cnVlQXJyID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFycltpXTtcclxuICAgICAgICAgICAgaWYgKHRydWVBcnJbMF0gPT0gYXJyWzBdICYmIHRydWVBcnJbMV0gPT0gYXJyWzFdICYmIHRydWVBcnJbMl0gPT0gYXJyWzJdKSB7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc0hhdmUpIHtcclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyci5wdXNoKGFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0ZW1wVHJ1ZUFyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxUcnVlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxUcnVlQXJyID0gdGhpcy5hbGxUcnVlQXJyW2ldO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cnVlQXJyID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFycltqXTtcclxuICAgICAgICAgICAgICAgIGlmICh0cnVlQXJyWzBdID09IGFsbFRydWVBcnJbMF0gJiYgdHJ1ZUFyclsxXSA9PSBhbGxUcnVlQXJyWzFdICYmIHRydWVBcnJbMl0gPT0gYWxsVHJ1ZUFyclsyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBUcnVlQXJyLnB1c2godHJ1ZUFycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEudHJ1ZUFyciA9IHRlbXBUcnVlQXJyO1xyXG4gICAgICAgIGxldCB0cnVlTm9kZSA9IHRoaXMucmlnaHRBcmVhLmNoaWxkcmVuW2luZGV4XTtcclxuICAgICAgICB0cnVlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwic2hpZ3Vhbl8xXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gYXJyWzBdICsgXCJpZGxlXCI7XHJcbiAgICAgICAgdHJ1ZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzaGlndWFuXzJcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5hbmltYXRpb24gPSBhcnJbMV0gKyBcImlkbGVcIjtcclxuICAgICAgICB0cnVlTm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoaWd1YW5fM1wiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IGFyclsyXSArIFwiaWRsZVwiO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclswXS50b1N0cmluZygpO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fMlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclsxXS50b1N0cmluZygpO1xyXG4gICAgICAgIHRydWVOb2RlLmdldENoaWxkQnlOYW1lKFwibGJsX3NoaWd1YW5fM1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFyclsyXS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1N1Ym1pdCgpIHtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgaWYgKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnRydWVBcnIubGVuZ3RoIDwgNSkge1xyXG4gICAgICAgICAgICBMaXN0ZW5lck1hbmFnZXIuZGlzcGF0Y2goRXZlbnRUeXBlLlNVQk1JVCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBTb3VuZE1hbmFnZXIuc3RvcFNvdW5kQnlOYW1lKFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi6ZSZ6K+v6Z+z5pWIXCJdKTtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLplJnor6/pn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBVSUhlbHAuc2hvd01hc2soKTtcclxuICAgICAgICAgICAgVUlIZWxwLnNob3dUaXAoXCLov5jmnInliIbms5XmsqHmnInmib7liLDlk6bvvIFcIik7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIFVJSGVscC5jbG9zZU1hc2soKTtcclxuICAgICAgICAgICAgLy8gfSwgMSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yaWdodEFyZWHovbvlvq7mipbliqhcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5yaWdodEFyZWEpLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYICsgNSB9KS50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCAtIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCArIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCAtIDUgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgeDogdGhpcy5yaWdodEFyZWFfcG9zWCB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgb3V0TGluZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm91dExpbmVcIik7XHJcbiAgICAgICAgICAgIG91dExpbmUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MudHdlZW4ob3V0TGluZSkudG8oMC4xLCB7IHg6IHRoaXMucmlnaHRBcmVhX3Bvc1ggKyA1IH0pLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIC0gNSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYICsgNSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIC0gNSB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyB4OiB0aGlzLnJpZ2h0QXJlYV9wb3NYIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG91dExpbmUpLnRvKDAuMSwgeyBvcGFjaXR5OiAyNTUgfSkuZGVsYXkoMC4xNSkudG8oMC4xLCB7IG9wYWNpdHk6IDAgfSlcclxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgb3BhY2l0eTogMjU1IH0pLmRlbGF5KDAuMTUpLnRvKDAuMSwgeyBvcGFjaXR5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IG9wYWNpdHk6IDI1NSB9KS5kZWxheSgwLjE1KS50bygwLjEsIHsgb3BhY2l0eTogMCB9KVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFVJSGVscC5jbG9zZU1hc2soKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMaXN0ZW5lck1hbmFnZXIuZGlzcGF0Y2goRXZlbnRUeXBlLlNVQk1JVCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBpbWdfeWluemhhbmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfeWluemhhbmdcIik7XHJcbiAgICAgICAgICAgIC8vaW1nX3lpbnpoYW5n5YGa5LiA56eN5b6A5LiL56C455qE5Yqo55S7XHJcbiAgICAgICAgICAgIGltZ195aW56aGFuZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbWdfeWluemhhbmcuc2NhbGUgPSAzO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl94aWFuZ2ppLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bl90aWppYW8ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGltZ195aW56aGFuZykudG8oMC4xLCB7IHNjYWxlOiAxIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdhbWVPdmVyKCkge1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5kaXNwYXRjaChFdmVudFR5cGUuR0FNRV9PVkVSKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19