function startDeepPhysics(){
	var js = document.createElement("script");
	js.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js";
	document.head.appendChild(js);
	
	var js = document.createElement("script");
	js.src = "./environments/" + document.getElementById('enviroment-name').value + ".js";
	document.head.appendChild(js);	
	
	var json = document.getElementById('upload-json').files[0];
	var weights = document.getElementById('upload-weights').files[0];
	
	js.onload = function() { getModel(json,weights); };
	
	document.getElementById('load').remove();
}