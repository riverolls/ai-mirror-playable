import { appStoreUrl } from "./ChannelManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AppStoreBtn extends cc.Component {
  _widget: cc.Widget = null;
  onLoad() {
    this._widget = this.node.getComponent(cc.Widget);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this));
  }
  onClick() {
    window.open(appStoreUrl);
  }
  onLandscape() {
    this._widget.enabled = false;
    this.node.setPosition(this.node.width * 0.5, 290.0);
  }
  onPortrait() {
    this._widget.top = 100.0;
    this._widget.right = 12.5;
    this._widget.enabled = true;
  }
}
