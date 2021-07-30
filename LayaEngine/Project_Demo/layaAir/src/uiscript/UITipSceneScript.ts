import { ui } from "../ui/layaMaxUI";

export default class UITipSceneScript extends Laya.Script{
    private _root:ui.tipSceneUI;
    private _tipsContent:string;
    public init(tipsContent:string){
        this._tipsContent= tipsContent;
    }

    onAwake(){
        this._root = this.owner as ui.tipSceneUI;
    }

    onStart(){
        if(this._tipsContent){
            this._root.img_TipsLab.width = this._root.labTips.width = 40 * this._tipsContent.length;
            this._root.labTips.text = this._tipsContent;
            this._root.img_TipsLab.visible = true;
        }
    }
}