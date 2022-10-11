import { Right } from "../const/MathConst";
import { UIScene, UIZorder } from "../const/UIConst";
import UIMng from "../manager/UIMng";
import { myMath } from "../util/myMath";
import T3D from "../util/T3D";
import Tool3D from "../util/Tool3D";
import LayaTransform from "./LayaTransform";
import PlayerController from "./PlayerController";

export default class AIForRotateController extends Laya.Script3D {

    private _AIplayer: Laya.Sprite3D;
    private _enemy: Laya.Sprite3D;

    private _enemyPoint: Laya.Sprite3D[] = [];//敌人移动点
    private _moveSpeed:number = 0.016;

    
    onAwake() {
        let scene: Laya.Scene3D = this.owner as Laya.Scene3D;
        // UIMng.instance.openUIScene(UIScene.JoyStick,UIZorder.scene); //开启UI
        this._AIplayer = scene.getChildByName("AIPlayer") as Laya.Sprite3D;
        this._AIplayer.addComponent(PlayerController);
        this._enemy = scene.getChildByName("Enemy") as Laya.Sprite3D;

        let p = this._AIplayer.transform.position;
        let e = this._enemy.transform.position;

        let dir = new Laya.Vector3();
        Laya.Vector3.subtract(p,e,dir);


        //#region 使用rotationLookAt
        // let rota:Laya.Quaternion = new Laya.Quaternion();
        // Laya.Quaternion.rotationLookAt(new Laya.Vector3(dir.x,dir.y,dir.z)  , new Laya.Vector3(0,1,0)  ,rota);
        // this._AIplayer.transform.rotation = rota;
        //#endregion
        this._AIplayer.transform.rotationEuler = dir;
        // Laya.Vector3.lerp();



        let p_for:Laya.Vector3 = new Laya.Vector3();
        this._AIplayer.transform.getForward(p_for);
        
        let rad = Math.acos( Laya.Vector3.dot(p_for,dir) );//缺少限制
        let axis:Laya.Vector3 = new Laya.Vector3(0,0,0);
        Laya.Vector3.cross(p_for,dir,axis);
        let out_rota:Laya.Quaternion = new Laya.Quaternion();
        Laya.Quaternion.createFromAxisAngle(axis,rad,out_rota);
        console.log(`out_rota::`,out_rota,`axis::`,axis,`rad::`,rad,`Laya.Vector3.dot(p_for,dir)::`,Laya.Vector3.dot(p_for,dir));
        // this._AIplayer.transform.rotation = out_rota;


        
        
        
        
        
    }

    /**@return v1 - v2 */
    private _v3_sub(v1,v2){
        return new Laya.Vector3(-v1.x + v2.x , v1.y-v2.y,-v1.z+v2.z);
    }
    private _v3_cross(v1,v2){
        var v1x = v1.x, v1y = v1.y,v1z = v1.z, v2x = v2.x, v2y = v2.y, v2z = v2.z;
        let o:Laya.Vector3 = new Laya.Vector3();
        
    }


    private _consoleTime:number = 0;
    private _move_time:number = 0;
    // onUpdate() {
    //     // this._move_time+=Laya.timer.delta;
    //     // if(this._move_time<=1000)return;
    //     // if(this._AIplayer && this._AIplayer.transform){
    //     //     let forw:Laya.Vector3 = new Laya.Vector3();
    //     //     this._AIplayer.transform.getForward(forw);
            
    //     //     Laya.Vector3.scale(forw,-1/1000*Laya.timer.delta,forw);
    //     //     let pos = new Laya.Vector3();
    //     //     Laya.Vector3.add(forw,this._AIplayer.transform.position,pos);
    //     //     this._AIplayer.transform.position = pos;

    //     // }
        
    //     // if (this._AIplayer && this._AIplayer.transform) {

    //     //     //转向敌人  
    //     //     // let aiUp:Laya.Vector3 = new Laya.Vector3();

    //     //     //先测试向前走吧
    //     //     let aiFor: Laya.Vector3 = new Laya.Vector3();
    //     //     this._AIplayer.transform.getForward(aiFor);
    //     //     this._consoleTime+=Laya.timer.delta;
    //     //     if(this._consoleTime>=1000){
    //     //         this._consoleTime = 0;
    //     //         // console.log(aiFor);
    //     //     }
    //     //     let tarPos:Laya.Vector3 = new Laya.Vector3();
    //     //     Laya.Vector3.scale(aiFor,this._moveSpeed,aiFor);//_moveSpeed:number = 0.016;
    //     //     // Laya.Vector3.add(this._AIplayer.transform.position.clone(),aiFor,tarPos);
    //     //     let aiPos:Laya.Vector3 = this._AIplayer.transform.position;
    //     //     let tarPos2:Laya.Vector3 = new Laya.Vector3(aiPos.x+aiFor.x,aiPos.y+aiFor.y,aiPos.z+aiFor.z);
    //     //     // this._AIplayer.transform.position = tarPos2;
            


    //     //     // let aiRig: Laya.Vector3 = new Laya.Vector3();
    //     //     // this._AIplayer.transform.getRight(aiRig);
    //     //     // let tarPos:Laya.Vector3 = new Laya.Vector3();
    //     //     // Laya.Vector3.scale(aiRig,this._moveSpeed,aiRig);//_moveSpeed:number = 0.016;
    //     //     // Laya.Vector3.add(this._AIplayer.transform.position.clone(),aiRig,tarPos);
    //     //     // this._AIplayer.transform.position = tarPos;

    //     //     // let aiUp: Laya.Vector3 = new Laya.Vector3();
    //     //     // this._AIplayer.transform.getUp(aiUp);
    //     //     // let tarPos:Laya.Vector3 = new Laya.Vector3();
    //     //     // Laya.Vector3.scale(aiUp,this._moveSpeed,aiUp);//_moveSpeed:number = 0.016;
    //     //     // Laya.Vector3.add(this._AIplayer.transform.position.clone(),aiUp,tarPos);
    //     //     // this._AIplayer.transform.position = tarPos;

    //     //     // let pos = this._AIplayer.transform.position;
    //     //     // pos.z+= 0.016;
    //     //     // this._AIplayer.transform.position = pos;

    //     // }

        
    // }
}