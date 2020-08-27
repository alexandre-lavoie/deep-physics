import p5 from 'p5';
import Game from './Game';

const containerElement = document.getElementById('gravity-container');

const sketch = (p: p5) => {
    //@ts-ignore
    const game: Game = new Game(MODEL);

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(30);
    }

    p.draw = () => {
        game.draw(p);
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.mouseClicked = () => {
        game.paused = !game.paused;
    }
};

if(containerElement) {
    new p5(sketch, containerElement);
}
