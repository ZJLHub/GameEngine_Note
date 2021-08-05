import AIForRotateController from "../controller/AIForRotateController";
import RenderTextureDemoCtr from "../controller/RenderTextureDemoCtr";
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
    RenderTextureDemo = 2,//rt测试

}
export enum SceneUICanvas{
    default = "default",
    joyDemoCanvas = "joyDemoCanvas",
    AIRotate = "AIRotate",
    renderTexture = "renderTexture",
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
        },
        [SceneTag.RenderTextureDemo]:{
            url:"subpackage/LayaScene_RenderTextureDemo/Conventional/RenderTextureDemo.ls",
            ctr:RenderTextureDemoCtr,
            canvas:SceneUICanvas.renderTexture
        },
        [SceneTag.AIRotate]:{
            url:"subpackage/LayaScene_AIForRotate/Conventional/AIForRotate.ls",
            ctr:AIForRotateController,
            canvas:SceneUICanvas.AIRotate
        }
    }

    public get sceneConfig(){
        return this._sceneConfig;
    }
}