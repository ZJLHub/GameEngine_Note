import { UIScene, UIZorder } from "../const/UIConst";
import TipsScneeCtr from "../uiscript/TipSceneScript";
export default class UIMng {
    private static _instance: UIMng = null;
    public static get instance(): UIMng {
        if (UIMng._instance == null) {
            UIMng._instance = new UIMng();
        }
        return UIMng._instance;
    }

    private _sceneDict: { [sceneName: string]: Laya.Scene } = {};
    public scene(name: string) { return this._sceneDict[name]; }

    public openUIScene( name: string, zOrder: number, data = null): Promise<Laya.Scene> {

        return new Promise((reslove) => {
            // if(this.scene(name)) {reslove(this.scene(name));return}
            Laya.Scene.open(name + ".scene", false, data, Laya.Handler.create(this, (scene: Laya.Scene) => {
                this._sceneDict[name] = scene;
                scene.name = name;
                this._Adapter(scene);
                scene.zOrder = zOrder;
                reslove(scene);
            }));
        });
    }

    public closeUIScene(url: string, name: string) {
        delete this._sceneDict[name];
        Laya.Scene.close(url + "/" + name + ".scene", name);
    }

    private _Adapter(scene: Laya.Scene) {
        scene.width = Laya.stage.width;
        scene.height = Laya.stage.height;
    }

    private _tips;
    public async createTips(tipContent: string, duration: number = 2000) {
        if(this._tips) this._tips.close();
        let tips = await this.openUIScene(UIScene.tipScene, UIZorder.tipScene,null);
        tips.zOrder = 300;
        tips.height = 100;
        tips.y = Laya.stage.height / 4;// - this._root.height/4;
        this._tips = tips;
        let tipsScneeCtr: TipsScneeCtr = tips.addComponent(TipsScneeCtr);
        tipsScneeCtr.init(tipContent);
        Laya.timer.once(duration, this, () => {
            Laya.Tween.to(tips, { y: tips.y - 150, alpha: 0 }, 300, null, Laya.Handler.create(tips, () => {
                // this.closeUIScene("",UIScene.tipScene);
                tips.close();
            }));
        });
    }

}