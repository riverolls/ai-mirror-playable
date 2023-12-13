import { googlePlayUrl } from "./ChannelManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GooglePlayBtn extends cc.Component {
  _widget: cc.Widget = null;
  onLoad() {
    this._widget = this.node.getComponent(cc.Widget);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this));
  }
  onClick() {
    window.open(googlePlayUrl);
  }
  onLandscape() {
    this._widget.enabled = false;
    this.node.scale = 1.5;
    this.node.setPosition(this.node.width + 5, 230.0);
  }
  onPortrait() {
    this.node.scale = 1;
    this._widget.top = 10.0;
    this._widget.right = 12.5;
    this._widget.enabled = true;
  }
}
