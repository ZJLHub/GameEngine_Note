import { Right } from "../const/MathConst";
import { UIScene, UIZorder } from "../const/UIConst";
import UIMng from "../manager/UIMng";
import PlayerController from "./PlayerController";

export default class AIForRotateController extends Laya.Script3D {

    private _AIplayer: Laya.Sprite3D;
    private _enemy: Laya.Sprite3D;

    private _enemyPoint: Laya.Sprite3D[] = [];//敌人移动点
    private _moveSpeed:number = 0.016;

    onAwake() {
        let scene: Laya.Scene3D = this.owner as Laya.Scene3D;
        // UIMng.instance.openUIScene(UIScene.JoyStick,UIZorder.scene); //开启UI
        this._AIplayer = scene.getChildByName("AIPlayer") as Laya.Sprite3D;
        this._AIplayer.addComponent(PlayerController);
        this._enemy = scene.getChildByName("Enemy") as Laya.Sprite3D;

        console.log("AIForRotateController this._AIplayer.transform.position::::::::",this._AIplayer.transform.position);

    }

    private _consoleTime:number = 0;

    onUpdate() {
        if (this._AIplayer && this._AIplayer.transform) {

            //转向敌人  
            // let aiUp:Laya.Vector3 = new Laya.Vector3();

            //先测试向前走吧
            let aiFor: Laya.Vector3 = new Laya.Vector3();
            this._AIplayer.transform.getForward(aiFor);
            this._consoleTime+=Laya.timer.delta;
            if(this._consoleTime>=1000){
                this._consoleTime = 0;
                console.log(aiFor);
            }
            let tarPos:Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.scale(aiFor,this._moveSpeed,aiFor);//_moveSpeed:number = 0.016;
            // Laya.Vector3.add(this._AIplayer.transform.position.clone(),aiFor,tarPos);
            let aiPos:Laya.Vector3 = this._AIplayer.transform.position;
            let tarPos2:Laya.Vector3 = new Laya.Vector3(aiPos.x+aiFor.x,aiPos.y+aiFor.y,aiPos.z+aiFor.z);
            // this._AIplayer.transform.position = tarPos2;
            


            // let aiRig: Laya.Vector3 = new Laya.Vector3();
            // this._AIplayer.transform.getRight(aiRig);
            // let tarPos:Laya.Vector3 = new Laya.Vector3();
            // Laya.Vector3.scale(aiRig,this._moveSpeed,aiRig);//_moveSpeed:number = 0.016;
            // Laya.Vector3.add(this._AIplayer.transform.position.clone(),aiRig,tarPos);
            // this._AIplayer.transform.position = tarPos;

            // let aiUp: Laya.Vector3 = new Laya.Vector3();
            // this._AIplayer.transform.getUp(aiUp);
            // let tarPos:Laya.Vector3 = new Laya.Vector3();
            // Laya.Vector3.scale(aiUp,this._moveSpeed,aiUp);//_moveSpeed:number = 0.016;
            // Laya.Vector3.add(this._AIplayer.transform.position.clone(),aiUp,tarPos);
            // this._AIplayer.transform.position = tarPos;

            // let pos = this._AIplayer.transform.position;
            // pos.z+= 0.016;
            // this._AIplayer.transform.position = pos;

        }


    }

}