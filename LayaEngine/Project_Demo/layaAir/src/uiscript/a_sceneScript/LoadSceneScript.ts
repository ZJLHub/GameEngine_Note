import { ui } from "../../ui/layaMaxUI";

export default class LoadSceneScript extends ui.loadUI{
    
    private _proWidth = 600;

    onAwake(){
        if(Laya.stage.height>1334){
            this.bg.y = 0;
        }
        Laya.timer.loop(Laya.timer.delta, this, this.updateLoadPro);
    }


    updateLoadPro() {
        // this._percent += (100 / 1000 * Laya.timer.delta)
        // this.lab_loadpro.text = "资源正在加载中..." + ((this._percent) % 100).toFixed(2) + "%"
        this.proYellow.width += (Laya.timer.delta / 500 * 2 * this._proWidth);
        this.proYellow.width %= this._proWidth;
        this.proBlue.width += (Laya.timer.delta / 500) * this._proWidth;
        this.proBlue.width %= this._proWidth;
    }
}