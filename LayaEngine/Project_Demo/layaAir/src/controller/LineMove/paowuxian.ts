export default class paowuxian extends Laya.Script3D{
    private _root:Laya.Sprite3D = null;
    onAwake(): void {
        this._root = this.owner as Laya.Sprite3D;
    }

    private _speedZ:number = 0;
    private _speedY:number = 0;
    private _gravity:number = 0;

    private _start_move:boolean = false;

    public to_move(speedZ:number,speedY:number,gravity:number,t:number){
        this._speedZ = speedZ;
        this._speedY = speedY;
        this._gravity = gravity;
        this._start_move = true;

        Laya.timer.once(t*1000,this,()=>{
            this._start_move = false;
            console.log(`this._root.transform.position.y::`,this._root.transform.position.y);
        });
    }

    onUpdate(): void {
        if(this._root && this._root.transform && this._start_move){
            let t = Laya.timer.delta;
            let pos:Laya.Vector3 = this._root.transform.position.clone();

            let add_z = this._speedZ*t/1000;
            let add_y = this._speedY*t/1000;
            pos.z += add_z;
            pos.y += add_y;
            this._speedY -= this._gravity * t/1000 * 2;
            
            this._root.transform.position = pos.clone();
            

            // console.log(`paowuxian onUpdate `,`this._speedY::`,this._speedY);
        }
    }

}