import { UIScene, UIZorder } from "../const/UIConst";
import UIMng from "../manager/UIMng";

export default class RenderTextureDemoCtr extends Laya.Script3D  {

    private _scene:Laya.Scene3D;
    private _mainCamera:Laya.Camera;
    private _rtCamera:Laya.Camera;
    private _mainRT:Laya.RenderTexture;
    private _rt:Laya.RenderTexture;

    public get mainCamera(){
        return this._mainCamera
    }

    public get rt(){
        return this._rt;
    }

    onAwake(){    
        console.log("RenderTextureDemoCtr    onAwake");
        let scene = this.owner as Laya.Scene3D;
        this._scene = scene;
        this._mainCamera = scene.getChildByName("Main Camera") as Laya.Camera;
        this._rtCamera = scene.getChildByName("RTCamera") as Laya.Camera; 
        
        this._rt = new Laya.RenderTexture(750,1334,Laya.RenderTextureFormat.R8G8B8A8,Laya.RenderTextureDepthFormat.DEPTHSTENCIL_NONE);
        this._rtCamera.renderTarget = this._rt;
        //虽然征用主相机的renderTarget也可以，但是似乎如果主相机使用了rt ， 就无法再把自己照到的画面呈现再game上面了 所以rt这个功能必须是启用其他相机为前提才能使用
        // this._mainRT = new Laya.RenderTexture(750,1334,Laya.RenderTextureFormat.R8G8B8A8,Laya.RenderTextureDepthFormat.DEPTHSTENCIL_NONE);
        // this._mainCamera.renderTarget = this._mainRT;


        UIMng.instance.openUIScene(UIScene.RenderTextureShow,UIZorder.scene,this._rt);
    }

}