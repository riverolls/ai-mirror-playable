import { IEvent } from "./ChannelManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DownloadBtn extends cc.Component {
  @property(cc.Node)
  decoration: cc.Node = null;

  _widget: cc.Widget = null;
  onLoad() {
    this._widget = this.node.getComponent(cc.Widget);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this));
  }
  onClick() {
    this.node.parent.emit(IEvent.CLICK_DOWNLOAD);
  }
  onLandscape() {
    this._widget.enabled = false;
    let x = this.node.width * 0.5 + 26.5;
    let y = -240.0
    this.node.setPosition(x, y);
    this.decoration.setPosition(x, 0)
    this.decoration.active = true;
  }
  onPortrait() {
    this._widget.bottom = 15;
    this._widget.isAlignHorizontalCenter = true;
    this._widget.horizontalCenter = 0.0;
    this._widget.enabled = true;
    this.decoration.active = false;
  }
}
