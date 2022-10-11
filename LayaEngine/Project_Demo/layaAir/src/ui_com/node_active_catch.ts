export default class node_active_catch extends Laya.Script{
    private _root:Laya.Sprite;
    onAwake(): void {
        this._root = this.owner as Laya.Sprite;
    }

    onPostRender(): void {
        console.log(this._root.name,"onPostRender");
    }
}