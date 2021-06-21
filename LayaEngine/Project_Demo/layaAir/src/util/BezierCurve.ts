/**贝塞尔曲线工具 */
//https://blog.csdn.net/aimeimeits/article/details/72809382
export default class BezierCurve {

    /**
     * @param point 贝塞尔曲线控制点坐标   二位、三维、...
     * @param precision 精度  需要计算的该条贝赛尔曲线上的点的数目
     * @returns 该条贝塞尔曲线上的点（二维坐标）
     */
    public static calculate(point: number[][], precision: number) {
        //维度，坐标轴数（二维坐标，三维坐标...）
        let dimersion = point[0].length;
        //贝塞尔控制点数（阶数）
        let jie = point.length;
        if (jie < 2 || dimersion < 2) {
            console.log("贝塞尔曲线创建失败：：阶数jie", jie, "维度dimersion::", dimersion);
            return null;
        }

        let result: number[][] = [];

        //计算杨辉三角
        let mi: number[] = new Array<number>(jie);
        mi[0] = mi[1] = 1;
        for (let i = 3; i <= jie; i++) {
            let t: number[] = new Array<number>(i - 1);
            for (let j = 0; j < t.length; j++) {
                t[j] = mi[j];
            }

            mi[0] = mi[i - 1] = 1;
            for (let K = 0; K < i - 2; K++) {
                mi[K + 1] = t[K] + t[K + 1];
            }
        }

        for (let i = 0; i < precision; i++) {
            let t = i / precision;
            let arr = new Array<number>(dimersion);
            result.push(arr);
            for (let j = 0; j < dimersion; j++) {
                let temp = 0;
                for (let k = 0; k < jie; k++) {
                    temp += Math.pow(1 - t, jie - k - 1) * point[k][j] * Math.pow(t, k) * mi[k];
                }
                result[i][j] = temp;
            }
        }

        return result;
    }

}

/**
 *
 *
 *         //测试贝塞尔函数
        let curTime:number = Laya.timer.currTimer;
        let point:number[][] = [[this.bP1.x,this.bP1.y],[this.bP2.x,this.bP2.y],[this.bP3.x,this.bP3.y],[this.bP4.x,this.bP4.y]];
        let line = BezierCurve.calculate(point,30);
        let grap:Laya.Graphics = new Laya.Graphics();
        let sp:Laya.Sprite = new Laya.Sprite();
        sp.graphics = grap;
        this.addChild(sp);
        for(let i=0;i<line.length;i++){
            let x = line[i][0];
            let y = line[i][1];
            grap.drawCircle(x,y,5,"#59fff8");
        }
        let endTime:number = Laya.timer.currTimer;
        console.log("curTime:::",curTime,"end",endTime,"endTime-curTime:",endTime-curTime,"line::",line);
 *
 */