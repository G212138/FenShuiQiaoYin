import { ListenerManager } from "../../../../frame/scripts/Manager/ListenerManager";
import { SyncDataManager } from "../../../../frame/scripts/Manager/SyncDataManager";
import { Tools } from "../../../../frame/scripts/Utils/Tools";
import { EventType } from "../../Data/EventType";

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

    private shiguan_posY = -250;
    private rightArea_posX = 723;
    private shiguan_1: number = 1;
    private shiguan_2: number = 1;
    private shiguan_3: number = 6;

    private allTrueArr = [[1, 1, 6], [1, 2, 5], [1, 3, 4], [2, 2, 4], [2, 3, 3]];

    onLoad() {
        ListenerManager.on(EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager.on(EventType.GAME_RECONNECT, this.initUI, this);
    }

    onDestroy() {
        ListenerManager.off(EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager.off(EventType.GAME_RECONNECT, this.initUI, this);
    }

    private handleEnterGame() {

        this.initUI();
        this.gameStartAni();
    }

    private initUI() {
        this.initShiguan();
        this.updateBtnState();
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

    private onClickShot() {
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
    }

    private onClickSubmit() {

    }

}
