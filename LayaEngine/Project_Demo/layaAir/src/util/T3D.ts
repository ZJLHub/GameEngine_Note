export default class T3D{

    public static v3Add(v1:Laya.Vector3,v2:Laya.Vector3){
        return new Laya.Vector3(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z);
    }

    /**
     * 前者减去后者
     * @param v1 
     * @param v2 
     * @returns 
     */
    public static v3Subtract(v1:Laya.Vector3,v2:Laya.Vector3){
        return new Laya.Vector3(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
    }

    /**拉伸 */
    public static v3Scale(v:Laya.Vector3,mul:number){//mul 
        return new Laya.Vector3(v.x*mul,v.y*mul,v.z*mul);
    }

    /**点积 数量积 内积 */
    public static v3Dot(v1:Laya.Vector3,v2:Laya.Vector3){
        return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
    }
    

    /**向量的模  也是长度啦 */
    public static v3Mo(v3:Laya.Vector3){
        return Math.sqrt(v3.x*v3.x+v3.y*v3.y+v3.z*v3.z);
    }
    
    /**获取向量的夹角，0<angle<180  */
    public static getAngle1(v1:Laya.Vector3,v2:Laya.Vector3){
        let m1 = Math.sqrt(v1.x*v1.x + v1.y*v1.y + v1.z*v1.z);
        let m2 = Math.sqrt(v2.x**2 + v2.y**2 + v2.z**2);

        let mul_v:number = v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;

        let cosM = mul_v/(m1*m2);

        let angle = Math.acos(cosM) * 180/Math.PI;//弧度转角度
        return angle;
    }
}