import GameEvent, { GameEV } from "../const/GameConst";
import L3D from "../util/L3D";
export type joyPoint = {
    x:number;
    y:number;
}
export default class JoyStick extends Laya.Script {
    private _root: Laya.Box;
    private _joyListenBox: Laya.Box;
    private _joyPanel: Laya.Box;
    private _point: Laya.Image;

    private _radius: number = 125;

    onAwake() {
        this._root = this.owner as Laya.Box;
        this._joyListenBox = this._root.getChildByName("JoyListenBox") as Laya.Box;
        this._joyPanel = this._root.getChildByName("JoyPanel") as Laya.Box;
        this._point = this._joyPanel.getChildByName("point") as Laya.Image;
        // console.log("JoyStick",this._root);
    }

    onEnable() {
        L3D.ondown(this._joyListenBox, this, this._onMouseDown);
        L3D.onmove(this._joyListenBox, this, this._onMouseMove);
        L3D.onup(this._joyListenBox, this, this._onMouseUp);
    }
    onDisable() {
        L3D.offdown(this._joyListenBox, this, this._onMouseDown);
        L3D.offmove(this._joyListenBox, this, this._onMouseMove);
        L3D.offup(this._joyListenBox, this, this._onMouseUp);
    }

    private _onMouseDown() {
        // let e = Laya.MouseManager.instance.mouseX;
        this._joyPanel.x = Laya.MouseManager.instance.mouseX;
        this._joyPanel.y = Laya.MouseManager.instance.mouseY;
    }
    private _onMouseMove() {
        let jp = this._getJoyPoint();
        this._point.x = -jp.x + 125;
        this._point.y = -jp.y + 125;
        // console.log("jp:::",jp);
        Laya.stage.event(GameEV.Joy_Move);
        GameEvent.ev(GameEV.Joy_Move,jp);
    }
    private _onMouseUp() {
        this._joyPanel.x = 375;
        this._joyPanel.y = Laya.stage.height*0.8;
        this._point.x = 125;
        this._point.y = 125;
        GameEvent.ev(GameEV.Joy_End,null);
    }

    private _getJoyPoint() {//先用V3顶着先哈
        let dir: Laya.Vector3 = new Laya.Vector3();
        let panelV3:Laya.Vector3 = new Laya.Vector3(this._joyPanel.x, 0, this._joyPanel.y);
        let pointV3:Laya.Vector3 = new Laya.Vector3(Laya.MouseManager.instance.mouseX, 0, Laya.MouseManager.instance.mouseY);
        Laya.Vector3.subtract(panelV3,pointV3, dir);

        let dis = Laya.Vector3.distance(panelV3,pointV3);
        
        if(dis>this._radius){
            Laya.Vector3.normalize(dir,dir); 
            Laya.Vector3.scale(dir,this._radius,dir);
        }
        let joyPoint:joyPoint = {x:dir.x,y:dir.z};
        return joyPoint;
    }

}