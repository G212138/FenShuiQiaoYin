
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frame/scripts/UI/Panel/BaseGamePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1694s8BidGvaCpzhIeiAbf', 'BaseGamePanel');
// frame/scripts/UI/Panel/BaseGamePanel.ts

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
var ConstValue_1 = require("../../../../game/scripts/Data/ConstValue");
var EditorManager_1 = require("../../../../game/scripts/Manager/EditorManager");
var FrameMsgType_1 = require("../../Data/FrameMsgType");
var NetWork_1 = require("../../Http/NetWork");
var ListenerManager_1 = require("../../Manager/ListenerManager");
var ReportManager_1 = require("../../Manager/ReportManager");
var SoundManager_1 = require("../../Manager/SoundManager");
var SyncDataManager_1 = require("../../Manager/SyncDataManager");
var UIManager_1 = require("../../Manager/UIManager");
var GameMsg_1 = require("../../SDK/GameMsg");
var T2M_1 = require("../../SDK/T2M");
var UIHelp_1 = require("../../Utils/UIHelp");
var BaseUI_1 = require("../BaseUI");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseGamePanel = /** @class */ (function (_super) {
    __extends(BaseGamePanel, _super);
    function BaseGamePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isPanelReady = false;
        _this.isRresult = true;
        return _this;
    }
    // onLoad () {}
    BaseGamePanel.prototype.start = function () {
        if (this.data && this.data.node && this.data.node.parent) {
            this.data.node.removeFromParent();
        }
        // 发送GameStart
        GameMsg_1.default.gameStart(this.isRresult);
        this.addSDKEventListener();
        if (NetWork_1.NetWork.isSync && !NetWork_1.NetWork.isMaster) {
            UIHelp_1.UIHelp.showRecoverMask();
        }
        ListenerManager_1.ListenerManager.dispatch(FrameMsgType_1.FrameMsgType.TEACHER_PANEL_LOADING, false);
        if (ConstValue_1.ConstValue.IS_TEACHER) {
            this.panelReady();
            UIHelp_1.UIHelp.showUploadAndReturnPanel();
        }
        else {
            this.getNet();
        }
    };
    BaseGamePanel.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        UIHelp_1.UIHelp.closeMask();
    };
    BaseGamePanel.prototype.panelReady = function () {
        this._isPanelReady = true;
        if (UIManager_1.UIManager.isGameShowing) {
            this.setPanel();
        }
        else {
            cc.game.pause();
        }
    };
    BaseGamePanel.prototype.setPanel = function () {
        T2M_1.T2M.init();
        SyncDataManager_1.SyncDataManager.initSyncData();
        ReportManager_1.ReportManager.initReportData(EditorManager_1.EditorManager.getLevelCount());
        if (!NetWork_1.NetWork.isSync || NetWork_1.NetWork.isMaster) {
            UIHelp_1.UIHelp.closeRecoverMask();
        }
        if (EditorManager_1.EditorManager.editorData.isStarCount) {
            cc.resources.load('prefab/ui/panel/OverTips');
        }
        else {
            cc.resources.load('prefab/ui/panel/StarCount');
        }
    };
    BaseGamePanel.prototype.onRecoveryData = function (recovery) {
        SyncDataManager_1.SyncDataManager.setSyncData(recovery);
        if (SyncDataManager_1.SyncDataManager.syncData.frameSyncData.isGameOver) {
            this.showGameOverPanel();
        }
        else {
            UIHelp_1.UIHelp.closeOverTips();
            UIHelp_1.UIHelp.closeStarCount();
        }
    };
    BaseGamePanel.prototype.answerRight = function (isCurLevelFinish) {
        ReportManager_1.ReportManager.reportLevelResult(true, isCurLevelFinish);
    };
    BaseGamePanel.prototype.answerWrong = function (isCurLevelFinish) {
        if (isCurLevelFinish === void 0) { isCurLevelFinish = false; }
        ReportManager_1.ReportManager.reportLevelResult(false, isCurLevelFinish);
    };
    BaseGamePanel.prototype.gameOver = function () {
        SyncDataManager_1.SyncDataManager.syncData.frameSyncData.isGameOver = true;
        this.showGameOverPanel();
    };
    BaseGamePanel.prototype.showGameOverPanel = function () {
        UIHelp_1.UIHelp.showMask();
        SoundManager_1.SoundManager.stopAll();
        var isShowReplay = EditorManager_1.EditorManager.editorData.isReplay &&
            SyncDataManager_1.SyncDataManager.syncData.frameSyncData.hasReplayCount < EditorManager_1.EditorManager.editorData.replayCount;
        // if (EditorManager.editorData.isStarCount) {
        //     UIHelp.showStarCount(isShowReplay);
        // } else {
        var str = 1 === EditorManager_1.EditorManager.getLevelCount() ? '挑战成功' : '闯关成功';
        UIHelp_1.UIHelp.showOverTips(2, '', null, str, isShowReplay);
        // }
    };
    BaseGamePanel.prototype.onGameShow = function () {
        if (this._isPanelReady) {
            cc.game.resume();
            this.setPanel();
        }
    };
    BaseGamePanel.prototype.onReplay = function () {
        UIHelp_1.UIHelp.closeOverTips();
        UIHelp_1.UIHelp.closeStarCount();
        SyncDataManager_1.SyncDataManager.replay();
        ReportManager_1.ReportManager.replayGame();
    };
    BaseGamePanel.prototype.addSDKEventListener = function () {
        // 小组课
        GameMsg_1.default.addEvent(FrameMsgType_1.FrameMsgType.STOP, this.onSDKMsgStopReceived.bind(this));
        // 小班课
        ListenerManager_1.ListenerManager.on(FrameMsgType_1.FrameMsgType.ON_RECOVERY_DATA, this.onRecoveryData, this);
        T2M_1.T2M.addSyncEventListener(FrameMsgType_1.FrameMsgType.REPLAY_START, this.onReplay.bind(this));
        // 预加载：监听窗口打开
        ListenerManager_1.ListenerManager.on(FrameMsgType_1.FrameMsgType.PRELOAD_GAME_SHOW, this.onGameShow.bind(this), this);
    };
    BaseGamePanel.prototype.getNet = function () {
        var _this = this;
        NetWork_1.NetWork.httpRequest(NetWork_1.NetWork.GET_QUESTION + '?courseware_id=' + NetWork_1.NetWork.coursewareId, 'GET', 'application/json;charset=utf-8', function (err, response) {
            if (!err) {
                var response_data = response;
                if (Array.isArray(response_data.data)) {
                    return;
                }
                var content = JSON.parse(response_data.data.courseware_content);
                if (content != null) {
                    if (content.CoursewareKey == ConstValue_1.ConstValue.CoursewareKey) {
                        EditorManager_1.EditorManager.setData(content.data);
                        _this.panelReady();
                    }
                    else {
                        // coursewareKey错误
                        GameMsg_1.default.differntKey('CoursewareKey错误！');
                        UIHelp_1.UIHelp.showErrorPanel('CoursewareKey错误,请联系客服！', '', '', '确定');
                        return;
                    }
                }
            }
            else {
            }
        }, null);
    };
    // 游戏结束消息监听
    BaseGamePanel.prototype.onSDKMsgStopReceived = function () {
        //各游戏独立处理  先上报当前作答数据  后发送finish消息
        GameMsg_1.default.gameStop();
        //新课堂上报
        ReportManager_1.ReportManager.reportGameOver();
        GameMsg_1.default.finished();
    };
    BaseGamePanel.prototype.update = function (dt) {
        T2M_1.T2M.update();
    };
    BaseGamePanel.className = 'BaseGamePanel';
    __decorate([
        property
    ], BaseGamePanel.prototype, "isRresult", void 0);
    BaseGamePanel = __decorate([
        ccclass
    ], BaseGamePanel);
    return BaseGamePanel;
}(BaseUI_1.BaseUI));
exports.default = BaseGamePanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVcXHNjcmlwdHNcXFVJXFxQYW5lbFxcQmFzZUdhbWVQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFDdEUsZ0ZBQStFO0FBQy9FLHdEQUF1RDtBQUN2RCw4Q0FBNkM7QUFDN0MsaUVBQWdFO0FBQ2hFLDZEQUE0RDtBQUM1RCwyREFBMEQ7QUFDMUQsaUVBQTBFO0FBQzFFLHFEQUFvRDtBQUNwRCw2Q0FBd0M7QUFDeEMscUNBQW9DO0FBQ3BDLDZDQUE0QztBQUM1QyxvQ0FBbUM7QUFFN0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQU07SUFBakQ7UUFBQSxxRUFxS0M7UUFuS1csbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFHaEMsZUFBUyxHQUFZLElBQUksQ0FBQzs7SUFnS3JDLENBQUM7SUE5SkcsZUFBZTtJQUVmLDZCQUFLLEdBQUw7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDckM7UUFFRCxjQUFjO1FBQ2QsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksaUJBQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBTyxDQUFDLFFBQVEsRUFBRTtZQUNyQyxlQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDNUI7UUFDRCxpQ0FBZSxDQUFDLFFBQVEsQ0FBQywyQkFBWSxDQUFDLHFCQUFxQixFQUFF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QWUsQ0FBQztJQUkxQztRQURDLFFBQVE7b0RBQ3dCO0lBTGhCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FxS2pDO0lBQUQsb0JBQUM7Q0FyS0QsQUFxS0MsQ0FySzBDLGVBQU0sR0FxS2hEO2tCQXJLb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0VmFsdWUgfSBmcm9tICcuLi8uLi8uLi8uLi9nYW1lL3NjcmlwdHMvRGF0YS9Db25zdFZhbHVlJztcbmltcG9ydCB7IEVkaXRvck1hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9nYW1lL3NjcmlwdHMvTWFuYWdlci9FZGl0b3JNYW5hZ2VyJztcbmltcG9ydCB7IEZyYW1lTXNnVHlwZSB9IGZyb20gJy4uLy4uL0RhdGEvRnJhbWVNc2dUeXBlJztcbmltcG9ydCB7IE5ldFdvcmsgfSBmcm9tICcuLi8uLi9IdHRwL05ldFdvcmsnO1xuaW1wb3J0IHsgTGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vTWFuYWdlci9MaXN0ZW5lck1hbmFnZXInO1xuaW1wb3J0IHsgUmVwb3J0TWFuYWdlciB9IGZyb20gJy4uLy4uL01hbmFnZXIvUmVwb3J0TWFuYWdlcic7XG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tICcuLi8uLi9NYW5hZ2VyL1NvdW5kTWFuYWdlcic7XG5pbXBvcnQgeyBTeW5jRGF0YSwgU3luY0RhdGFNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vTWFuYWdlci9TeW5jRGF0YU1hbmFnZXInO1xuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vTWFuYWdlci9VSU1hbmFnZXInO1xuaW1wb3J0IEdhbWVNc2cgZnJvbSAnLi4vLi4vU0RLL0dhbWVNc2cnO1xuaW1wb3J0IHsgVDJNIH0gZnJvbSAnLi4vLi4vU0RLL1QyTSc7XG5pbXBvcnQgeyBVSUhlbHAgfSBmcm9tICcuLi8uLi9VdGlscy9VSUhlbHAnO1xuaW1wb3J0IHsgQmFzZVVJIH0gZnJvbSAnLi4vQmFzZVVJJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VHYW1lUGFuZWwgZXh0ZW5kcyBCYXNlVUkge1xuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3NOYW1lID0gJ0Jhc2VHYW1lUGFuZWwnO1xuICAgIHByaXZhdGUgX2lzUGFuZWxSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHVibGljIGlzUnJlc3VsdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5ub2RlICYmIHRoaXMuZGF0YS5ub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5Y+R6YCBR2FtZVN0YXJ0XG4gICAgICAgIEdhbWVNc2cuZ2FtZVN0YXJ0KHRoaXMuaXNScmVzdWx0KTtcbiAgICAgICAgdGhpcy5hZGRTREtFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIGlmIChOZXRXb3JrLmlzU3luYyAmJiAhTmV0V29yay5pc01hc3Rlcikge1xuICAgICAgICAgICAgVUlIZWxwLnNob3dSZWNvdmVyTWFzaygpO1xuICAgICAgICB9XG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5kaXNwYXRjaChGcmFtZU1zZ1R5cGUuVEVBQ0hFUl9QQU5FTF9MT0FESU5HLCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKENvbnN0VmFsdWUuSVNfVEVBQ0hFUikge1xuICAgICAgICAgICAgdGhpcy5wYW5lbFJlYWR5KCk7XG4gICAgICAgICAgICBVSUhlbHAuc2hvd1VwbG9hZEFuZFJldHVyblBhbmVsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldE5ldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICAgICAgVUlIZWxwLmNsb3NlTWFzaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFuZWxSZWFkeSgpIHtcbiAgICAgICAgdGhpcy5faXNQYW5lbFJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgaWYgKFVJTWFuYWdlci5pc0dhbWVTaG93aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhbmVsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5nYW1lLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UGFuZWwoKSB7XG4gICAgICAgIFQyTS5pbml0KCk7XG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5pbml0U3luY0RhdGEoKTtcbiAgICAgICAgUmVwb3J0TWFuYWdlci5pbml0UmVwb3J0RGF0YShFZGl0b3JNYW5hZ2VyLmdldExldmVsQ291bnQoKSk7XG4gICAgICAgIGlmICghTmV0V29yay5pc1N5bmMgfHwgTmV0V29yay5pc01hc3Rlcikge1xuICAgICAgICAgICAgVUlIZWxwLmNsb3NlUmVjb3Zlck1hc2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuaXNTdGFyQ291bnQpIHtcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdwcmVmYWIvdWkvcGFuZWwvT3ZlclRpcHMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdwcmVmYWIvdWkvcGFuZWwvU3RhckNvdW50Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZWNvdmVyeURhdGEocmVjb3Zlcnk6IFN5bmNEYXRhKSB7XG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5zZXRTeW5jRGF0YShyZWNvdmVyeSk7XG4gICAgICAgIGlmIChTeW5jRGF0YU1hbmFnZXIuc3luY0RhdGEuZnJhbWVTeW5jRGF0YS5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dHYW1lT3ZlclBhbmVsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBVSUhlbHAuY2xvc2VPdmVyVGlwcygpO1xuICAgICAgICAgICAgVUlIZWxwLmNsb3NlU3RhckNvdW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYW5zd2VyUmlnaHQoaXNDdXJMZXZlbEZpbmlzaDogYm9vbGVhbikge1xuICAgICAgICBSZXBvcnRNYW5hZ2VyLnJlcG9ydExldmVsUmVzdWx0KHRydWUsIGlzQ3VyTGV2ZWxGaW5pc2gpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhbnN3ZXJXcm9uZyhpc0N1ckxldmVsRmluaXNoOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgUmVwb3J0TWFuYWdlci5yZXBvcnRMZXZlbFJlc3VsdChmYWxzZSwgaXNDdXJMZXZlbEZpbmlzaCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdhbWVPdmVyKCkge1xuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuc3luY0RhdGEuZnJhbWVTeW5jRGF0YS5pc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93R2FtZU92ZXJQYW5lbCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93R2FtZU92ZXJQYW5lbCgpIHtcbiAgICAgICAgVUlIZWxwLnNob3dNYXNrKCk7XG4gICAgICAgIFNvdW5kTWFuYWdlci5zdG9wQWxsKCk7XG4gICAgICAgIGxldCBpc1Nob3dSZXBsYXk6IGJvb2xlYW4gPVxuICAgICAgICAgICAgRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLmlzUmVwbGF5ICYmXG4gICAgICAgICAgICBTeW5jRGF0YU1hbmFnZXIuc3luY0RhdGEuZnJhbWVTeW5jRGF0YS5oYXNSZXBsYXlDb3VudCA8IEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5yZXBsYXlDb3VudDtcbiAgICAgICAgLy8gaWYgKEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5pc1N0YXJDb3VudCkge1xuICAgICAgICAvLyAgICAgVUlIZWxwLnNob3dTdGFyQ291bnQoaXNTaG93UmVwbGF5KTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdHIgPSAxID09PSBFZGl0b3JNYW5hZ2VyLmdldExldmVsQ291bnQoKSA/ICfmjJHmiJjmiJDlip8nIDogJ+mXr+WFs+aIkOWKnyc7XG4gICAgICAgICAgICBVSUhlbHAuc2hvd092ZXJUaXBzKDIsICcnLCBudWxsLCBzdHIsIGlzU2hvd1JlcGxheSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2FtZVNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1BhbmVsUmVhZHkpIHtcbiAgICAgICAgICAgIGNjLmdhbWUucmVzdW1lKCk7XG4gICAgICAgICAgICB0aGlzLnNldFBhbmVsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXBsYXkoKSB7XG4gICAgICAgIFVJSGVscC5jbG9zZU92ZXJUaXBzKCk7XG4gICAgICAgIFVJSGVscC5jbG9zZVN0YXJDb3VudCgpO1xuXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5yZXBsYXkoKTtcbiAgICAgICAgUmVwb3J0TWFuYWdlci5yZXBsYXlHYW1lKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRTREtFdmVudExpc3RlbmVyKCkge1xuICAgICAgICAvLyDlsI/nu4Tor75cbiAgICAgICAgR2FtZU1zZy5hZGRFdmVudChGcmFtZU1zZ1R5cGUuU1RPUCwgdGhpcy5vblNES01zZ1N0b3BSZWNlaXZlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgLy8g5bCP54+t6K++XG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihGcmFtZU1zZ1R5cGUuT05fUkVDT1ZFUllfREFUQSwgdGhpcy5vblJlY292ZXJ5RGF0YSwgdGhpcyk7XG5cbiAgICAgICAgVDJNLmFkZFN5bmNFdmVudExpc3RlbmVyKEZyYW1lTXNnVHlwZS5SRVBMQVlfU1RBUlQsIHRoaXMub25SZXBsYXkuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8g6aKE5Yqg6L2977ya55uR5ZCs56qX5Y+j5omT5byAXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vbihGcmFtZU1zZ1R5cGUuUFJFTE9BRF9HQU1FX1NIT1csIHRoaXMub25HYW1lU2hvdy5iaW5kKHRoaXMpLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5ldCgpIHtcbiAgICAgICAgTmV0V29yay5odHRwUmVxdWVzdChcbiAgICAgICAgICAgIE5ldFdvcmsuR0VUX1FVRVNUSU9OICsgJz9jb3Vyc2V3YXJlX2lkPScgKyBOZXRXb3JrLmNvdXJzZXdhcmVJZCxcbiAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNwb25zZV9kYXRhID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3BvbnNlX2RhdGEuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IEpTT04ucGFyc2UocmVzcG9uc2VfZGF0YS5kYXRhLmNvdXJzZXdhcmVfY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50LkNvdXJzZXdhcmVLZXkgPT0gQ29uc3RWYWx1ZS5Db3Vyc2V3YXJlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yTWFuYWdlci5zZXREYXRhKGNvbnRlbnQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbFJlYWR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvdXJzZXdhcmVLZXnplJnor69cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTXNnLmRpZmZlcm50S2V5KCdDb3Vyc2V3YXJlS2V56ZSZ6K+v77yBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKCdDb3Vyc2V3YXJlS2V56ZSZ6K+vLOivt+iBlOezu+Wuouacje+8gScsICcnLCAnJywgJ+ehruWumicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8g5ri45oiP57uT5p2f5raI5oGv55uR5ZCsXG4gICAgcHJpdmF0ZSBvblNES01zZ1N0b3BSZWNlaXZlZCgpIHtcbiAgICAgICAgLy/lkITmuLjmiI/ni6znq4vlpITnkIYgIOWFiOS4iuaKpeW9k+WJjeS9nOetlOaVsOaNriAg5ZCO5Y+R6YCBZmluaXNo5raI5oGvXG4gICAgICAgIEdhbWVNc2cuZ2FtZVN0b3AoKTtcbiAgICAgICAgLy/mlrDor77loILkuIrmiqVcbiAgICAgICAgUmVwb3J0TWFuYWdlci5yZXBvcnRHYW1lT3ZlcigpO1xuICAgICAgICBHYW1lTXNnLmZpbmlzaGVkKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIFQyTS51cGRhdGUoKTtcbiAgICB9XG59XG4iXX0=