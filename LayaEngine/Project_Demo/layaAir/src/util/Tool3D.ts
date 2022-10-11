export default class Tool3D {
    /**[SixGod]
     * 屏幕坐标转世界坐标
     * @param {Laya.Camera} camera  参照相机
     * @param {Laya.Vector3} point  需要转换的点
     */
    static ScreenToWorld(camera, point) {
        var halfFOV = (camera.fieldOfView * 0.5) * Math.PI / 180;
        let height = point.z * Math.tan(halfFOV);
        let width = height * camera.aspectRatio;

        let lowerLeft = this.GetLowerLeft(camera.transform, point.z, width, height);
        let v = this.GetScreenScale(width, height);

        // 放到同一坐标系（相机坐标系）上计算相对位置
        var value = new Laya.Vector3();
        var lowerLeftA = this.InverseTransformPoint(camera.transform, lowerLeft);
        value = new Laya.Vector3(-point.x / v.x, point.y / v.y, 0);
        Laya.Vector3.add(lowerLeftA, value, value);
        // 转回世界坐标系
        value = this.TransformPoint(camera.transform, value);
        return value;
    }
    /**[SixGod]
     * 获取相机在 distance距离的截面右下角世界坐标位置
     * @param {Laya.Transform} transform    相机transfrom
     * @param {Number} distance     距离
     * @param {Number} width        宽度
     * @param {Number} height       长度
     */
    static GetLowerLeft(transform, distance, width, height) {
        // 相机在 distance距离的截面左下角世界坐标位置
        // LowerLeft
        var lowerLeft = new Laya.Vector3();

        // lowerLeft = transform.position - (transform.right * width);
        var right = new Laya.Vector3();
        transform.getRight(right);
        Laya.Vector3.normalize(right, right);
        var xx = new Laya.Vector3(right.x * width, right.y * width, right.z * width);//这里其实就是scale 其实二次封装Laya的一些函数是势在必行的 来吧~让傻逼laya看起来更像Unity
        Laya.Vector3.add(transform.position, xx, lowerLeft);

        // lowerLeft -= transform.up * height;
        var up = new Laya.Vector3();
        transform.getUp(up);
        Laya.Vector3.normalize(up, up);
        var yy = new Laya.Vector3(up.x * height, up.y * height, up.z * height);
        Laya.Vector3.subtract(lowerLeft, yy, lowerLeft);

        // lowerLeft += transform.forward * distance;
        var forward = new Laya.Vector3();
        transform.getForward(forward);
        Laya.Vector3.normalize(forward, forward);
        var zz = new Laya.Vector3(forward.x * distance, forward.y * distance, forward.z * distance);
        Laya.Vector3.subtract(lowerLeft, zz, lowerLeft);
        return lowerLeft;
    }
    /**[SixGod]
     * 获取三维场景和屏幕比例
     * @param {Number} width     宽
     * @param {Number} height    长
     */
    static GetScreenScale(width, height) {
        var v = new Laya.Vector3();
        v.x = Laya.stage.width / width / 2;
        v.y = Laya.stage.height / height / 2;
        return v;
    }
    /**[SixGod]
     * 相对坐标转世界坐标
     * @param {Laya.Transform} origin   相对坐标系
     * @param {Laya.Vector3} point      需要转换的点
     */
    static TransformPoint(origin, point) {
        var value = new Laya.Vector3();
        Laya.Vector3.transformQuat(point, origin.rotation, value);
        Laya.Vector3.add(value, origin.position, value);
        return value;
    }
    /**[SixGod]
     * 世界坐标转屏幕坐标
     * @param {Laya.Camera} camera   参照相机
     * @param {Laya.Vector3} point   需要转换的点
     */
    static WorldToScreen2(camera, point) {
        var pointA = this.InverseTransformPoint(camera.transform, point);
        var distance = pointA.z;
        var out = new Laya.Vector3();
        camera.viewport.project(point, camera.projectionViewMatrix, out);
        var value = new Laya.Vector3(out.x / Laya.stage.clientScaleX, out.y / Laya.stage.clientScaleY, distance);
        return value;
    }

    /**[SixGod]
     * 世界坐标转相对坐标
     * @param {Laya.Transform} origin   相对参考系ts
     * @param {Laya.Vector3} point      需要转换的点
     */
    static InverseTransformPoint(origin, point) {
        var xx = new Laya.Vector3();
        origin.getRight(xx);
        var yy = new Laya.Vector3();
        origin.getUp(yy);
        var zz = new Laya.Vector3();
        origin.getForward(zz);
        var zz1 = new Laya.Vector3(-zz.x, -zz.y, -zz.z);
        var x = this.ProjectDistance(point, origin.position, xx);
        var y = this.ProjectDistance(point, origin.position, yy);
        var z = this.ProjectDistance(point, origin.position, zz1);
        var value = new Laya.Vector3(x, y, z);
        return value;
    }

    /**[SixGod]
     * 向量投影长度, 向量CA 在向量 CB 上的投影长度
     * @param {Laya.Vector3} A
     * @param {Laya.Vector3} C
     * @param {Laya.Vector3} B
     */
    static ProjectDistance(A, C, B) {
        var CA = new Laya.Vector3();
        Laya.Vector3.subtract(A, C, CA);
        var angle = this.Angle2(CA, B) * Math.PI / 180;
        var distance = Laya.Vector3.distance(A, C);
        distance *= Math.cos(angle);
        return distance;
    }

    /**[SixGod]
     * 向量夹角
     * @param {Laya.Vector3} ma 向量A
     * @param {Laya.Vector3} mb 向量B
     */
    static Angle2(ma, mb) {
        var v1 = (ma.x * mb.x) + (ma.y * mb.y) + (ma.z * mb.z);
        var ma_val = Math.sqrt(ma.x * ma.x + ma.y * ma.y + ma.z * ma.z);
        var mb_val = Math.sqrt(mb.x * mb.x + mb.y * mb.y + mb.z * mb.z);
        var cosM = v1 / (ma_val * mb_val);

        if (cosM < -1) cosM = -1;//emmm，应该是怎么样都是不会超过+-1才对啊
        if (cosM > 1) cosM = 1;

        var angleAMB = Math.acos(cosM) * 180 / Math.PI;
        return angleAMB;
    }

    /**
     * 获取两个向量夹角
     * @param a 向量ma
     * @param b 向量mb
     */
    static Angle1(a:Laya.Vector3,b:Laya.Vector3){
        // Laya.Vector3.TransformNormal
        // console.log(Laya.Vector3.dot(a,b),"::Laya.Vector3.dot(a,b)");

        let rad = Math.acos( Laya.Vector3.dot(a,b) );//缺少限制
        let angle = rad * 360/(Math.PI * 2);
        return angle;
    }

    /**查询子节点 
     * @param {Laya.Sprite3D} sp 父节点
     * @param {string} name 查询节点名称
     */
    public static findChild(sp, name) {
        if (sp.name == name) return sp;
        else return this._innerFindChild(sp._children, name);
    }
    /**二叉树查询子节点 */
    private static _innerFindChild(spArr, name) {
        var arr = [];
        for (var i = 0; i < spArr.length; i++) {
            var child = spArr[i];
            if (child.name && child.name == name) {//这里有个坑，如果节点没有名称，则无法查询
                return child;
            } else if (child.numChildren) {
                arr = arr.concat(child._children);
            }
        }
        if (!arr.length) return null;
        return this._innerFindChild(arr, name);
    }

    /**
     * 返回a物体面向b物体的四元数,不对原物体进行任何改变
     * @param a a物体
     * @param b b物体
     */
    public static AFaceToB(a:Laya.Sprite3D,b:Laya.Sprite3D):Laya.Quaternion{
        let dir:Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.subtract(a.transform.position.clone(),b.transform.position.clone(),dir);
        let aClone:Laya.Sprite3D = a.clone() as Laya.Sprite3D;
        let aFor:Laya.Vector3 = new Laya.Vector3();
        aClone.transform.getForward(aFor);
        aFor.x = -aFor.x;
        let getQuaternion:Laya.Quaternion = new Laya.Quaternion();
        Laya.Quaternion.rotationLookAt(aFor,new Laya.Vector3(0,1,0),getQuaternion);
        return getQuaternion;
    }

    /** 将物体身上的材质球强制转化为RENDERMODE_TRANSPARENT，并且进行alpha值修改 */
    public static AlphaMaterial(sp3d,alpha:number){
        let meshSP3D:Laya.MeshSprite3D = sp3d as Laya.MeshSprite3D;
        let getMat:Laya.UnlitMaterial = meshSP3D.meshRenderer.material as Laya.UnlitMaterial;

        let newMaterial  = new Laya.UnlitMaterial();
        newMaterial.albedoTexture = getMat.albedoTexture;
        newMaterial.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;

        newMaterial.albedoColorA = alpha;

        meshSP3D.meshRenderer.material = newMaterial;
    }

    /**
     * 返回父节点所有子节点
     * @param parent 父节点
     * @returns _children
     */
    public getChildren(parent){
        return parent._children;
    }
}