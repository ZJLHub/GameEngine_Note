import { Scene3D2D, SceneTag } from "../const/SceneConfig";
import UIMng from "./UIMng";
/**
 * 20210719 ZJL 
 * 底层添加UI层 canvas 支持, 所有UI场景都会放入tag中的canvas，切换场景时，不再需要进行繁琐的UI层关闭指令
 * //TODO 添加 UI-1  3dscene0  UI1的配置方式 
 * 
 */
export default class SceneManager {
    private static _instance: SceneManager;
    public static get instance() {
        if (!this._instance) this._instance = new SceneManager();
        return this._instance;
    }

    private _sceneConfig: { [tag: number]: Scene3D2D } = {};
    public init(sceneConfig: { [tag: number]: Scene3D2D }) {
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
    private _curSceneCtr: any = null;


    private _loadScene(tag: SceneTag, clearBefore: boolean = true): Promise<Laya.Scene3D> {//待后续~~~啦啦啦啦~~下班啦~20200621 19：05
        return new Promise<Laya.Scene3D>((reslove) => {

            let scene = this._sceneConfig[tag];

            let compelet = (loadscene: Laya.Scene3D) => {
                this._curScene = loadscene;
                this._curSceneCtr = loadscene.addComponent(scene.ctr);
                if (clearBefore && this._sceneHeap[this._curTag]) {
                    let scene = this._sceneHeap[this._curTag].removeSelf();
                    scene.destroy();
                    delete this._sceneHeap[this._curTag];
                }
                this._curTag = tag;
                Laya.stage.addChild(loadscene);
                loadscene.zOrder = -100;
                this._sceneHeap[tag] = loadscene;//2021/08/09 16:50  解决bug 场景不指定destory 原因竟然是没有指引,淦！
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
    public prepareScene(indentify: Scene3D2D, progress?: laya.utils.Handler, priority?: number): void;
    public prepareScene(indentify: any, progress: laya.utils.Handler = null, priority: number = 1): void {
        let scene = indentify;
        if (typeof indentify == "number") {
            scene = this._sceneConfig[indentify];
        }

        if (!this._preparingScene[scene.url]) {
            let promise: Promise<Laya.Scene3D> = new Promise<Laya.Scene3D>((reslove) => {
                Laya.loader.create(scene.url, Laya.Handler.create(this, (loadedScene: Laya.Scene3D) => {
                    if (!this._preparedScene[scene.url]) {
                        this._preparedScene[scene.url] = [loadedScene];
                    } else {
                        this._preparedScene[scene.url].push(loadedScene);
                    }
                    reslove(loadedScene);
                }), progress, null, scene.constructParams, scene.propertyParams, priority);
            });
            promise.then(() => {
                this._preparingScene[scene.url] = null;
            });
            this._preparingScene[scene.url] = promise;
        }

    }

    /**
     * 切换到目标场景
     * @param tag 目标场景
     * @param clearBefore 是否清除前面的场景
     * @returns 
     */
    public intoScene(tag: SceneTag, clearBefore: boolean = true): Promise<void> {
        return new Promise<void>(async (reslove) => {
            if (this._sceneHeap[tag]) {
                if (clearBefore) {
                    // let scene = this._sceneHeap[this._curTag].removeSelf();
                    // scene.destroy();
                    this._sceneHeap[this._curTag].destroy();
                    delete this._sceneHeap[this._curTag];
                } else {
                    this._sceneHeap[this._curTag].active = false;
                }
                this._sceneHeap[tag].active = true;
                this._curTag = tag;
                this._curScene = this._sceneHeap[tag];
            } else {
                await this._loadScene(tag, clearBefore);
            }
            UIMng.instance._intoSceneCanvas(this._sceneConfig[tag].canvas);
            reslove();
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
    public getCurScene() {
        return this._curScene;
    }

    //#region 由于Laya的prefab有问题（scene1->scene2->prefab  prefab上的脚本无法走生命周期）,因此将canvas修整为数组形式
    //#endregion
    // private static _canvas: Laya.Scene;
    // public static get canvas() {
    //     // if(!this._canvas) this._initCanvas();
    //     return this._canvas;
    // }  
    // private static _initCanvas(){//初始化游戏canvas
    //         let scene: Laya.Scene = new Laya.Scene(false);
    //         scene.height = Laya.stage.height;
    //         scene.width = Laya.stage.height;
    //         scene.name = `init_canvas`;
    //         Laya.stage.addChild(scene);
    //         SceneManager._canvas = scene;
    // }
    // private _createCanvas(canvas: SceneUICanvas) {
    //     if (SceneManager._canvas) SceneManager._canvas.close();
    //     let scene: Laya.Scene = new Laya.Scene(false);
    //     // scene.autoDestroyAtClosed = true;//设置在关闭时，自动对资源进行销毁，虽然我觉得不用，3d游戏UI再大也就10m左右,何况是小游戏,那算了，就不销毁吧
    //     scene.height = Laya.stage.height;
    //     scene.width = Laya.stage.height;
    //     scene.name = canvas;
    //     Laya.stage.addChild(scene);
    //     SceneManager._canvas = scene;
    // }
}
