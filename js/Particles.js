// Model
var m;

//Objects Array
objects = [];

// Const
const dt = 0.1;
const lim = 0.99;
const numOfAgents = 10;

function getObject(){
	return [Math.random()*2-1,Math.random()*2-1,0,0,0,0,true];
}

async function getModel(json,weight){
//m = await tf.loadLayersModel('/model/model2/model.json');
m = await tf.loadModel(tf.io.browserFiles([json.files[0], weight.files[0]]));
	 
m.summary();
}

async function predict(obj){
	pred = m.predict(tf.tensor2d([obj[0],obj[1],obj[2],obj[3],obj[4],obj[5]],[1,6]));
	arr = await pred.array();
	obj[0] = arr[0][0];
	obj[1] = arr[0][1];
	obj[2] = arr[0][2];
	obj[3] = arr[0][3];
	obj[6] = true;
}

function setup() {
	createCanvas(800, 800);
	frameRate(30);
	scale(1,-1);
	
	for(i=0;i<numOfAgents;i++){
		objects[i]=getObject();
	}
}

function draw() {
	background(220);
	noStroke();
	fill(255,0,0);
	
	translate(width/2,height/2);
	
	if(m){
		objects.forEach(function(obj) {
			
			ellipse(obj[0]*width/2,obj[1]*height/2,10,10);
			
			if(obj[0]>lim||obj[0]<-lim||obj[1]>lim||obj[1]<-lim){
				obj[0]=Math.random()*2-1;
				obj[1]=Math.random()*2-1;
				obj[2]=obj[3]=0;
			}else{
				if(obj[6]){
					let d = createVector(((mouseX-width/2)/(width/2))-obj[0],((mouseY-height/2)/(height/2))-obj[1]).normalize().div(10);
					obj[4] = d.x;
					obj[5] = d.y;
					obj[6] = false;
					predict(obj);
				}
			}
		});
	}
}