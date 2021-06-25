import TestSceneController from "../controller/TestSceneController";
export enum SceneTag{
    testScene = 0,
}
export type Scene3D = {
    url:string,
    ctr:any,
    constructParams?: Array<any>;
    propertyParams?: Object;
}
export default class SceneConfig {
    private static _instance:SceneConfig;
    public static get instance(){
        if(!this._instance) this._instance = new SceneConfig();
        return this._instance;
    }
    private _sceneConfig:{[tag:number]:Scene3D} = {
        [SceneTag.testScene]:{
            url:"subpackage/LayaScene_TestScene/Conventional/TestScene.ls",
            ctr:TestSceneController
        }
    }

    public get sceneConfig(){
        return this._sceneConfig;
    }
}