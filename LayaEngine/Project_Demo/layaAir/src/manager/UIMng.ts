import { UIScene, UIZorder } from "../const/UIConst";
import UITipSceneScript from "../uiscript/UITipSceneScript";

export default class UIMng {
    private static _instance: UIMng = null;
    public static get instance(): UIMng {
        if (UIMng._instance == null) {
            UIMng._instance = new UIMng();
        }
        return UIMng._instance;
    }
    private _allowMulOpen: { [UIScene: string]: number } = {
        //#region 设置允许多次打开的场景
        // 在实际开发过程中，场景的创建是laya编辑器完成的，emmm如果遇到允许多次打开的场景,
        //算了，通过查询子节点确认是否允许多次打开吧-。-！！真麻烦
        //#endregion
        ["ui_dialog/tipScene"]: 1
    }

    private _sceneDict: { [sceneName: string]: Laya.Scene } = {};
    public scene(name: string) { return this._sceneDict[name]; }
    /**
     * 打开UI场景
     * @param name 
     * @param zOrder 
     * @param data 
     * @returns 
     */
    public openUIScene(name: UIScene, zOrder: number,  data = null , ifintoCanvas = true): Promise<Laya.Scene> {
        return new Promise((reslove) => {
            if (this.scene(name) && !this._allowMulOpen[name]) { console.error(`UI ${name} 已经存在,请查询代码逻辑!`); reslove(this.scene(name)); return }
            Laya.Scene.open(name + ".scene", false, data, Laya.Handler.create(this, (scene: Laya.Scene) => {
                this._sceneDict[name] = scene;
                scene.name = name;
                this._Adapter(scene);
                scene.zOrder = zOrder;
                if(ifintoCanvas){
                    this._canvasSceneDict[this._curCanvas].push(scene);
                } 
                if (!this._allowMulOpen[name] && scene.getChildByName(`allowMulOpen`)) this._allowMulOpen[name] = 1;//记录可多次打开的场景
                reslove(scene);
            }));
        });
    }

    public closeUIScene(name: string) {
        delete this._sceneDict[name];
        Laya.Scene.close(name + ".scene", name);
    }

    private _Adapter(scene: Laya.Scene) {
        scene.width = Laya.stage.width;
        scene.height = Laya.stage.height;
    }

    private _tips;
    public async createTips(tipContent: string, duration: number = 2000) {
        if (this._tips) this._tips.close();
        let tips = await this.openUIScene(UIScene.tipScene, UIZorder.tipScene, null);
        tips.zOrder = 300;
        tips.height = 100;
        tips.y = Laya.stage.height / 4;// - this._root.height/4;
        this._tips = tips;
        let tipsScneeCtr: UITipSceneScript = tips.addComponent(UITipSceneScript);
        tipsScneeCtr.init(tipContent);
        Laya.timer.once(duration, this, () => {
            Laya.Tween.to(tips, { y: tips.y - 150, alpha: 0 }, 300, null, Laya.Handler.create(tips, () => {
                tips.close();
            }));
        });
    }

    public transition(name: UIScene, data: any) {
        return new Promise((reslove) => {
            Laya.Scene.open(name + ".scene", false, data, Laya.Handler.create(this, (scene: Laya.Scene) => {
                this._sceneDict[name] = scene;
                scene.name = name;
                this._Adapter(scene);
                scene.zOrder = UIZorder.transition;
                reslove(scene);
            }));
        });
    }

    //#region 
    private _curCanvas: string = "default";
    private _canvasSceneDict: { [canvas: string]: Laya.Scene[] } = {
        ["default"]:[]
    };
    public _intoSceneCanvas(canvas: string) {
        if (canvas != this._curCanvas) {
            if (this._canvasSceneDict[this._curCanvas]) {
                let sceneList = this._canvasSceneDict[this._curCanvas];
                sceneList.forEach((scene) => { console.log("关闭scene::",scene.name);
                delete this._sceneDict[scene.name];  
                scene.close(); 
                });
            }
        }
        this._curCanvas = canvas;
        if(!this._canvasSceneDict[this._curCanvas]) this._canvasSceneDict[this._curCanvas] = [];
    }
    //#endregion
}
