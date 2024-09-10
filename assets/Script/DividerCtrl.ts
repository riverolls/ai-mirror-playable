import { IEvent } from "./ChannelManager"

const { ccclass, property } = cc._decorator

@ccclass
export default class DividerCtrl extends cc.Component {
  @property(cc.Node)
  divider: cc.Node = null
  @property(cc.Node)
  originImg: cc.Node = null
  @property({
    type: cc.Float,
    tooltip:
      "全程返程时长, 单位秒，如果没有拉到左边界，自动计算应使用时长",
  })
  backDuration: number = 0.5

  _leftEdge: number = 0
  _rightEdge: number = 720
  _isEmited: boolean = false
  start() {
    // this.node.on(
    //   cc.Node.EventType.TOUCH_START,
    //   this.onTouchStart,
    //   this
    // )
    // this.node.on(
    //   cc.Node.EventType.TOUCH_END,
    //   this.onTouchEnd,
    //   this
    // )
    // this.node.on(
    //   cc.Node.EventType.TOUCH_MOVE,
    //   this.onTouchMove,
    //   this
    // )
    // this.node.on(
    //   cc.Node.EventType.TOUCH_CANCEL,
    //   this.onTouchCancel,
    //   this
    // )
  }
  init() {
    const imgSize = this.originImg.getContentSize()
    this.divider.height = imgSize.height
    this.node.setPosition(this.originImg.getPosition())
    this._leftEdge = this.originImg.x + 30
    this._rightEdge = this.originImg.x + imgSize.width - 30
  }
  onLandscape() {
    this.init()
    const imgSize = this.originImg.getContentSize()
    this.node.setContentSize(imgSize)
    this.divider.y = this.originImg.y
    this.divider.x = this._rightEdge
    this.originImg.width = this.divider.x - this.originImg.x
    this.startAnim()
  }
  onPortrait() {
    this.init()
    const imgSize = this.originImg.getContentSize()
    this.node.setContentSize(
      new cc.Size(720, imgSize.height)
    )
    this._leftEdge = this.originImg.x + 30
    this._rightEdge = this.originImg.x + imgSize.width - 30
    this.divider.y = this.originImg.y
    this.divider.x = this._rightEdge
    this.originImg.width = this.divider.x - this.originImg.x
    this.startAnim()
  }
  onTouchStart(e: cc.Event.EventTouch) {
    cc.Tween.stopAllByTarget(this.divider)
  }
  onTouchMove(e: cc.Event.EventTouch) {
    this.divider.x += e.getDeltaX()
    if (this.divider.x >= this._rightEdge)
      this.divider.x = this._rightEdge
    if (this.divider.x <= this._leftEdge)
      this.divider.x = this._leftEdge
    this.originImg.width = this.divider.x - this.originImg.x
  }
  onTouchEnd() {
    const distance: number =
      this._rightEdge - this.divider.x
    const duration =
      (distance / (this._rightEdge - this._leftEdge)) *
      this.backDuration
    cc.tween(this.divider)
      .to(duration, { x: this._rightEdge })
      .start()
    cc.tween(this.originImg)
      .to(duration, {
        width: this._rightEdge - this.originImg.x,
      })
      .start()
    if (!this._isEmited) {
      this._isEmited = true
      this.node.parent.emit(IEvent.GAME_END)
    }
  }
  onTouchCancel() {
    this.onTouchEnd()
  }
  onDisable(): void {
    this.node.targetOff(this)
  }

  cubicBezier(p1x, p1y, p2x, p2y) {
    return function (t) {
      // 三次贝塞尔曲线函数
      const cx = 3 * p1x
      const bx = 3 * (p2x - p1x) - cx
      const ax = 1 - cx - bx
      const cy = 3 * p1y
      const by = 3 * (p2y - p1y) - cy
      const ay = 1 - cy - by

      function bezierX(t) {
        return ((ax * t + bx) * t + cx) * t
      }

      function bezierY(t) {
        return ((ay * t + by) * t + cy) * t
      }

      // 使用牛顿迭代法求解 X 值的反函数
      function bezier(t) {
        let x = t
        for (let i = 0; i < 5; i++) {
          const z = bezierX(x) - t
          if (Math.abs(z) < 1e-3) break
          x -= z / ((3 * ax * x + 2 * bx) * x + cx)
        }
        return bezierY(x)
      }

      return bezier(t)
    }
  }

  startAnim() {
    cc.Tween.stopAll()
    let t = cc.tween
    let customEasing = this.cubicBezier(
      0.8,
      0.12,
      0.14,
      0.82
    )
    let move2Left = t().to(
      1.5,
      { x: this._leftEdge },
      { easing: customEasing }
    )
    let move2Right = t().to(
      1.5,
      { x: this._rightEdge },
      {
        easing: customEasing,
      }
    )
    t(this.divider)
      .sequence(move2Left, move2Right)
      .repeatForever()
      .start()

    let shrinkWidth = t().to(
      1.5,
      {
        width: this._leftEdge - this.originImg.x,
      },
      {
        easing: customEasing,
      }
    )
    let growWidth = t().to(
      1.5,
      {
        width: this._rightEdge - this.originImg.x,
      },
      {
        easing: customEasing,
      }
    )
    t(this.originImg)
      .sequence(shrinkWidth, growWidth)
      .repeatForever()
      .start()
  }
}
