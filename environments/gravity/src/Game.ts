import p5 from "p5";
import { Particle } from "./Particle";
import { LayersModel } from "@tensorflow/tfjs";

const NUMBER_OF_PARTICLES = 10;

export default class Game {
  particles: Particle[];
  model: LayersModel | undefined;
  paused: boolean;

  constructor(model: string) {
    this.particles = [];
    this.paused = true;

    for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
      this.particles.push(new Particle(this));
    }

    //@ts-ignore
    tf.loadLayersModel(model).then((model: LayersModel) => {
      this.model = model;
    });
  }

  draw(p: p5) {
    p.background(0);
    p.noStroke();
    
    if(this.paused) {
      p.fill(255);
      p.triangle(p.width/2-5,p.height/2-10,p.width/2+10,p.height/2,p.width/2-5,p.height/2+10);
    } else {
      p.translate(p.width / 2, p.height / 2);
      this.particles.forEach((particle) => particle.draw(p));
    }
  }
}
