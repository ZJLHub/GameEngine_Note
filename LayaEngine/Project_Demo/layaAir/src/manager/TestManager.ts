import GameEvent, { GameEV } from "../const/GameConst";

export default class TestManager extends Laya.Script{
    private static _ins:TestManager;
    public static get ins(){
        if(!TestManager._ins)TestManager._ins = new TestManager();
        return TestManager._ins;
    }


    private _test_time:number = 0;

    gmae_timer(){
        this._test_time +=1;
        // console.log("gmae_timer：：",this._test_time);
        
        this._a();
    }

    onEnable(): void {
        // GameEvent.on(GameEV.Joy_Down,this,this._check_time);
        GameEvent.on(GameEV.Joy_Down,TestManager.ins,this._check_time);
    }
    onDisable(): void {
        // GameEvent.off(GameEV.Joy_Down,this,this._check_time);
        GameEvent.off(GameEV.Joy_Down,TestManager.ins,this._check_time);
    }
    private _check_time(){
        // console.log(`_check_time::`,this._test_time);
    }

    private _test_time2:number = 5;

    private _a(){
        Laya.Vector3.cross
        this._test_time2-=1;
        // console.log(`this._test_time2:::`,this._test_time2);
        if(this._test_time2<=0){
            this._test_time2 = 5;
            // console.log("time2 为0  恢复5 ");
        }
    }

}