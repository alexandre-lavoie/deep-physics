// Objects Array.
objects = [];

// Constants.
const dt = 0.1;
const lim_x = 0.99;
const lim_y = 0.99;
const max_agents = 10;
const gravity = 0.1;
const max_x_velocity = 0.2;
const max_y_velocity = -0.4;
const particle_size = 20;

// Canvas Recorder.
var capturer = new CCapture({ format: 'png', framerate: 30 });
var recording = false;

// P5js setup()
function setup() {
	createCanvas(800, 800);
	frameRate(30);
}

// P5js draw()
function draw() {
	background(0);
	noStroke();
	translate(width/2,height/2);
	objects.forEach(function(obj) {
		if(obj.model){
			obj.predict();
			obj.draw();
		}
	});
	if(recording){
		capturer.capture(document.getElementById('defaultCanvas0'));
	}
}

// Load model from initializer.
function getModel(json, weight){
	for(i=0;i<max_agents;i++){
		objects[i]=new Particle();
		objects[i].getModel(json,weight);
	}
}

// Class system for objects.
class Particle{
	
	constructor(){
		this.model=null;
		this.color = [Math.random()*255,Math.random()*255,Math.random()*255];
		this.initialize();
	}
	
	initialize(){
		this.px=-lim_x+0.01;
		this.py=0;
		this.pz=Math.random()*2-1;
		this.vx=Math.random()*max_x_velocity;
		this.vy=Math.random()*max_y_velocity;
		this.vz=0;
		this.ax=this.az=0;
		this.ay=gravity;
		this.sx=this.sy=this.sz=particle_size;
		this.canPredict = true;
	}
	
	async predict(){
		if(this.canPredict){
			this.canPredict=false;
			let pred = this.model.predict(tf.tensor2d([this.px,this.py,this.vx,this.vy,this.ax,this.ay],[1,6]));
			let arr = await pred.array()
			this.px = arr[0][0];
			this.py = arr[0][1];
			this.vx = arr[0][2];
			this.vy = arr[0][3];
			this.canPredict=true;
		}
		if(this.px>lim_x||this.px<-lim_x||this.py>lim_y||this.py<-lim_y){
			this.initialize();
		}
	}
	
	draw(){
		fill(this.color[0],this.color[1],this.color[2]);
		ellipse(this.px*width/2,this.py*height/2,this.sx,this.sy);
	}
	
	async getModel(json,weight){
		this.model = await tf.loadLayersModel(tf.io.browserFiles([json, weight]));
	}
}

// For recording.
function keyPressed(){
	if(key === "s"){
		console.log("Start capture");
		capturer.start();
		recording = true;
	}else if(key === "t"){
		console.log("Stop capture");
		capturer.stop();
		capturer.save();
		recording = false;
	}
}