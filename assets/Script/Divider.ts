
const {ccclass, property} = cc._decorator;

@ccclass
export default class Divider extends cc.Component {

    @property(cc.Node)
    resultImg:cc.Node = null
    @property(cc.Integer)
    velocity: number = 800

    _leftEdge: number= 0
    _rightEdge: number = 720
    _startPos
    start () {
        const imgSize = this.resultImg.getContentSize()
        this._leftEdge = (this.resultImg.x - imgSize.width/2) * 0.9
        this._rightEdge = (this.resultImg.x + imgSize.width/2) * 0.8
        this.node.x = this._rightEdge
        this.node.height = imgSize.height
        this.resultImg.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this)
        this.resultImg.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)
        this.resultImg.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this)
        this.resultImg.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this)
    }
    onTouchStart (e:cc.Event.EventTouch) {
        cc.Tween.stopAll()
    }
    onTouchMove (e:cc.Event.EventTouch) {
        this.node.x += e.getDeltaX()
        if(this.node.x >= this._rightEdge) this.node.x = this._rightEdge
        if(this.node.x <= this._leftEdge) this.node.x = this._leftEdge
    }
    onTouchEnd () {
        const d:number = this._rightEdge - this.node.x
        cc.tween(this.node).to(d / this.velocity,{x:this._rightEdge}).start()
    }
    onTouchCancel () {
        this.onTouchEnd()
    }

}
