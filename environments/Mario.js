// Constants.
const dt = 0.1;
const lim_x = 0.99;
const lim_y = 0.99;
const gravity = 0.1;
const max_x_velocity = 0.2;
const max_y_velocity = -0.4;
const player_size = 20;

// Game.
var player, blocks, entities;

// Canvas Recorder.
var capturer = new CCapture({
		format: 'png',
		framerate: 30
	});
var recording = false;

// P5js setup()
function setup() {
	createCanvas(800, 800);
	frameRate(30);
	blocks = [new Block(-width / 4, height / 4, width / 2, 20), new Block(-width / 2, 0, width / 4, 20), new Block(width / 4, 0, width / 4, 20)];
}

// P5js draw()
function draw() {
	background(0);
	noStroke();
	translate(width / 2, height / 2);

	entities.forEach(function (entity) {
		entity.isTriggeredByPlayer();
	});
	
	entities.forEach(function (entity) {
		entity.predict();
		entity.draw();
	});
			
	player.predict();
	player.draw();


	blocks.forEach(function (block) {
		block.draw();
	});

	if (keyIsDown(LEFT_ARROW)) {
		player.ax = -0.1;
	} else if (keyIsDown(RIGHT_ARROW)) {
		player.ax = 0.1;
	} else if (keyIsDown(UP_ARROW)) {
		player.ay = -0.1;
	} else {
		player.ax = 0;
		player.ay = gravity;
	}

	if (recording) {
		capturer.capture(document.getElementById('defaultCanvas0'));
	}
}

function resetAll() {
	player.initialize();
	entities.forEach(function (entity) {
		entity.initialize();
	});
}

// Load model from initializer.
function getModel(json, weight) {
	player = new Player(0, 0, player_size, json, weight);
	entities = [new Enemy(0.75, -0.25, player_size * 2, json, weight), new Enemy(-0.75, -0.25, player_size * 2, json, weight)];
}

// Classes.

class Entity {

	constructor(px, py, size, json, weight) {
		this.model = this.getModel(json, weight);
		this.initialX = px;
		this.initialY = py;
		this.initialSize = size;
		this.initialize();
	}

	initalize(){}
	
	async predict() {
		if (this.canPredict) {
			this.canPredict = false;
			let pred = this.model.predict(tf.tensor2d([this.px, this.py, this.vx, this.vy, this.ax, this.ay], [1, 6]));
			let arr = await pred.array();
			this.px = arr[0][0];
			this.py = arr[0][1];
			this.vx = arr[0][2];
			this.vy = arr[0][3];
			this.canPredict = true;
			var tempEntity = this;

			blocks.forEach(function (block) {
				if (block.isTriggeredBy(tempEntity)) {
					tempEntity.vy = 0;
					tempEntity.py = (block.py - block.sy) / (height / 2);
				}
			});

			if (this.px > lim_x || this.px < -lim_x || this.py > lim_y || this.py < -lim_y) {
				this.initialize();
			}
		}
	}

	async getModel(json, weight) {
		this.model = await tf.loadLayersModel(tf.io.browserFiles([json, weight]));
	}
}

class Player extends Entity {
	initialize() {
		this.px = this.initialX;
		this.py = this.initialY;
		this.pz = 0;
		this.vx = this.vy = this.vz = 0;
		this.ax = this.az = 0;
		this.ay = gravity;
		this.sx = this.sy = this.sz = this.initialSize;
		this.canPredict = true;
	}

	draw() {
		fill(255, 255, 255);
		ellipse(this.px * width / 2, this.py * height / 2, this.sx, this.sy);
	}
}

class Enemy extends Player {
	async predict() {
		this.ax = (player.px > this.px) ? 0.03 : -0.03;
		super.predict();
	}

	isTriggeredByPlayer() {
		if (Math.sqrt(Math.pow((this.px * width / 2 + this.sx / 2 - player.px * width / 2 + player.sx / 2), 2) + Math.pow((this.py * height / 2 + this.sy / 2 - player.py * height / 2 + player.sy / 2), 2)) < this.sx / 2 + player.sx) {
			resetAll();
		}
	}

	draw() {
		fill(255, 0, 0);
		ellipse(this.px * width / 2, this.py * height / 2, this.sx, this.sy);
	}
}

class Block {
	constructor(px, py, sx, sy) {
		this.px = px;
		this.py = py;
		this.sx = sx;
		this.sy = sy;
	}

	isTriggeredBy(entity) {
		if ((entity.px * width / 2 + entity.sx < this.px + this.sx) && (entity.px * width / 2 > this.px) && (entity.py * height / 2 + entity.sy / 2 > this.py - this.sy / 2) && (entity.py * height / 2 - entity.sy / 2 < this.py + this.sy / 2))
			return true;
		else
			return false;
	}

	draw() {
		fill(0, 255, 0);
		rect(this.px, this.py, this.sx, this.sy);
	}
}

// For recording.
function keyPressed() {
	switch (key) {
	case 'q'.charCodeAt(0):
		console.log("Start capture");
		capturer.start();
		recording = true;
		break;
	case 'e'.charCodeAt(0):
		console.log("Stop capture");
		capturer.stop();
		capturer.save();
		recording = false;
		break;
	}
}
