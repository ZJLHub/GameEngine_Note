import { ui } from "../ui/layaMaxUI";
import ImgFilter from "../util/ImgFilter";
import { es } from "../util/tween_core";

export default class mainSceneUI extends ui.mainSceneUI {
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    
    constructor() { super(); }
    
    onEnable(): void {
    }

    onDisable(): void {
    }

    onAwake(): void {
        ImgFilter.gaussBlur(this.img,2,1);
        ImgFilter.gaussBlur(this.img,1,0.25);
        ImgFilter.gaussBlur(this.img,1,0.25);

        es.tween(this.test_tween_line).to(10,{width:10}).to(20,{width:600}).start();
        // es.tween(this.img).to();

        
    }
}