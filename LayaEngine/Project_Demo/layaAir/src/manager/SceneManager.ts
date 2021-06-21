import { Scene3D, SceneTag } from "../const/SceneConfig";

export default class SceneManager {
    private static _instance: SceneManager;
    public static get instance() {
        return this._instance;
    }

    private _sceneConfig: { [tag: number]: Scene3D } = {};
    public init(sceneConfig: { [tag: number]: Scene3D }) {
        this._sceneConfig = sceneConfig;
    }
    private _sceneStack: Laya.Scene3D[] = [];
    private _sceneHeap: { [tag: number]: Laya.Scene3D } = {};
    private _curTag: SceneTag = -1;
    private _curScene: Laya.Scene3D;


    private _loadScene(tag: SceneTag,clearBefore:boolean = true): Promise<Laya.Scene3D> {//待后续~~~啦啦啦啦~~下班啦~20200621 19：05
        return new Promise<Laya.Scene3D>(() => {

            let url = this._sceneConfig[tag].url;
            let complete = (scene:Laya.Scene3D) => {

            }
            

            Laya.loader.create("", new Laya.Handler())


        });

    }

    /**获取当前场景控制器
     * 
     * 请在获取后进行 as 强制转换
    */
    public getCurrentSceneCtr() {
        if (this._curTag < 0 || !this._curScene) return;
        let ctr = this._curScene.getComponent(this._sceneConfig[this._curTag].ctr);
        return ctr;
    }


}