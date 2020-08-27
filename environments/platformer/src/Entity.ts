import p5 from "p5";
import Game from "./Game";

const GRAVITY = 0.1;
const LIMIT_X = 0.99;
const LIMIT_Y = 0.99;

export default class Entity {
  spawnX: number;
  spawnY: number;
  game: Game;
  px: number;
  py: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  canPredict: boolean;
  sx: number;
  sy: number;

  constructor(game: Game, px: number, py: number, sx: number, sy: number) {
    this.game = game;
    this.spawnX = px;
    this.spawnY = py;
    this.px = px;
    this.py = py;
    this.vx = this.vy = 0;
    this.ax = 0;
    this.ay = GRAVITY;
    this.canPredict = true;
    this.sx = sx;
    this.sy = sy;
  }

  reset() {
    this.px = this.spawnX;
    this.py = this.spawnY;
    this.vx = 0;
    this.vy = 0;
  }

  draw(_: p5) {
    this.predict();
  }

  collidesWith(entity: Entity) {
    return (
      (entity.px + entity.sx * 2 < this.px + this.sx * 2) &&
      (entity.px > this.px) &&
      (entity.py + entity.sy > this.py - this.sy) &&
      (entity.py - entity.sy < this.py + this.sy)
    );
  }

  async predict() {
    if (this.game.model && this.canPredict) {
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

      if (
        this.px > LIMIT_X || this.px < -LIMIT_X || this.py > LIMIT_Y ||
        this.py < -LIMIT_Y
      ) {
        this.reset();
      }
    }
  }
}
