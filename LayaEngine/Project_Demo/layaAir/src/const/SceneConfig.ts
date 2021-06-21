import TestSceneController from "../controller/TestSceneController";
export enum SceneTag{
    testScene = 0,
}
export type Scene3D = {
    url:string,
    ctr:any
}
export default class SceneConfig {
    private _instance:SceneConfig;
    public get instance(){
        if(!this._instance) this._instance = new SceneConfig();
        return this._instance;
    }
    private _sceneConfig:{[tag:number]:Scene3D} = {
        [SceneTag.testScene]:{
            url:"bin/subpackage/LayaScene_TestScene/Conventional/TestScene.ls",
            ctr:TestSceneController
        }
    }

    public get sceneConfig(){
        return this._sceneConfig;
    }
}