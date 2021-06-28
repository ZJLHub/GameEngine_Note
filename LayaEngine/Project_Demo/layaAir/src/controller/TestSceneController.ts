import PlayerController from "./PlayerController";

export default class TestSceneController extends Laya.Script3D{
    private _scene:Laya.Scene3D;
    private _player:Laya.Sprite3D;
    
    onAwake(){
        this._scene = this.owner as Laya.Scene3D;
        console.log("TestSceneController  执行",this._scene.name);
        this._player = this._scene.getChildByName("player") as Laya.Sprite3D;
        this._player.addComponent(PlayerController);
    }

}