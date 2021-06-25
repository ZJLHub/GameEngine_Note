
export default class AudioManager {
    private _musicPool: { [url: string]: any[] } = {}; // 音频池
    public musicStatus: boolean = true; // 音乐播放状态
    public audioStatus: boolean = true;
    private _bgmKey: string = null; // 音效播放状态
    private _bgmVolume: number = 0.7;
    private _bgmChannel: any;
    private _musicBaseUrl: string = "res/mp3/";
    private _bgmBaseUrl: string = "";//ConfigManager.instance.resourceUrl + "/game-static/g61/bgm/";//"subpackage/bgm/";

    private _bgmSoundChannel: Laya.SoundChannel;

    private static _instance: AudioManager = null;
    public static get instance(): AudioManager {
        if (AudioManager._instance === null) AudioManager._instance = new AudioManager();
        return AudioManager._instance;
    }

    constructor() { }
    /**不用到远程 暂时设为私有 */
    public init() {
        this._musicBaseUrl = this._musicBaseUrl;
        // this._bgmBaseUrl = ConfigManager.instance.resourceUrl + "/game-static/bgm/";
        // console.log("this._bgmBaseUrl：：",this._bgmBaseUrl);
    }

    private onPlayFunc(target: any, res: any, name: string) {
        target.status = "play";
    }

    private onPauseFunc(target: any, res: any, name: string) {
        target.status = "paused";
    }

    private onStopFunc(target: any, res: any, name: string) {
        target.status = "stop";
        if (!this._musicPool[name]) this._musicPool[name] = [];
        this._musicPool[name].push(target);
    }

    public createAudio(name: string, type: string) {
        let musicInfo: any = { url: `${this._musicBaseUrl}${name}` };
        if (name.indexOf("bgm") !== -1 || name.indexOf("cheer") !== -1) {
            musicInfo = { url: `${this._bgmBaseUrl}${name}` };
        }
        let target: any;
        let platform = window["wx"] || window["qg"]
        if (platform) {
            target = platform.createInnerAudioContext();
        } else {
            return {};
        }
        target.src = musicInfo.url;

        target.onPlay((res) => {
            this.onPlayFunc(target, res, name);
        });
        target.onStop((res) => {
            this.onStopFunc(target, res, name);
        });
        target.onPause((res) => {
            this.onPauseFunc(target, res, name);
        });
        target.onEnded((res) => {
            this.onStopFunc(target, res, name);
        });
        target.onError((e) => {
            //console.log("音乐播放错误", e);
        });
        return target;
    }

    public playBgm(url: string, loop: boolean = true) {
        if (!this.musicStatus) { return; }
        if (this._bgmKey == url) return;
        let platform = window["wx"] || window["qg"];
        if (platform) {
            // if (Util.checkPlatform("wx") || Util.checkPlatform("qg")) {
            let target: any = this._musicPool[url] && this._musicPool[url].shift();
            if (this._bgmChannel) {
                this._bgmChannel.stop();
                this._bgmChannel = null;
            }
            if (!target) {
                return;
            }
            target.volume = this._bgmVolume;
            target.nowPlay = true;
            target.loop = loop;
            target.play();
            this._bgmChannel = target;
            this._bgmKey = url;
            return target;
        } else {
            try {
                if (url.indexOf("home") !== -1) {
                    Laya.SoundManager.playMusic(`${this._musicBaseUrl}${url}`, 0);
                } else {
                    Laya.SoundManager.playMusic(`${this._bgmBaseUrl}${url}`, 0);
                }
                this._bgmKey = url;
            } catch (e) { }
        }

    }

    public playSound(name: string, volume: number = 1) {
        if (!this.audioStatus) return;
        let platform = window["wx"] || window["qg"];
        if (platform) {
            // if (Util.checkPlatform("wx") || Util.checkPlatform("qg")) {
            if (name === "") return;
            let target: any = this._musicPool[name] && this._musicPool[name].shift();
            if (!target) {
                return;
            }

            if (target.status === "paused") {
                target.seek(0);
            }

            target.volume = volume;
            target.play();
        } else {
            try {
                Laya.SoundManager.playSound(`${this._musicBaseUrl}${name}`);
            } catch (e) { }
        }
    }

