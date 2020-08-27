import Entity from "./Entity";
import p5 from "p5";
import Game from "./Game";

export default class Enemy extends Entity {
  constructor(game: Game, px: number, py: number) {
    super(game, px, py, 0.04, 0.04);
  }

  async predict() {
    this.ax = (this.game.player.px > this.px) ? 0.1 : -0.1;
    await super.predict();
  }

  draw(p: p5) {
    if (this.game.blocks.some((block) => block.collidesWith(this))) {
      this.ay = 0;
      this.vy = -this.game.GRAVITY;
    } else {
      this.ay = this.game.GRAVITY;
    }

    super.draw(p);

    if(this.collidesWith(this.game.player)) {
        this.game.reset();
    }

    p.fill(0, 123, 255);
    p.ellipse(
      this.px * p.width / 2,
      this.py * p.height / 2,
      this.sx * p.width,
      this.sy * p.height,
    );
  }
}
