export default class ZJLMenuTab extends Laya.Script {
    private _root: Laya.Box = null;
    private _curIndex: number = 0;
    private _itemBGList: Laya.Image[] = [];
    private _itemImgList:Laya.Image[] = [];
    private _menuClickListener: { listener: Function, thisObj: object }[] = [];

    /** @prop {name: bg1, tips:"未选中bg",type:strings,accept:res} */
    private bg1: string;
    /** @prop {name: bg2, tips:"选中bg",type:strings,accept:res} */
    private bg2: string;

    /** @prop {name: resFile, tips:"resFile",type:strings,accept:res} */
    private resFile: string;
    /** @prop {name:normalResArr,tips:"未选中的形式",type:Vector,xCount:2,sType:String} */
    normalResArr: string[];
    // private _normalTypeResArr: string[] = ["part0_0", "part2_0", "part3_0", "part4_0", "part1_0"];
    /** @prop {name:selectResArr,tips:"选中的形式",type:Vector,xCount:2,sType:String} */
    private selectResArr: string[];
    // private _selectTypeResArr: string[] = ["part0_1", "part2_1", "part3_1", "part4_1", "part1_1"];
    /** @prop {name:tabPanel,type:Vector,labes:TabPanel,types:"Node",xCount:2,sType:Node}*/
    tabPanel: Laya.Panel[];

    public get curIndex() {
        return this._curIndex;
    }
    addMenuClickListener(listener: Function, thisObj: object) {
        if (!this || !this._menuClickListener) return;
        this._menuClickListener.push({ listener: listener, thisObj: thisObj });
    }
    removeMenuClickListener(listener: Function, thisObj: object) {
        if (!this || !this._menuClickListener) return;
        this._menuClickListener = this._menuClickListener.filter((value) => {
            return value.listener !== listener || value.thisObj !== thisObj;
        });
    }

    onAwake() {
        this._root = this.owner as Laya.Box;
        
        for (let i = 0; i < this._root.numChildren; i++) {
            let item:Laya.Box = this._root.getChildAt(i) as Laya.Box;
            let itemBG: Laya.Image = item.getChildAt(0) as Laya.Image;
            this._itemBGList.push(itemBG);
            let itemImg:Laya.Image = item.getChildAt(1) as Laya.Image;
            this._itemImgList.push(itemImg);
            item.on(Laya.Event.CLICK, this, this._onMenuClikc, [i]);
        }

        for (let i = 0; i < this._itemBGList.length; i++) {
            this._itemBGList[i].skin = `${this.bg1}`;
        }
        this._itemBGList[this._curIndex].skin = `${this.bg2}`;
    }

    private _onMenuClikc(index: number) {
        index = Math.min((this._root.numChildren-1),this._curIndex);
        if (index != this._curIndex) {
            this._menuClickListener.forEach((value) => {
                value.listener.apply(value.thisObj, [index]);
            });
        }
        this._itemBGList[this._curIndex].skin = `${this.bg1}`;
        this._itemImgList[this._curIndex].skin = `${this.resFile}/${this.normalResArr[this._curIndex]}`;
        this._curIndex = index;
        this._itemBGList[this._curIndex].skin = `${this.bg2}`;
        this._itemBGList[this._curIndex].skin = `${this.resFile}/${this.selectResArr[this._curIndex]}`;
    }

}