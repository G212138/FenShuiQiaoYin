import { ListenerManager } from "../../../../frame/scripts/Manager/ListenerManager";
import { SoundManager } from "../../../../frame/scripts/Manager/SoundManager";
import { SyncDataManager } from "../../../../frame/scripts/Manager/SyncDataManager";
import { Tools } from "../../../../frame/scripts/Utils/Tools";
import { UIHelp } from "../../../../frame/scripts/Utils/UIHelp";
import { EventType } from "../../Data/EventType";
import { SoundConfig } from "./SoundConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {
    @property(cc.Node)
    private rightArea: cc.Node = null;
    @property(cc.Node)
    private shiguanNode: cc.Node[] = [];
    @property(cc.Label)
    private shiguanLabel: cc.Label[] = [];
    @property(cc.Node)
    private btnAddAndSub: cc.Node[] = [];
    @property(cc.Node)
    private btn_xiangji: cc.Node = null;
    @property(cc.Node)
    private btn_tijiao: cc.Node = null;
    @property(cc.Node)
    private shot_node: cc.Node = null;

    private shiguan_posY = -250;
    private rightArea_posX = 723;
    private shiguan_1: number = 1;
    private shiguan_2: number = 1;
    private shiguan_3: number = 6;

    private allTrueArr = [[1, 1, 6], [1, 2, 5], [1, 3, 4], [2, 2, 4], [2, 3, 3]];

    onLoad() {
        ListenerManager.on(EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager.on(EventType.GAME_RECONNECT, this.initUI, this);
        ListenerManager.on(EventType.GAME_REPLAY, this.handleEnterGame, this);
    }

    onDestroy() {
        ListenerManager.off(EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager.off(EventType.GAME_RECONNECT, this.initUI, this);
        ListenerManager.off(EventType.GAME_REPLAY, this.handleEnterGame, this);
    }

    private handleEnterGame() {

        this.initUI();
        this.gameStartAni();
    }

    private initUI() {
        this.initShiguan();
        this.updateBtnState();

        for (let i = 0; i < this.shiguanNode.length; i++) {
            this.shiguanNode[i].y = this.shiguan_posY;
        }
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = !SyncDataManager.getSyncData().customSyncData.shotEnable;
        this.btn_xiangji.opacity = 255;
        this.btn_tijiao.opacity = 255;
        let outLine = this.node.getChildByName("outLine");
        outLine.active = false;
        cc.Tween.stopAllByTarget(this.rightArea);
        this.rightArea.x = this.rightArea_posX;
        for (let i = 0; i < this.rightArea.childrenCount; i++) {
            let trueNode = this.rightArea.children[i];
            this.rightArea.children[i].active = false;
            let cuowu = trueNode.getChildByName("img_cuowu");
            cuowu.active = false;
        }

        for (let i = 0; i < SyncDataManager.getSyncData().customSyncData.trueArr.length; i++) {
            let arr = SyncDataManager.getSyncData().customSyncData.trueArr[i];
            let trueNode = this.rightArea.children[i];
            trueNode.active = true;
            trueNode.getChildByName("shiguan_1").getComponent(sp.Skeleton).animation = arr[0] + "idle";
            trueNode.getChildByName("shiguan_2").getComponent(sp.Skeleton).animation = arr[1] + "idle";
            trueNode.getChildByName("shiguan_3").getComponent(sp.Skeleton).animation = arr[2] + "idle";
            trueNode.getChildByName("lbl_shiguan_1").getComponent(cc.Label).string = arr[0].toString();
            trueNode.getChildByName("lbl_shiguan_2").getComponent(cc.Label).string = arr[1].toString();
            trueNode.getChildByName("lbl_shiguan_3").getComponent(cc.Label).string = arr[2].toString();
        }
        this.node.getChildByName("img_yinzhang").active = SyncDataManager.getSyncData().frameSyncData.isGameOver;
    }

    private initShiguan() {
        this.shiguan_1 = SyncDataManager.getSyncData().customSyncData.shiguan_1;
        this.shiguan_2 = SyncDataManager.getSyncData().customSyncData.shiguan_2;
        this.shiguan_3 = SyncDataManager.getSyncData().customSyncData.shiguan_3;

        this.setShiguan_idle(this.shiguanNode[0], this.shiguan_1);
        this.setShiguan_idle(this.shiguanNode[1], this.shiguan_2);
        this.setShiguan_idle(this.shiguanNode[2], this.shiguan_3);
        this.setShiguan_lbl(this.shiguanLabel[0], this.shiguan_1);
        this.setShiguan_lbl(this.shiguanLabel[1], this.shiguan_2);
        this.setShiguan_lbl(this.shiguanLabel[2], this.shiguan_3);
    }

    private gameStartAni() {
        this.rightArea.x = 1280;
        for (let i = 0; i < this.shiguanNode.length; i++) {
            this.shiguanNode[i].y = 600;
        }
        this.btn_xiangji.opacity = 0;
        this.btn_tijiao.opacity = 0;
        cc.tween(this.rightArea).to(0.5, { x: this.rightArea_posX }).call(() => {
            cc.tween(this.shiguanNode[0]).to(0.5, { y: this.shiguan_posY }).start();
            cc.tween(this.shiguanNode[1]).delay(0.2).to(0.5, { y: this.shiguan_posY }).start();
            cc.tween(this.shiguanNode[2]).delay(0.4).to(0.5, { y: this.shiguan_posY }).call(() => {
                cc.tween(this.btn_xiangji).to(0.5, { opacity: 255 }).start();
                cc.tween(this.btn_tijiao).to(0.5, { opacity: 255 }).start();
            }).start();
        }).start();
    }

    private setShiguan_idle(shiguan: cc.Node, num: Number) {
        let aniName = num + "idle";
        Tools.playSpine(shiguan.getComponent(sp.Skeleton), aniName, true);
    }

    private setShiguan_lbl(shiguan: cc.Label, num: Number) {
        shiguan.string = num.toString();
    }

    private onClickShiguan_1_add() {
        if (this.shiguan_1 >= 6 || this.shiguan_3 < 1) return;
        SoundManager.stopSoundByName(SoundConfig.soudlist["点击音效"]);
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = false;
        SyncDataManager.getSyncData().customSyncData.shotEnable = true;
        this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 + 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        this.shiguan_1++;
        this.shiguan_3--;
        SyncDataManager.getSyncData().customSyncData.shiguan_1 = this.shiguan_1;
        SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    }

    private onClickShiguan_1_sub() {
        if (this.shiguan_3 == 6 || this.shiguan_1 == 1) return;
        SoundManager.stopSoundByName(SoundConfig.soudlist["点击音效"]);
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = false;
        SyncDataManager.getSyncData().customSyncData.shotEnable = true;
        this.setShiguan_ani(this.shiguanNode[0], this.shiguan_1, this.shiguan_1 - 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        this.shiguan_1--;
        this.shiguan_3++;
        SyncDataManager.getSyncData().customSyncData.shiguan_1 = this.shiguan_1;
        SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    }

    private onClickShiguan_2_add() {
        if (this.shiguan_2 >= 6 || this.shiguan_3 < 1) return;
        SoundManager.stopSoundByName(SoundConfig.soudlist["点击音效"]);
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = false;
        SyncDataManager.getSyncData().customSyncData.shotEnable = true;
        this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 + 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 - 1);
        this.shiguan_2++;
        this.shiguan_3--;
        SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
        SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    }

    private onClickShiguan_2_sub() {
        if (this.shiguan_3 == 6 || this.shiguan_2 == 1) return;
        SoundManager.stopSoundByName(SoundConfig.soudlist["点击音效"]);
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false, false);
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = false;
        SyncDataManager.getSyncData().customSyncData.shotEnable = true;
        this.setShiguan_ani(this.shiguanNode[1], this.shiguan_2, this.shiguan_2 - 1);
        this.setShiguan_ani(this.shiguanNode[2], this.shiguan_3, this.shiguan_3 + 1);
        this.shiguan_2--;
        this.shiguan_3++;
        SyncDataManager.getSyncData().customSyncData.shiguan_2 = this.shiguan_2;
        SyncDataManager.getSyncData().customSyncData.shiguan_3 = this.shiguan_3;
        this.updateBtnState();
    }

    private updateBtnState() {
        this.updateLbl();
        this.btnAddAndSub[1].getChildByName("disable").active = this.shiguan_1 == 1 || this.shiguan_3 == 6;
        this.btnAddAndSub[3].getChildByName("disable").active = this.shiguan_2 == 1 || this.shiguan_3 == 6;

        this.btnAddAndSub[0].getChildByName("disable").active = this.shiguan_1 == 6 || this.shiguan_3 == 1;
        this.btnAddAndSub[2].getChildByName("disable").active = this.shiguan_2 == 6 || this.shiguan_3 == 1;
    }

    private updateLbl() {
        this.shiguanLabel[0].string = this.shiguan_1.toString();
        this.shiguanLabel[1].string = this.shiguan_2.toString();
        this.shiguanLabel[2].string = this.shiguan_3.toString();
    }

    private setShiguan_ani(shiguan: cc.Node, fromNum: Number, toNum: Number) {
        let aniName = fromNum + "to" + toNum;
        let idleName = toNum + "idle";
        Tools.playSpine(shiguan.getComponent(sp.Skeleton), aniName, false, () => {
            Tools.playSpine(shiguan.getComponent(sp.Skeleton), idleName, true);
        });
    }

    private isShot: boolean = false;
    private onClickShot() {
        UIHelp.showMask();
        if (this.isShot) return;
        this.isShot = true;
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = true;
        SyncDataManager.getSyncData().customSyncData.shotEnable = false;
        SoundManager.stopSoundByName(SoundConfig.soudlist["点击音效"]);
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false, false);
        let arr = [this.shiguan_1, this.shiguan_2, this.shiguan_3];
        arr.sort((a, b) => {
            return a - b;
        });
        for (let i = 0; i < 3; i++) {
            this.setShiguan_idle(this.shiguanNode[i], arr[i]);
            this.setShiguan_lbl(this.shiguanLabel[i], arr[i]);
        }
        this.shiguan_1 = arr[0];
        this.shiguan_2 = arr[1];
        this.shiguan_3 = arr[2];
        this.updateBtnState();
        //判断SyncDataManager.getSyncData().customSyncData.trueArr中是否有arr
        let isHave = false;
        let index = 0;
        for (let i = 0; i < SyncDataManager.getSyncData().customSyncData.trueArr.length; i++) {
            let trueArr = SyncDataManager.getSyncData().customSyncData.trueArr[i];
            if (trueArr[0] == arr[0] && trueArr[1] == arr[1] && trueArr[2] == arr[2]) {
                isHave = true;
                index = i;
                break;
            }
        }
        if (isHave) {
            this.handleWrong(index);
        } else {
            this.handleTrue(arr);
        }
    }

    private handleWrong(index: number) {
        SoundManager.stopSoundByName(SoundConfig.soudlist["错误音效"]);
        SoundManager.playEffect(SoundConfig.soudlist["错误音效"], false, false, false);
        let trueNode = this.rightArea.children[index];
        this.isShot = false;
        this.node.getChildByName("btn_paizhao").getChildByName("disable").active = true;
        SyncDataManager.getSyncData().customSyncData.shotEnable = false;
        let cuowu = trueNode.getChildByName("img_cuowu");
        cuowu.active = true;
        cc.tween(cuowu).to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
            .to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
            .to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
            .call(() => {
                UIHelp.closeMask();
            })
            .start();

    }

    private handleTrue(arr: number[]) {
        this.shot_node.scale = 1;
        this.shot_node.x = -300;
        this.shot_node.y = 0;
        this.shot_node.active = true;
        let targetIndex = SyncDataManager.getSyncData().customSyncData.trueArr.length;
        //this.shot_node移动到rightArea.children[targetIndex]位置
        let targetPos = this.rightArea.children[targetIndex].position;
        let endPos = cc.v3(this.rightArea_posX, targetPos.y);
        cc.tween(this.shot_node).to(0.5, { position: endPos, scale: 0.23 }).call(() => {
            this.shot_node.active = false;
            this.handleShowTrueNode(targetIndex, arr);
            this.isShot = false;
            UIHelp.closeMask();
        }).start();
    }

    private handleShowTrueNode(index, arr: number[]) {
        SyncDataManager.getSyncData().customSyncData.trueArr.push(arr);
        let trueNode = this.rightArea.children[index];
        trueNode.active = true;
        trueNode.getChildByName("shiguan_1").getComponent(sp.Skeleton).animation = arr[0] + "idle";
        trueNode.getChildByName("shiguan_2").getComponent(sp.Skeleton).animation = arr[1] + "idle";
        trueNode.getChildByName("shiguan_3").getComponent(sp.Skeleton).animation = arr[2] + "idle";
        trueNode.getChildByName("lbl_shiguan_1").getComponent(cc.Label).string = arr[0].toString();
        trueNode.getChildByName("lbl_shiguan_2").getComponent(cc.Label).string = arr[1].toString();
        trueNode.getChildByName("lbl_shiguan_3").getComponent(cc.Label).string = arr[2].toString();
    }

    private onClickSubmit() {
        SoundManager.stopSoundByName(SoundConfig.soudlist["点击音效"]);
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false, false);
        if (SyncDataManager.getSyncData().customSyncData.trueArr.length < 5) {
            ListenerManager.dispatch(EventType.SUBMIT, false);
            SoundManager.stopSoundByName(SoundConfig.soudlist["错误音效"]);
            SoundManager.playEffect(SoundConfig.soudlist["错误音效"], false, false, false);
            UIHelp.showMask();
            UIHelp.showTip("还有分法没有找到哦！");
            // this.scheduleOnce(() => {
            //     UIHelp.closeMask();
            // }, 1);
            //this.rightArea轻微抖动
            cc.tween(this.rightArea).to(0.1, { x: this.rightArea_posX + 5 }).to(0.1, { x: this.rightArea_posX - 5 })
                .to(0.1, { x: this.rightArea_posX + 5 })
                .to(0.1, { x: this.rightArea_posX - 5 })
                .to(0.1, { x: this.rightArea_posX }).start();
            let outLine = this.node.getChildByName("outLine");
            outLine.active = true;
            cc.tween(outLine).to(0.1, { x: this.rightArea_posX + 5 }).to(0.1, { x: this.rightArea_posX - 5 })
                .to(0.1, { x: this.rightArea_posX + 5 })
                .to(0.1, { x: this.rightArea_posX - 5 })
                .to(0.1, { x: this.rightArea_posX }).start();
            cc.tween(outLine).to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
                .to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
                .to(0.1, { opacity: 255 }).delay(0.15).to(0.1, { opacity: 0 })
                .call(() => {
                    UIHelp.closeMask();
                })
                .start();
        } else {
            ListenerManager.dispatch(EventType.SUBMIT, true);
            let img_yinzhang = this.node.getChildByName("img_yinzhang");
            //img_yinzhang做一种往下砸的动画
            img_yinzhang.active = true;
            img_yinzhang.scale = 3;
            cc.tween(img_yinzhang).to(0.1, { scale: 1 }).call(() => {
                this.gameOver();
            }).start();
        }
    }

    private gameOver() {
        ListenerManager.dispatch(EventType.GAME_OVER);
    }

}
