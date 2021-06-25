import GameEvent, { GameEV } from "../const/GameConst";
import Util from "../util/Util";

export default class StorageManager {
    private static _instance: StorageManager = null;
    public static get instance(): StorageManager {
        if (StorageManager._instance == null) StorageManager._instance = new StorageManager();
        return StorageManager._instance;
    }


    private _version: number = 0;
    private _totalLevel: number = 0; // 通关数
    private _coin: number = 0;

    private _unlockClothesIDList: number[] = [];//解锁的皮肤套装ID
    /** 解锁的皮肤套装ID */
    public get unlockClothesIDList() { return this._unlockClothesIDList }
    public set unlockClothesIDList(v) { this._unlockClothesIDList = v;}

    /**震动 */
    private _shakeBool: boolean = false;
    public get shakeBool() { return this._shakeBool; }
    public set shakeBool(v: boolean) { this._shakeBool = v; }
    /**开启音效为true  关闭为false */
    private _soundBool: boolean = true;
    public get soundBool() { return this._soundBool; }
    public set soundBool(v: boolean) { this._soundBool = v; }

    /**开启音效为true  关闭为false */
    private _musicBool: boolean = true;
    public get musicBool() { return this._musicBool; }
    public set musicBool(v: boolean) { this._musicBool = v; }

    public set totalLevel(v: number) {
        this._totalLevel = v;
        StorageManager.instance.syncData();
    }
    public get totalLevel() { return this._totalLevel; }



    public set Coin(v: number) {
        this._coin = v;
        // GameEvent.ev(GameEV.coinRefresh, null);
        this.syncData();
    }
    public get Coin() { return this._coin; }

    /**
     * 储存数据初始化，从本地或者远端读取数据
     */
    public initData(data: any) {
        let storage: any = null;

        if (!Util.checkPlatform()) {
            let rawData = Laya.LocalStorage.getItem("storage");
            if (rawData) {
                storage = JSON.parse(rawData);
            }
        } else {
            storage = data.archive.ext == null ? {} : data.archive.ext;
            this._version = data.archive.version == null ? 0 : data.archive.version;
        }

        if (storage) {
            console.log("读取存档")
            // 存档读取
            this._totalLevel = storage.totalLevel || this._totalLevel;
            this._shakeBool = storage.shakeBool || this._shakeBool;
            this._soundBool = storage.soundBool || this._soundBool;
            this._musicBool = storage.musicBool || this._musicBool;
            this._coin = storage.coin || this._coin;
            this._unlockClothesIDList = storage.unlockClothesIDList || this._unlockClothesIDList;
        }
    }

    public syncData() {
        let ext = {
            // 存档记录
            totalLevel: this._totalLevel,
            shakeBool: this._shakeBool,
            soundBool: this._soundBool,
            musicBool: this._musicBool,
            coin: this._coin,
            unlockClothesIDList: this._unlockClothesIDList,
        };
        if (!Util.checkPlatform()) {
            console.log("浏览器存档")
            Laya.LocalStorage.setItem("storage", JSON.stringify(ext));
        }
        else {
            this._version += 1;
            // LWGSDK.updateUserArchive({
            //     version: this._version,
            //     ext: ext,
            //     success: (res) => {
            //         console.log("储存数据成功");
            //     },
            //     fail: (err) => {
            //         console.log("储存数据失败", err);
            //     },
            // });
        }
    }


}