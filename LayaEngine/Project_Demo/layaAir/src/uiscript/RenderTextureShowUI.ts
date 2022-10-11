import { ui } from "../ui/layaMaxUI";

export default class RenderTextureShowUI extends ui.RenderTextureShowUI{

    onOpened(rt:Laya.RenderTexture){

        // let text2d:Laya.Texture2D = new Laya.Texture2D(750,1334,Laya.TextureFormat.R8G8B8A8,false,false);
        // let pixels:Uint8Array = new Uint8Array(750*1334*4);
        // rt.getData(0,0,750,1334,pixels);
        // text2d.setPixels(pixels);
        // let tx:Laya.Texture = new Laya.Texture(text2d);
        // this.rtImg.texture = tx;
        

        // let texture2d:Laya.Texture2D = new Laya.Texture2D( rt as any );
        // this.rtImg.texture = new Laya.Texture(texture2d);
        this.rtImg.source = new Laya.Texture( (rt as unknown as Laya.Texture2D) );

    }





}