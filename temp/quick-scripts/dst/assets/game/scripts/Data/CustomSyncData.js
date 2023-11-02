
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/Data/CustomSyncData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f6665ym0IlJNYKq4da/THmw', 'CustomSyncData');
// game/scripts/Data/CustomSyncData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSyncData = void 0;
/**
 * 需要同步的自定义数据
 * 游戏业务层同步数据在这里添加
 */
var CustomSyncData = /** @class */ (function () {
    function CustomSyncData() {
        this.curLevel = 0; // 当前关卡(第一关为0)
        // TODO 自定义
        this.shiguan_1 = 1;
        this.shiguan_2 = 1;
        this.shiguan_3 = 6;
        this.trueArr = [];
    }
    return CustomSyncData;
}());
exports.CustomSyncData = CustomSyncData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcRGF0YVxcQ3VzdG9tU3luY0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztHQUdHO0FBQ0g7SUFBQTtRQUNXLGFBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjO1FBQzNDLFdBQVc7UUFFSixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixZQUFPLEdBQU8sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFBRCxxQkFBQztBQUFELENBUkEsQUFRQyxJQUFBO0FBUlksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOmcgOimgeWQjOatpeeahOiHquWumuS5ieaVsOaNrlxuICog5ri45oiP5Lia5Yqh5bGC5ZCM5q2l5pWw5o2u5Zyo6L+Z6YeM5re75YqgXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXN0b21TeW5jRGF0YSB7XG4gICAgcHVibGljIGN1ckxldmVsOiBudW1iZXIgPSAwOyAvLyDlvZPliY3lhbPljaEo56ys5LiA5YWz5Li6MClcbiAgICAvLyBUT0RPIOiHquWumuS5iVxuXG4gICAgcHVibGljIHNoaWd1YW5fMTogbnVtYmVyID0gMTtcbiAgICBwdWJsaWMgc2hpZ3Vhbl8yOiBudW1iZXIgPSAxO1xuICAgIHB1YmxpYyBzaGlndWFuXzM6IG51bWJlciA9IDY7XG4gICAgcHVibGljIHRydWVBcnI6IFtdID0gW107XG59XG4iXX0=