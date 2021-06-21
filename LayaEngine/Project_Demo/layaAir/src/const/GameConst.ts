export enum GameEV{
    //#region 摇杆
    Joy_Down = "Joy_Down",
    Joy_Move = "Joy_Move",
    Joy_End = "Joy_End",
    //#endregion

}

export default class GameEvent {
    private static _dispatcher = new Laya.EventDispatcher();
    
    static on(ev:GameEV,caller:any,listener:Function){
        this._dispatcher.on(ev,caller,listener);
    }

    static off(ev:GameEV,caller:any,listener:Function){
        this._dispatcher.off(ev,caller,listener);
    }

    static ev(ev:GameEV,data:any){
        return this._dispatcher.event(ev,data);
    }

    static has(ev:GameEV){
        return this._dispatcher.hasListener(ev);
    }
}