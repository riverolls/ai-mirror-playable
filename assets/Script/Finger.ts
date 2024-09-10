const { ccclass, property } = cc._decorator;

@ccclass
export default class Finger extends cc.Component {
  @property(cc.Integer)
  repeatCount: number = 3;
  @property(cc.Node)
  divider: cc.Node = null;
  start() {
    let originPosX = this.node.x;
    const d = -180;
    cc.tween(this.node)
      .repeat(
        3,
        cc
          .tween(this.node)
          .to(1, { x: originPosX + d })
          .to(0, { x: originPosX })
      )
      .call(() => {
        this.node.active = false;
      })
      .start();
  }

  onPortrait() {
    this.node.setPosition(this.divider.getPosition());
  }
  onLandscape() {
    this.node.setPosition(this.divider.getPosition());
  }
}
