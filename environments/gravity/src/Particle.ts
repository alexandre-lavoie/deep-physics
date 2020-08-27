import p5 from "p5";
import Game from "./Game";

const PARTICLE_SIZE = 0.075;
const LIMIT_X = 0.99;
const LIMIT_Y = 0.99;
const FORCE_DIV = 10;

export class Particle {
  px: number;
  py: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  game: Game;
  canPredict: boolean;

  constructor(game: Game) {
    this.game = game;
    this.px = Math.random() * 2 - 1;
    this.py = Math.random() * 2 - 1;
    this.vx = this.vy = 0;
    this.ax = this.ay = 0;
    this.sx = this.sy = PARTICLE_SIZE;
    this.canPredict = true;
  }

  reset() {
    this.px = Math.random() * 2 - 1;
    this.py = Math.random() * 2 - 1;
    this.vx = this.vy = 0;
    this.ax = this.ay = 0;
  }

  async predict() {
    if (this.canPredict && this.game.model) {
      this.canPredict = false;
      let pred = this.game.model.predict(
        //@ts-ignore
        tf.tensor2d(
          [this.px, this.py, this.vx, this.vy, this.ax, this.ay],
          [1, 6],
        ),
      );
      //@ts-ignore
      let arr: [number, number, number, number][] = await pred.array();
      this.px = arr[0][0];
      this.py = arr[0][1];
      this.vx = arr[0][2];
      this.vy = arr[0][3];
      this.canPredict = true;
    }
    if (
      this.px > LIMIT_X || this.px < -LIMIT_X || this.py > LIMIT_Y ||
      this.py < -LIMIT_Y
    ) {
      this.reset();
    }
  }

  draw(p: p5) {
    let d = p.createVector(((p.mouseX-p.width/2)/(p.width/2))-this.px,((p.mouseY-p.height/2)/(p.height/2))-this.py).normalize().div(FORCE_DIV);
    this.ax = d.x;
    this.ay = d.y;

    this.predict();

    p.fill(255);
    p.ellipse(
      this.px * p.width / 2,
      this.py * p.height / 2,
      this.sx * p.width,
      this.sy * p.height,
    );
  }
}
