export default class Util {
    public static ZERO = new Laya.Vector3(0, 0, 0);
    public static randomRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    public static randomRangeInt(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }

    public static Clamp(value, min, max) {
        if (value < min) {
            return min;
        } else {
            return value > max ? max : value;
        }
    }

    /**深度优先 */
    public static findChild(sp, name) {
        if (sp.name == name) return sp;
        else return this._innerFindChild(sp._children, name);
    }

    private static _innerFindChild(spArr, name) {
        var arr = [];
        for (var i = 0; i < spArr.length; i++) {
            var child = spArr[i];
            if (child.name == name) {
                return child;
            } else if (child.numChildren) {
                arr = arr.concat(child._children);
            }
        }
        if (!arr.length) return null;
        return this._innerFindChild(arr, name);
    }

    /**
     * 平台判断
     * @param platfom 平台
     * 如果不传参，默认小游戏平台
     */
    public static checkPlatform(platfom?: string): boolean {
        let _platformList: Array<string> = ["wx", "qq", "tt", "qg"];
        let _isExistPlatform: boolean = false;
        if (platfom) {
            if (window[platfom]) {
                if (platfom === "wx") {
                    if (!window["tt"]) {
                        //输入wx,但是是tt平台
                        _isExistPlatform = true;
                    } else {
                        _isExistPlatform = true;
                    }
                } else {
                    _isExistPlatform = true;
                }
            }
        } else {
            for (let i = 0; i < _platformList.length; i++) {
                if (window[_platformList[i]]) {
                    _isExistPlatform = true;
                }
            }
        }
        return _isExistPlatform;
    }

    /**
     * 获得三维坐标对应的屏幕坐标
     * @param camera 摄像机
     * @param position 三维坐标
     */
    public static getScreenPosition(camera: Laya.Camera, position: Laya.Vector3) {
        let screenPosition = new Laya.Vector4();
        camera.worldToViewportPoint(position, screenPosition);
        return screenPosition;
    }

    public static wait(timeout: number): Promise<void> {
        return new Promise((resolve) => {
            Laya.timer.once(timeout, this, () => {
                resolve(null);
            })
        })
    }

    public static twoPointDistance(a: { x: number, y: number }, b: { x: number, y: number }): number {
        let x = a.x - b.x;
        let y = a.y - b.y;
        let res = Math.sqrt(x * x + y * y);
        return res;
    }

    /**搜索root节点下的所有子节点 
     * @param root 查询节点
     * @param func 操作方式
     */
    public static travelSprite3D(root: Laya.Sprite3D, func: any) {
        if (!root) return;
        func(root);
        for (let i = 0; i < root.numChildren; i++) {
            this.travelSprite3D(root.getChildAt(i) as Laya.Sprite3D, func);
        }
    }

    /**
     * 头条截屏
     */
    public static ttCapScreen() {
        return new Promise<Laya.Texture>((reslove) => {
            let gl: WebGL2RenderingContext = Laya["LayaGL"].instance;
            let pixels: Uint8Array = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
            gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            let w: number = gl.drawingBufferWidth;
            let h: number = gl.drawingBufferHeight;
            let texture2d: Laya.Texture2D = new Laya.Texture2D(w, h, Laya.TextureFormat.R8G8B8A8, false, false);
            texture2d.setPixels(pixels);
            let tex: Laya.Texture = new Laya.Texture(texture2d);
            reslove(tex);
            // let canvas = htmlC.getTexture();
        });

    }

    public static getRandomArrElement(arr, count) {
        let shuffled = arr.slice(0),
            i = arr.length,
            min = i - count,
            temp,
            index;
        while (i > min) {
            index = Math.floor((i--) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }
}
