export class horLayout extends Laya.Script{

    private _root:Laya.Box;
    private _children:Laya.Sprite[] = [];

    onAwake(){
        this._root = this.owner as Laya.Box;

        for(let i=0; i<this._root.numChildren; i++){
            let child = this._root.getChildAt(i) as Laya.Sprite;
            this._children.push(child);
        }
        
        this._children[0].onDisable = ()=>{
            console.log(this._children[0].visible);
        }
        

    }

}