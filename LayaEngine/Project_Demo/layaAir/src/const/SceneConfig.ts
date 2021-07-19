import TestSceneController from "../controller/TestSceneController";
export type Scene3D2D = {
    url:string,
    ctr:any,
    canvas:SceneUICanvas,
    constructParams?: Array<any>;
    propertyParams?: Object;
}
export enum SceneTag{
    joyDemo = 0,
    AIRotate = 1,//AI 面向目标点

}
export enum SceneUICanvas{
    joyDemoCanvas = "joyDemoCanvas",
    AIRotate = "AIRotate",
}
export default class SceneConfig {
    private static _instance:SceneConfig;
    public static get instance(){
        if(!this._instance) this._instance = new SceneConfig();
        return this._instance;
    }
    private _sceneConfig:{[tag:number]:Scene3D2D} = {
        [SceneTag.joyDemo]:{
            url:"subpackage/LayaScene_TestScene/Conventional/TestScene.ls",
            ctr:TestSceneController,
            canvas:SceneUICanvas.joyDemoCanvas
        }
    }

    public get sceneConfig(){
        return this._sceneConfig;
    }
}