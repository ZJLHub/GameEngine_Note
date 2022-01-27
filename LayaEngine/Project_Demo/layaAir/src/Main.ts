import { AttributeColor, AttributeColor11, AttributeColor22 } from "./const/GameConst";
import SceneConfig, { SceneTag } from "./const/SceneConfig";
import { UIScene, UIZorder } from "./const/UIConst";
import GameConfig from "./GameConfig";
import SceneManager from "./manager/SceneManager";
import UIMng from "./manager/UIMng";
import T3D from "./util/T3D";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError(true);

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	async onConfigLoaded() {
		//加载IDE指定的场景
		// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		SceneManager.instance.init(SceneConfig.instance.sceneConfig);
		let loadUI = await UIMng.instance.openUIScene(UIScene.load,UIZorder.scene);
		await this._loadScene3D();
		loadUI.close();
		let joy = await UIMng.instance.openUIScene(UIScene.JoyStick,UIZorder.scene);
		joy.zOrder = 100;
		let selectUI = await UIMng.instance.openUIScene(UIScene.SceneSelect,UIZorder.transition,SceneConfig.instance.sceneConfig,false);
		selectUI.zOrder = UIZorder.transition;
	}

	private async _loadScene3D(){
		let v1:Laya.Vector3 = new Laya.Vector3(1,0,5);
		let v2:Laya.Vector3 = new Laya.Vector3(5,0,1);
		let out:Laya.Vector3 = new Laya.Vector3();
		Laya.Vector3.multiply(v1,v2,out);

		console.log( v1,v2,   T3D.v3Dot(v1,v2),Laya.Vector3.dot(v1,v2),"out:::",out);
		let mout:Laya.Vector3 = new Laya.Vector3();
		Laya.Vector3.multiply(v1,v2,mout);
		console.log("Laya.Vector3.multiply(v1,v2,mout);::::",mout);
		let mOut22:Laya.Vector3 = new Laya.Vector3();
		Laya.Vector3.multiply(v2,v1,mOut22);
		console.log("Laya.Vector3.multiply(v2,v1,mOut);:::",mOut22);


		//cross才是叉乘~~~
		let crossV:Laya.Vector3 = new Laya.Vector3();
		Laya.Vector3.cross(v1,v2,crossV);
		console.log("Laya.Vector3.cross(v1,v2,crossV);:::",crossV);
		let crossV2:Laya.Vector3 = new Laya.Vector3();
		Laya.Vector3.cross(v2,v1,crossV2);
		console.log("Laya.Vector3.cross(v2,v1,crossV2);:::",crossV2);

		await SceneManager.instance.intoScene(SceneTag.joyDemo);

		let test = "fire";
		console.log(
		"AttributeColor[`${test}`]:::",AttributeColor[`${test}`],
		"AttributeColor[test]::",AttributeColor[test],
		"AttributeColor11[`${test}`]:::",AttributeColor11[`${test}`],
		"AttributeColor11[test]::::::",AttributeColor11[test],
		"AttributeColor22[test]:::",AttributeColor22[test]);
	}


}
//激活启动类
new Main();
