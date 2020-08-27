import Entity from "./Entity";
import p5 from "p5";
import Game from "./Game";

export default class Player extends Entity {
  constructor(game: Game, px: number, py: number) {
    super(game, px, py, 0.02, 0.02);
  }

  draw(p: p5) {
    if (this.game.blocks.some((block) => block.collidesWith(this))) {
      this.ay = 0;
      this.vy = -this.game.GRAVITY;
    } else {
      this.ay = this.game.GRAVITY;
    }

    if (p.keyIsDown(p.LEFT_ARROW)) {
      this.ax = -0.1;
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      this.ax = 0.1;
    } else if (p.keyIsDown(p.UP_ARROW)) {
      this.ay = -0.1;
    } else {
      this.ax = 0;
    }

    super.draw(p);

    p.fill(255, 255, 255);
    p.ellipse(
      this.px * p.width / 2,
      this.py * p.height / 2,
      this.sx * p.width,
      this.sy * p.height,
    );
  }
}
