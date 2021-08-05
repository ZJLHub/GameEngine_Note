import SceneConfig, { Scene3D2D, SceneTag } from "../../const/SceneConfig";
import SceneManager from "../../manager/SceneManager";
import { ui } from "../../ui/layaMaxUI";

export default class SceneSelectUI extends ui.SceneSelectUI{

    _sceneConfig:{[tag:number]:Scene3D2D};

    onOpened(sceneConfig:{[tag:number]:Scene3D2D}){
        this._sceneConfig = sceneConfig;
        this.width = 200;
        this.height = 250;
        this.pos(0,225);
        this.scenePanel.vScrollBarSkin = "";
        this.scenePanel.elasticEnabled = true;
        for(let k in sceneConfig){
            let value = sceneConfig[k];
            let lab = new Laya.Label(value.canvas);
            lab.fontSize = 32;
            lab.width = 100;
            lab.height = 100;
            lab.overflow = "scroll";
            lab.wordWrap = true;
            lab.centerX = 0;
            lab.centerY = 0;

            let box = new Laya.Box();
            box.width = 100;box.height = 100;
            box.addChild(lab);
            box.bgColor = "#cd6f6d";

            this.SceneVBox.addChild(box);

            box.on(Laya.Event.CLICK,this,this._onBox,[k]);
            console.log("SceneSelectUI        onOpened           k:::     ",k);
        }
        this.mouseThrough = true;
        this.scenePanel.mouseThrough = false;
    }


    private async _onBox(k){
        await SceneManager.instance.intoScene(k);
    }

}