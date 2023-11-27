const {ccclass, property} = cc._decorator;

@ccclass
export default class SpriteRadius extends cc.Component {
    @property
    leftTopRadius:number = 0
    @property
    rightTopRadius:number = 0
    @property
    leftBottomRadius:number = 0
    @property
    rightBottomRadius:number = 0
    @property(cc.Color)
    topLeftColor:cc.Color = null
    @property(cc.Color)
    bottomRightColor:cc.Color = null

    _material:cc.Material=null;
    _size:cc.Size=null;
    onLoad () {
        this._material = this.node.getComponent(cc.Sprite).getMaterial(0);
        let texture = this.node.getComponent(cc.Sprite).spriteFrame.getTexture()
        texture.packable = false // 自定义 effect 需要禁止该选项
        this._size = this.node.getContentSize()
        this.setProperty('size',[this._size.width,this._size.height])
        this.setProperty('leftTop',[this.leftTopRadius,this.rightTopRadius])
        this.setProperty('rightTop',[this.rightTopRadius,this.rightTopRadius])
        this.setProperty('leftBottom',[this.leftBottomRadius,this.leftBottomRadius])
        this.setProperty('rightBottom',[this.rightBottomRadius,this.rightBottomRadius])
    }


    getProperty (key:string) {
        if(!this._material) return null
        return this._material.getProperty(key,0)
    }
    setProperty(key:string,value:any){
        if(!this._material) return;
        this._material.setProperty(key,value,0)
    }

}
