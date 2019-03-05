// Model
var m;

// Objects Array
objects = [];

// Constants

const dt = 0.1;
const lim = 0.99;
const numOfAgents = 10;
const accy = 0.1;

// Getting Object Initial Conditions

function getObject(){
	return [-lim+0.01,Math.random()*2-1,Math.random()*0.2,(Math.random()*2-1)*0.2,0,accy,true]; // [px,py,vx,vy,ax,ay,canPredict?]
}

function getObjects(){
	temp=[];
	for(i=0;i<numOfAgents;i++){
		temp[i]=getObject();
	}
	return temp;
}

// Load Model

async function getModel(json,weight){
m = await tf.loadModel(tf.io.browserFiles([json.files[0], weight.files[0]]));
}

// Predict with Loaded Model

async function predict(obj){
	obj[6] = false;
	pred = m.predict(tf.tensor2d([obj[0],obj[1],obj[2],obj[3],obj[4],obj[5]],[1,6]));
	arr = await pred.array();
	obj[0] = arr[0][0];
	obj[1] = arr[0][1];
	obj[2] = arr[0][2];
	obj[3] = arr[0][3];
	obj[6] = true;
}

// P5JS

function setup() {
	createCanvas(800, 800);
	frameRate(30);
	scale(1,-1);
	
	objects=getObjects();
}

function draw() {
	background(0);
	noStroke();
	fill(255,0,0);
	translate(width/2,height/2);
	
	if(m){
		objects.forEach(function(obj) {
			
			ellipse(obj[0]*width/2,obj[1]*height/2,10,10);
			
			if(obj[0]>lim||obj[0]<-lim||obj[1]>lim||obj[1]<-lim){
				obj[0] = -lim+0.01;
				obj[1] = Math.random()*2-1;
				obj[2] = Math.random()*0.2;
				obj[3] = (Math.random()*2-1)*0.2;
			}else{
				if(obj[6]){
					predict(obj);
				}
			}
		});
	}
}

function keyTyped(){
	if(key === 's'){
		saveCanvas("Particle", "png");
	}
}