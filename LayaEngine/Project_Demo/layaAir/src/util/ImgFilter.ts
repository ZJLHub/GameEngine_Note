/**图片滤镜效果 
 * 
 * 图片滤镜效果，Laya似乎是有一个WebGL的滤镜库 具体看https://wangmaoxiong.blog.csdn.net/article/details/84971519
*/
export default class ImgFilter extends Laya.Script {

    /**灰白滤镜 */
    public static grayingRole(roleImg: Laya.Image): void {
        let grayscaleMat: Array<number> =
            [
                0.3086, 0.6094, 0.0820, 0, 0,
                0.3086, 0.6094, 0.0820, 0, 0,
                0.3086, 0.6094, 0.0820, 0, 0,
                0, 0, 0, 1, 0
            ];
        //创建一个颜色滤镜对象，灰白图
        var grayscaleFilter: Laya.ColorFilter = new Laya.ColorFilter(grayscaleMat);
        // 设置滤镜效果
        roleImg.filters = [grayscaleFilter];

        //恢复只需要将filters = null;即可
    }

    /**高斯模糊 */
    public static gaussBlur(img: Laya.Image, radius?: number, sigma?: number) {
        let text = img.source;
        let pixes = text.getPixels(0, 0, text.width, text.height);
        let height = text.height, width = text.width;
        radius = radius || 5;
        sigma = sigma || radius / 3;

        let gaussEdge = radius * 2 + 1;

        let gaussMatrix: number[] = [],
            gaussSum = 0,
            a = 1 / (2 * sigma * sigma * Math.PI),
            b = -a * Math.PI;

        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                let gxy = a * Math.exp((i * i + j * j) * b);
                gaussMatrix.push(gxy);
                gaussSum += gxy;
            }
        }
        let gaussNum = (radius + 1) * (radius + 1);
        for (let i = 0; i < gaussNum; i++) {
            gaussMatrix[i] / gaussSum;
        }

        let handleEdge = (i, x, w) => {
            let m = x + i;
            if (m < 0) {
                m = -m;
            } else if (m >= w) {
                m = w + i - x;
            }
            return m;
        }
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                let r = 0, g = 0, b = 0;
                for (var i = -radius; i <= radius; i++) {
                    var m = handleEdge(i, x, width);
                    for (var j = -radius; j <= radius; j++) {
                        var mm = handleEdge(j, y, height);
                        var currentPixId = (mm * width + m) * 4;
                        var jj = j + radius;
                        var ii = i + radius;
                        r += pixes[currentPixId] * gaussMatrix[jj * gaussEdge + ii];
                        g += pixes[currentPixId + 1] * gaussMatrix[jj * gaussEdge + ii];
                        b += pixes[currentPixId + 2] * gaussMatrix[jj * gaussEdge + ii];
                    }
                }
                var pixId = (y * width + x) * 4;

                pixes[pixId] = ~~r;
                pixes[pixId + 1] = ~~g;
                pixes[pixId + 2] = ~~b;
            }
        }


        let text2 = new Laya.Texture2D(width, height, Laya.TextureFormat.R8G8B8A8, false, false);
        text2.setPixels(pixes);
        img.source = new Laya.Texture(text2);
    }

}