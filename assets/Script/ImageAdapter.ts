import { IEvent } from "./ChannelManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ImageAdapter extends cc.Component {
  @property(cc.Sprite)
  img: cc.Sprite = null;
  @property(cc.Node)
  downloadBtn: cc.Node = null;

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this))
  }

  onClick() {
    this.node.parent.emit(IEvent.CLICK_DOWNLOAD);
  }

  onLandscape() {
    const maxWidth = 458;
    const maxHeight = 720;
    const newSize = this._sizeAdapter(maxWidth, maxHeight);
    this.node.x = -newSize.width - 45;
    this.node.y = 0;
  }
  onPortrait() {
    const maxWidth = 720;
    const maxHeight = 1123;
    const newSize = this._sizeAdapter(maxWidth, maxHeight);
    this.node.x = -newSize.width / 2;
    const vGap = 19.5;
    const visibleSize = cc.view.getVisibleSize();
    const remainingHeight =
      visibleSize.height - this.downloadBtn.height - vGap * 2;
    const y = Math.abs(640 - remainingHeight / 2);
    this.node.y = y;
  }

  _sizeAdapter(maxWidth: number, maxHeight: number) {
    // 参考比例
    const referRatio = maxWidth / maxHeight;
    const rect = this.img.spriteFrame.getRect();
    // 图片比例
    const imgRatio = rect.width / rect.height;

    let useWidth = maxWidth;
    let useHeight = maxHeight;
    if (imgRatio > referRatio) {
      useHeight = maxWidth / imgRatio;
    } else {
      useWidth = maxHeight * imgRatio;
    }
    const newSize = new cc.Size(useWidth, useHeight);
    this.node.setContentSize(newSize);
    this.img.node.setContentSize(newSize);
    return newSize;
  }
}
