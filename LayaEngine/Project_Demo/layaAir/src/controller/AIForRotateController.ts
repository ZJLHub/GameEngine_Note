import { UIScene, UIZorder } from "../const/UIConst";
import UIMng from "../manager/UIMng";
import PlayerController from "./PlayerController";

export default class AIForRotateController extends Laya.Script3D{
    
    private _player:Laya.Sprite3D;
    private _enemy:Laya.Sprite3D;
    onAwake(){
        let scene:Laya.Scene3D = this.owner as Laya.Scene3D;
        UIMng.instance.openUIScene(UIScene.JoyStick,UIZorder.scene); //开启UI
        this._player = scene.getChildByName("AIPlayer") as Laya.Sprite3D;
        this._player.addComponent(PlayerController);

        this._enemy = scene.getChildByName("Enemy") as Laya.Sprite3D;


    }

}