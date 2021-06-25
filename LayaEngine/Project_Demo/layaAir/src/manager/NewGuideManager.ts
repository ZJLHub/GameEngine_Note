// import StorageManager from "./StorageManager";
import StorageManager from "./StorageManager";
import UIMng from "./UIMng";

export type GuideConfig = {
    isMask:boolean,//是否需要遮罩
    stopGame:boolean,
    storageInfo:{},
    tipsDesc?:string,//提示语

    maxGuideIndex?:number
}

export default class NewGuideManager{
    private static _instance:NewGuideManager;
    public static get instance(){
        if(!this._instance){this._instance = new NewGuideManager();}
        return this._instance;
    }

    private _maxGuideIndex:number = 4;//指引最大值
    private _configs:GuideConfig[] = [];

    public init(config:GuideConfig[]){
        console.log(" qq  config.length:::",config.length);
        let zero = config.shift();
        console.log(" hh  config.length:::",config.length);
        this._maxGuideIndex = zero.maxGuideIndex;
        this._configs = config;
    }



    /**显示新手提示
     * 
     * @param showArea 显示区域
     * @param clickArea 点击区域
     * @param clickCB 点击回调
     */
    public showGuide(showArea:Laya.Sprite,clickArea:Laya.Sprite,clickCB:Function = ()=>{}){
        let curIndex = this._getCurGuideIndex();
        if(curIndex>=4) return;
        let info = this._configs[curIndex].storageInfo;
        
        for(let key in info){
            if(StorageManager.instance[key] != info[key]) {
                console.log("key:",key,"StorageManager.instance[key]::",StorageManager.instance[key],"info[key]:::",info[key]);
                return
            }
        }

        let isStopGame:boolean = this._configs[curIndex].stopGame;
        let isMask:boolean = this._configs[curIndex].isMask;
        console.log("curIndex:::",curIndex,"this._configs[curIndex]::::",this._configs[curIndex]);
        //#region 无奈~新手指引还需要打补丁
        
        let callBack:Function = clickCB;
        if(curIndex == 4){
            callBack = ()=>{
                clickCB();
                UIMng.instance.createTips("接下来交给你自由搭配拉！");
            }
        }
        //#endregion

        Laya.Scene.open("Dig/NewGuidance.json",false,[showArea,clickArea,isMask,callBack]);

        // if(isStopGame){
        //     console.log("执行暂停游戏命令~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //     Laya.updateTimer.scale = 0;
        //     // Laya.physicsTimer.pause();
        //     // Laya.timer.scale = 0;
        // }

    }



    //#region 不知道有没有意义的函数，或是说需要改进的 ， 或者是随着 游戏的差异而相对需要修改的地方
    
    public _getCurGuideIndex(){//获取当前指引进度
        let aa = Laya.LocalStorage.getJSON("guideIndex");
        if(!aa){
            Laya.LocalStorage.setJSON("guideIndex",0);
            return 0;
        }
        return aa;
    }

    public addGuideIndex(){
        let curIndex = this._getCurGuideIndex();
        curIndex+=1;
        Laya.LocalStorage.setJSON("guideIndex",curIndex);
    }

    //#endregion

}