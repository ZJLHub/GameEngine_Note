/**图片滤镜效果 
 * 
 * 图片滤镜效果，Laya似乎是有一个WebGL的滤镜库 具体看https://wangmaoxiong.blog.csdn.net/article/details/84971519
*/
export default class ImgFilter extends Laya.Script {

    
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
    
}