import BezierCurve from "../../util/BezierCurve";
import { myMath } from "../../util/myMath";
import paowuxian from "./paowuxian";

export default class LineMoveCtr extends Laya.Script3D {
    private _scene: Laya.Scene3D = null;
    private _cube: Laya.Sprite3D = null;
    private _target: Laya.Sprite3D = null;
    private _move_ctr: paowuxian = null;

    private _besize_cube:Laya.Sprite3D = null;

    onAwake(): void {
        this._scene = this.owner as Laya.Scene3D;
        this._cube = this._scene.getChildByName("Cube") as Laya.Sprite3D;
        this._target = this._scene.getChildByName("target") as Laya.Sprite3D;
        this._move_ctr = this._cube.addComponent(paowuxian);
        this._cal_data();

        let pos_arr = BezierCurve.calculate([[0,0],[25,50],[50,0]],11);
        

        let points =  Laya.Bezier.I.getBezierPoints([0,0,25,50,50,0],11);
        console.log(`points::`,points);
        this._besize_cube = this._scene.getChildByName("besize_cube") as Laya.Sprite3D;
        
        for(let i=0;i<11;i++){
            let z = points[i*2];
            let y = points[i*2+1];
            let clone:Laya.Sprite3D = this._besize_cube.clone() as Laya.Sprite3D;
            this._scene.addChild(clone);
            // clone.transform.position = new Laya.Vector3(0,y,z);

            let zz = pos_arr[i][0];
            let yy = pos_arr[i][1];
            clone.transform.position = new Laya.Vector3(0,yy,zz);
        }


    }

    private _gravity: number = 9.8;
    private _cal_data() {
        console.log("_cal_data  ");
        let dis = Laya.Vector3.distance(this._cube.transform.position, this._target.transform.position);

        let t: number = 4;//myMath.RandomInt(1,3);//随机一个落地时间点,单位：秒

        let offestY: number = 4;//Y轴击中范围
        //y轴偏移值所增加的时间
        let off_time: number = offestY/this._gravity/2/t;

        let max_speedY: number = this._gravity * (t + off_time);
        let min_speedY: number = this._gravity * t;
        
        
        //计算击中取值
        let speedZ: number = dis / t; 
        let speedY = max_speedY;//myMath.GetRandom(min_speedY,max_speedY);

        console.log(`dis::`,dis,`t::`,t,`off_time:::`,off_time,dis,`max_speedY::`, max_speedY, `min_speedY::`, min_speedY,`speedZ::`,speedZ,`speedY`,speedY);

        this._cube.transform.position = new Laya.Vector3(0, 0, 0);
        this._move_ctr.to_move(speedZ,speedY,this._gravity,t);

        // Laya.timer.once((t+off_time)*1000,this,()=>{this._cal_data();});

        //计算不击中取值范围




        //






    }
}