import p5 from "p5";
import Entity from './Entity';

export default class Block {
  px: number;
  py: number;
  sx: number;
  sy: number;

  constructor(px: number, py: number, sx: number, sy: number) {
    this.px = px;
    this.py = py;
    this.sx = sx;
    this.sy = sy;
  }

  collidesWith(entity: Entity) {
    return (
      (entity.px + entity.sx * 2 < this.px + this.sx * 2) &&
      (entity.px > this.px) &&
      (entity.py + entity.sy > this.py - this.sy) &&
      (entity.py - entity.sy < this.py + this.sy)
    );
  }

  draw(p: p5) {
    p.fill(255, 229, 0);
    p.rect(this.px * p.width / 2, this.py * p.height / 2, this.sx * p.width, this.sy * p.height);
  }
}
