
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({
        type: cc.Node,
        tooltip: "图片上的标题",
    })
    title:cc.Node = null
    _gap:number = 22
    onLoad () {
        const maxWidth = 720
        const maxHeight = 886
        // 参考比例
        const referRatio = maxWidth / maxHeight
        const rect = this.node.getComponent(cc.Sprite).spriteFrame.getRect()
        // 图片比例
        const imgRatio = rect.width / rect.height

        let useWidth = maxWidth
        let useHeight = maxHeight
        if(imgRatio > referRatio){
            useHeight = maxWidth / imgRatio
        }else{
            useWidth = maxHeight * imgRatio
        }
        this.node.setContentSize(new cc.Size(useWidth,useHeight))
        const titlePosY = useHeight / 2 + this.node.y + this._gap
        this.title.y = titlePosY
    }

}
