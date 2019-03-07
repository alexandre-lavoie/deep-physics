# Deep-Physics
Deep-Physics is a compact TensorFlow model trained to recreate intuitive physics. Deep-Physics allows for a simple generation of dynamic environments without the use of any classical physics formulas.

# Usage
Deep-Physics can be applied to any environment. We chose to provide users with a simple javascript implementation using TensorFlow.js and P5.js. Simply clone the repository and run the index.html.

# Model
Deep-Physics is an ever expandable model. The current implementation considers position, velocity, and acceleration.

### Model 2
Second prototype with one hour of training. Inputs a 6 dimensional vector [px,py,vx,vy,ax,ay] and outputs a 4 dimensional vector [px,py,vx,vy].

### Model 1
First prototype with very small training. Inputs a 6 dimensional vector [px,py,vx,vy,ax,ay] and outputs a 4 dimensional vector [px,py,vx,vy].

# Research Paper
A work in progress research paper can be found here: https://www.overleaf.com/read/jmwjtzdhqrvz.

# Provided Environments

### Particle.js

Uses the mouse pointer as an acceleration point. Example uses Model 2.

![alt text](https://github.com/alexandre-lavoie/deep-physics/blob/master/images/Particle.gif?raw=true)

### Projectile.js

Acceleration system with random initial conditions. Example uses Model 2.

![alt text](https://github.com/alexandre-lavoie/deep-physics/blob/master/images/Projectile.gif?raw=true)

# TODO
* Create a sun, planet, and satellite environment.
* Consider more factors (attraction, friction, rotation, shape) for the model.
* Consider collisions with other objects by adding another object in the input layer.

# Credits and Acknowledgment

Research project made by Alexandre Lavoie and James Kary from Vanier College, QC, Canada. We want to thank Prof. Ivan Ivanov for his guidance in the field.