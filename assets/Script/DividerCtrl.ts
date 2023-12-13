import { IEvent } from "./ChannelManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DividerCtrl extends cc.Component {
  @property(cc.Node)
  divider: cc.Node = null;
  @property(cc.Node)
  originImg: cc.Node = null;
  @property({
    type: cc.Float,
    tooltip: "全程返程时长, 单位秒，如果没有拉到左边界，自动计算应使用时长",
  })
  backDuration: number = 0.5;

  _leftEdge: number = 0;
  _rightEdge: number = 720;
  _isEmited:boolean = false
  start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
  }
  init() {
    const imgSize = this.originImg.getContentSize();
    this.divider.height = imgSize.height;
    this.node.setPosition(this.originImg.getPosition());
    this._leftEdge = this.originImg.x + 30;
    this._rightEdge = this.originImg.x + imgSize.width - 30;
  }
  onLandscape() {
    this.init();
    const imgSize = this.originImg.getContentSize();
    this.node.setContentSize(imgSize);
    this.divider.y = this.originImg.y;
    this.divider.x = this._rightEdge;
    this.originImg.width = this.divider.x - this.originImg.x;
  }
  onPortrait() {
    this.init();
    const imgSize = this.originImg.getContentSize();
    this.node.setContentSize(new cc.Size(720, imgSize.height));
    this._leftEdge = this.originImg.x + 30;
    this._rightEdge = (this.originImg.x + imgSize.width) - 30;
    this.divider.y = this.originImg.y;
    this.divider.x = this._rightEdge;
    this.originImg.width = this.divider.x - this.originImg.x;
  }
  onTouchStart(e: cc.Event.EventTouch) {
    cc.Tween.stopAllByTarget(this.divider);
  }
  onTouchMove(e: cc.Event.EventTouch) {
    this.divider.x += e.getDeltaX();
    if (this.divider.x >= this._rightEdge) this.divider.x = this._rightEdge;
    if (this.divider.x <= this._leftEdge) this.divider.x = this._leftEdge;
    this.originImg.width = this.divider.x - this.originImg.x;
  }
  onTouchEnd() {
    const distance: number = this._rightEdge - this.divider.x;
    const duration =
      (distance / (this._rightEdge - this._leftEdge)) * this.backDuration;
    cc.tween(this.divider).to(duration, { x: this._rightEdge }).start();
    cc.tween(this.originImg)
      .to(duration, { width: this._rightEdge - this.originImg.x })
      .start();
      if(!this._isEmited){
        this._isEmited = true
        this.node.parent.emit(IEvent.GAME_END)
      }
  }
  onTouchCancel() {
    this.onTouchEnd();
  }
  onDisable(): void {
    this.node.targetOff(this);
  }
}
