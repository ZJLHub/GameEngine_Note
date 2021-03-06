/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import JoyStick from "./uiscript/JoyStick"
import LoadSceneScript from "./uiscript/a_sceneScript/LoadSceneScript"
import RenderTextureShowUI from "./uiscript/a_sceneScript/RenderTextureShowUI"
import SceneSelectUI from "./uiscript/a_sceneScript/SceneSelectUI"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=750;
    static height:number=1334;
    static scaleMode:string="fixedwidth";
    static screenMode:string="none";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="JoyStick.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("uiscript/JoyStick.ts",JoyStick);
        reg("uiscript/a_sceneScript/LoadSceneScript.ts",LoadSceneScript);
        reg("uiscript/a_sceneScript/RenderTextureShowUI.ts",RenderTextureShowUI);
        reg("uiscript/a_sceneScript/SceneSelectUI.ts",SceneSelectUI);
    }
}
GameConfig.init();