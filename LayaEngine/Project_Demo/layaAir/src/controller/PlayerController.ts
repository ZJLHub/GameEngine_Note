import GameEvent, { GameEV } from "../const/GameConst";
import { Up } from "../const/MathConst";
import { joyPoint } from "../uiscript/JoyStick";

export default class PlayerController extends Laya.Script3D {
    private _player: Laya.Sprite3D;
    private _speed: number = 3;
    private _dir: Laya.Vector3 = new Laya.Vector3();
    private _isMove:boolean = false;

    onAwake() {
        this._player = this.owner as Laya.Sprite3D;
    }
    onEnable() {
        GameEvent.on(GameEV.Joy_Move, this, this._onPlayerEVMove);
        GameEvent.on(GameEV.Joy_End,this,this._onPlayerEVEnd);
    }
    onDisable() {
        GameEvent.off(GameEV.Joy_Move, this, this._onPlayerEVMove);
    }

    private _onPlayerEVMove(jp: joyPoint) {
        let dir = new Laya.Vector3(jp.x, 0, jp.y);
        Laya.Vector3.normalize(dir, dir);
        this._dir = dir;
        this._isMove = true;
    }
    private _onPlayerEVEnd(){
        this._isMove = false;
    }

    onLateUpdate() {
        if (this._player && this._player.transform && this._isMove) {
            let move: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.scale(this._dir, this._speed * Laya.timer.delta / 1000, move);
            Laya.Vector3.add(this._player.transform.position,move,move);
            this._player.transform.position = move;

            let rotateDir = new Laya.Vector3(this._dir.x,0,-this._dir.z);
            let tarRot = new Laya.Quaternion();
            Laya.Quaternion.rotationLookAt(rotateDir,Up,tarRot);
            this._player.transform.rotation = tarRot;
        }

    }
}