    // BGM 预载
    private _preloadMusic(name: string) {
        let platform = window["wx"] || window["qg"]
        if (platform) {
            return new Promise<void>((resolve, reject) => {
                let target = this.createAudio(name, "music");
                target.type = "music";
                target.nowPlay = false;
                target.loop = true;
                if (!this._musicPool[name]) {
                    this._musicPool[name] = [];
                }
                let fun = () => {
                    this._musicPool[name].push(target);
                    target.offCanplay(fun.bind(this));//fun
                    // console.log("预加载音乐完成：：name::",name,"this._musicPool::",this._musicPool,"this._musicPool[name]",this._musicPool[name])
                    resolve();
                };
                target.onCanplay(fun.bind(this));
            });
        }
    }

    // BGM预载接口
    public async preloadMusic(nameArray: Array<string>) {
        //console.log("加载music",nameArray)
        for (let i = 0; i < nameArray.length; i++) {
            await this._preloadMusic(nameArray[i]);
        }
        return;
    }

    // 音频预载
    private _preloadSound(name: string, count: number) {
        let platform = window["wx"] || window["qg"]
        if (platform) {
            return new Promise<void>((resolve, reject) => {
                if (!this._musicPool[name]) {
                    this._musicPool[name] = [];
                }
                for (let i = 0; i < count; i++) {
                    let target = this.createAudio(name, "sound");
                    target.type = "audio";
                    let index = i;
                    let fun = () => {
                        this._musicPool[name].push(target);
                        target.offCanplay(fun.bind(this));//fun
                        if (index == count - 1) {
                            resolve();
                        }
                    };
                    target.onCanplay(fun.bind(this));//fun.bind(this)
                }
            });
        }
    }

    // 音频预载接口
    public async preloadSound(nameArray: Array<{ url: string; count: number }>) {
        for (let i = 0; i < nameArray.length; i++) {
            let element = nameArray[i];
            await this._preloadSound(element.url, element.count);//去掉await
        }
        return;
    }

    public audioControlSwitch() {
        this.musicControl("music");
        this.musicControl("audio");
    }

    public musicControl(type: string) {
        if (type === "music") {
            this.musicStatus = !this.musicStatus;
            if (!this.musicStatus) {
                this.closeMusic("music");
            } else {
                this.openMusic("music");
            }
        } else if (type === "audio") {
            this.audioStatus = !this.audioStatus;
            if (!this.audioStatus) this.closeMusic("audio");
        } else if (type === "all_pause") {
            this.pauseMusic();
        } else if (type === "all_resume") {
            this.resumeMusic();
        }
        this.saveMusicStatus();
    }

    public pauseMusic() {
        let platform = window["wx"] || window["qg"]
        if (platform) {
            if (this._bgmChannel) this._bgmChannel.pause();
        }
    }

    public resumeMusic() {
        let platform = window["wx"] || window["qg"]
        if (platform) {
            if (this._bgmChannel && this._bgmChannel.status === "paused") this._bgmChannel.play();
        }
    }

    public stopMusic() {
        let platform = window["wx"] || window["qg"]
        // console.log(this._bgmKey);
        if (this._bgmKey) {
            if (platform) {
                if (this._bgmChannel && this._bgmChannel.status === "play") {
                    this._bgmChannel.stop();
                }
            } else {
                Laya.SoundManager.stopMusic();
            }
            this._bgmKey = null;
        }
    }

    public closeMusic(type: string) {
        if (this._bgmChannel) {
            this._bgmChannel.nowPlay = true;
            this._bgmChannel.stop();
        }
    }

    public openMusic(type: string) {
        if (this._bgmChannel) {
            this._bgmChannel.play();
        }
    }

    public saveMusicStatus() {
        Laya.LocalStorage.setJSON("music", { music: this.musicStatus, audio: this.audioStatus });
    }


    public setMusicStatus(status: boolean) {
        this.musicStatus = status;
        //console.log("设置音乐状态：：",this.musicStatus)
    }
}
