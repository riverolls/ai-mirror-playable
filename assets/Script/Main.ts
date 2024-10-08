/** @format */

import AppStoreBtn from "./AppStoreBtn"
import { IEvent } from "./ChannelManager"
import DividerCtrl from "./DividerCtrl"
import DownloadBtn from "./DownloadBtn"
import Finger from "./Finger"
import GooglePlayBtn from "./GooglePlayBtn"
import ImageAdapter from "./ImageAdapter"

const { ccclass, property } = cc._decorator

@ccclass
export default class Main extends cc.Component {
  @property(cc.Canvas)
  canvas: cc.Canvas = null
  @property(GooglePlayBtn)
  googlePlay: GooglePlayBtn = null
  @property(AppStoreBtn)
  appStore: AppStoreBtn = null
  @property(DownloadBtn)
  downloadBtn: DownloadBtn = null
  @property(ImageAdapter)
  originImg: ImageAdapter = null
  @property(ImageAdapter)
  resultImg: ImageAdapter = null
  @property(DividerCtrl)
  dividerCtrl: DividerCtrl = null
  @property(Finger)
  finger: Finger = null

  _isLandscape: boolean = false
  _visibleSize: cc.Size = new cc.Size(720, 1280)
  _isAndroid: boolean = /android/i.test(navigator.userAgent)
  protected onLoad(): void {
    this._onScreenChanged()
    cc.view.setResizeCallback(this._onScreenChanged.bind(this))
  }
  start() {
    this.node.parent.emit(IEvent.GAME_READY)
    if (this._isAndroid) {
      this.appStore.node.active = false
      this.googlePlay.node.active = true
    } else {
      this.appStore.node.active = true
      this.googlePlay.node.active = false
    }
  }
  _onScreenChanged() {
    var rect = cc.game.canvas.getBoundingClientRect()

    this._visibleSize.width = rect.width
    this._visibleSize.height = rect.height
    // console.log("试图尺寸", this._visibleSize);
    if (rect.width > rect.height) {
      this._isLandscape = true
      this.canvas.designResolution = new cc.Size(1280, 720)
      // 横屏适配
      this._landscapeAdapter()
    } else {
      this.canvas.designResolution = new cc.Size(720, 1280)
      // 竖屏适配
      this._portraitAdapter()
    }
  }
  /** 横屏适配 */
  _landscapeAdapter() {
    this.originImg.onLandscape()
    this.resultImg.onLandscape()
    this.dividerCtrl.onLandscape()
    this.googlePlay.onLandscape()
    this.appStore.onLandscape()
    this.downloadBtn.onLandscape()
    this.finger.onLandscape()
  }
  /** 竖屏适配 */
  _portraitAdapter() {
    this.googlePlay.onPortrait()
    this.appStore.onPortrait()
    this.downloadBtn.onPortrait()
    this.originImg.onPortrait()
    this.resultImg.onPortrait()
    this.dividerCtrl.onPortrait()
    this.finger.onPortrait()
  }
}
