import { Scene3D, SceneTag } from "../const/SceneConfig";

export default class SceneManager {
    private static _instance: SceneManager;
    public static get instance() {
        if(!this._instance) this._instance = new SceneManager();
        return this._instance;
    }

    private _sceneConfig: { [tag: number]: Scene3D } = {};
    public init(sceneConfig: { [tag: number]: Scene3D }) {
        this._sceneConfig = sceneConfig;
    }

    //#region 预载
    private _preparedScene: { [url: string]: Laya.Scene3D[] } = {};       //加载完成的场景咯
    private _preparingScene: { [url: string]: Promise<Laya.Scene3D> } = {};//正在加载的场景
    //#endregion

    // private _sceneStack: Laya.Scene3D[] = [];//暂时取消用栈对场景进行操作吧
    private _sceneHeap: { [tag: number]: Laya.Scene3D } = {};
    
    private _curTag: SceneTag = -1;
    private _curScene: Laya.Scene3D;
    private _curSceneCtr:any = null;


    private _loadScene(tag:SceneTag,clearBefore:boolean = true): Promise<Laya.Scene3D> {//待后续~~~啦啦啦啦~~下班啦~20200621 19：05
        return new Promise<Laya.Scene3D>((reslove) => {
            
            let scene = this._sceneConfig[tag];

            let compelet = (loadscene:Laya.Scene3D) => {
                this._curScene = loadscene;
                this._curSceneCtr = loadscene.addComponent(scene.ctr);
                if(clearBefore && this._sceneHeap[this._curTag]){
                    this._sceneHeap[this._curTag].destroy();
                    delete this._sceneHeap[this._curTag];
                }
                this._curTag = tag;
                loadscene.zOrder = -1;
                Laya.stage.addChild(loadscene);
                reslove(loadscene);
            }

            if (this._preparedScene[scene.url] && this._preparedScene[scene.url].length) {
                compelet(this._preparedScene[scene.url].shift());
            } else if (this._preparingScene[scene.url]) {
                this._preparingScene[scene.url].then(compelet);
            } else {
                Laya.loader.create(scene.url, Laya.Handler.create(this, compelet));
            }

        });
    }

    //这俩货 估计就只起到对比的作用 (也就是提示使用者可以使用不同参数)
    public prepareScene(indentify: number, progress?: laya.utils.Handler, priority?: number): void;
    public prepareScene(indentify: Scene3D, progress?: laya.utils.Handler, priority?: number): void;
    public prepareScene(indentify:any,progress: laya.utils.Handler = null, priority: number = 1):void{
        let scene = indentify;
        if (typeof indentify == "number") {
            scene = this._sceneConfig[indentify];
        }

        if(!this._preparingScene[scene.url]){
            let promise:Promise<Laya.Scene3D> = new Promise<Laya.Scene3D>((reslove)=>{
                Laya.loader.create(scene.url,Laya.Handler.create(this,(loadedScene:Laya.Scene3D)=>{
                    //TODO 其实原作者这里为什么要用数组存储呢 ，直接一对一 不就行了 , 不过现在还是以原来的方式编辑代码
                    if(!this._preparedScene[scene.url]){
                        this._preparedScene[scene.url] = [loadedScene];
                    }else{
                        this._preparedScene[scene.url].push(loadedScene);
                    }
                    reslove(loadedScene);
                }),progress,null,scene.constructParams,scene.propertyParams,priority);
            });
            promise.then(()=>{//神奇~~~~~~~~~ 又在这清空了  why~！！！！！！
                this._preparingScene[scene.url] = null;
            });
            this._preparingScene[scene.url] = promise;
        }

    }


    public changeScene(tag:SceneTag,clearBefore:boolean = true):Promise<void>{
        return new Promise<void>(()=>{
            if(this._sceneHeap[tag]){
                if(clearBefore){
                    this._sceneHeap[this._curTag].destroy();
                }else {
                    this._sceneHeap[this._curTag].active = false;
                }
                this._sceneHeap[tag].active = true;
                this._curTag = tag;
                this._curScene = this._sceneHeap[tag];
                // this._curSceneCtr = this.sce
            } else {
                this._loadScene(tag,clearBefore);
            }
        });
    }

    /**获取当前场景控制器
     * 
     * 请在获取后进行 as 强制转换
    */
    public getCurrentSceneCtr() {
        return this._curSceneCtr;
    }
    /**获取当前场景 */
    public getCurScene(){ 
        return this._curScene;
    }



}