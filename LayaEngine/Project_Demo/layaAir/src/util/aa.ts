    //  /**
    //  * @param poss      贝塞尔曲线控制点坐标
    //  * @param precision 精度，需要计算的该条贝塞尔曲线上的点的数目
    //  * @return 该条贝塞尔曲线上的点（二维坐标）
    //  */
    //   public float[][] calculate(float[][] poss, int precision) {

    //     //维度，坐标轴数（二维坐标，三维坐标...）
    //     int dimersion = poss[0].length;

    //     //贝塞尔曲线控制点数（阶数）
    //     int number = poss.length;

    //     //控制点数不小于 2 ，至少为二维坐标系
    //     if (number < 2 || dimersion < 2)
    //         return null;

    //     float[][] result = new float[precision][dimersion];

    //     //计算杨辉三角
    //     int[] mi = new int[number];
    //     mi[0] = mi[1] = 1;
    //     for (int i = 3; i <= number; i++) {

    //         int[] t = new int[i - 1];
    //         for (int j = 0; j < t.length; j++) {
    //             t[j] = mi[j];
    //         }

    //         mi[0] = mi[i - 1] = 1;
    //         for (int j = 0; j < i - 2; j++) {
    //             mi[j + 1] = t[j] + t[j + 1];
    //         }
    //     }

    //     //计算坐标点
    //     for (int i = 0; i < precision; i++) {
    //         float t = (float) i / precision;
    //         for (int j = 0; j < dimersion; j++) {
    //             float temp = 0.0f;
    //             for (int k = 0; k < number; k++) {
    //                 temp += Math.pow(1 - t, number - k - 1) * poss[k][j] * Math.pow(t, k) * mi[k];
    //             }
    //             result[i][j] = temp;
    //         }
    //     }

    //     return result;
    // }