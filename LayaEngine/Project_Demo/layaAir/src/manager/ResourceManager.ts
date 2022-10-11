export default class ResourceManager {
    private static _instance: ResourceManager = null;
    public static get instance(): ResourceManager {
        if (ResourceManager._instance == null) ResourceManager._instance = new ResourceManager();
        return ResourceManager._instance;
    }
    /**创造UI的预制体  
     * 会存入对象池中，所以只能是固定并且少量生成的预制体
     */
    public createUIPre(preName:string){
        return new Promise<any>((reslove)=>{
            //尝试从对象池中获取该对象,不知道这样子做是否合理
            Laya.loader.load(`prefab/${preName}.prefab`,Laya.Handler.create(this,(res)=>{
                let prefab:Laya.Prefab = new Laya.Prefab();
                prefab.json = res.json;
                let mapImg = Laya.Pool.getItemByCreateFun(preName,prefab.create,prefab);
                reslove(mapImg);
                // reslove(prefab);
            }));
        });
    }
}
