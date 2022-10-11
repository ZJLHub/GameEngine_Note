import T3D from "../util/T3D";

export default class LayaTransform extends Laya.Script3D{

    private _player:Laya.Sprite3D;
    private _target:Laya.Sprite3D;

    private _scene:Laya.Scene3D;
    onAwake(): void {
        this._scene = this.owner as Laya.Scene3D;
        this._player = this._scene.getChildByName(`player`) as Laya.Sprite3D;
        this._target = this._scene.getChildByName(`target`) as Laya.Sprite3D;

        let dir:Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.subtract(this._target.transform.position,this._player.transform.position,dir);

        console.log(`this._player::`,this._player.transform.position,`this._target::`,this._target.transform.position,`dir:::`,dir);

        //#region 
        // let q:Laya.Quaternion = new Laya.Quaternion();
        // let p_up:Laya.Vector3 = new Laya.Vector3();
        // this._player.transform.getUp(p_up);
        // //取反
        // p_up.x = -p_up.x;
        // p_up.y = -p_up.y;
        // p_up.z = -p_up.z;
        // Laya.Quaternion.rotationLookAt(dir,p_up,q);
        // this._player.transform.rotation = q;
        //#endregion


        // console.log(`this._player.transform:::`,this._player.transform);


        //淦~
        let p_for:Laya.Vector3 = new Laya.Vector3();
        this._player.transform.getForward(p_for);
        
        // //获取法向量
        let fa_vec:Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.cross(p_for,dir,fa_vec);
        let angle:number = T3D.getAngle1(p_for,dir);
        let rad = angle;///180*Math.PI;
        //让这个傻逼forward 绕这个 傻逼法向量 转 傻逼angle
        let q:Laya.Quaternion = new Laya.Quaternion();
        Laya.Quaternion.createFromAxisAngle(fa_vec,rad,q);
        this._player.transform.rotation = q;



        

        
        



    }
}