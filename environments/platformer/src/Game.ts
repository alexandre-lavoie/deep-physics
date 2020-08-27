import p5 from "p5";
import { LayersModel } from "@tensorflow/tfjs";
import Player from "./Player";
import Enemy from "./Enemy";
import Block from "./Block";

export default class Game {
  model: LayersModel | undefined;
  player: Player;
  enemies: Enemy[];
  blocks: Block[];
  score: number;
  highscore: number;
  paused: boolean;
  GRAVITY: number = 0.1;

  constructor(model: string) {
    this.score = 0;
    this.highscore = 0;
    this.paused = true;
    this.blocks = [
      new Block(-0.5, 0.25, 0.5, 0.02),
      new Block(-1, 0, 0.25, 0.02),
      new Block(0.5, 0, 0.25, 0.02),
    ];
    this.player = new Player(this, 0, 0);
    this.enemies = [
      new Enemy(this, 0.75, -0.25),
      new Enemy(this, -0.75, -0.25),
    ];

    //@ts-ignore
    tf.loadLayersModel(model).then((model: LayersModel) => {
      this.model = model;
    });
  }

  reset() {
    if (this.score > this.highscore) {
      this.highscore = this.score;
    }

    this.score = 0;

    this.player.reset();
    this.enemies.forEach((e) => e.reset());
  }

  draw(p: p5) {
    p.background(0);
    p.noStroke();
    
    if(this.paused) {
      p.fill(255);
      p.triangle(p.width/2-5,p.height/2-10,p.width/2+10,p.height/2,p.width/2-5,p.height/2+10);
    } else {
      p.translate(p.width / 2, p.height / 2);
      p.textSize(18);
      p.text(this.score, 0, 0);

      if (p.frameCount % 60 === 0) {
        this.score++;
      }

      this.blocks.forEach((b) => b.draw(p));
      this.player.draw(p);
      this.enemies.forEach((e) => e.draw(p));
    }
  }
}
