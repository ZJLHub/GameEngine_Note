export default class TestSceneController extends Laya.Script3D{
    private _scene:Laya.Scene3D;
    
    onAwake(){
        this._scene = this.owner as Laya.Scene3D;
        console.log("TestSceneController  执行",this._scene.name);
    }

}