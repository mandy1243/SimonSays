// define varaibles as arrays
var attractors = [];
var particles = [];

// setup background and width/height of canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
}

// when mouse is pressed a new attractor is placed
function mousePressed() {
  attractors.push(createVector(mouseX, mouseY));
}

// draws the main function of the random particles automatically. 
// Calls for mousePressed by drawing what is attractor 
// Calls for functions in particle.js
function draw() {
  stroke(255);
  strokeWeight(2);
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 100) {
    particles.splice(0, 1);
  }

  for (var i = 0; i < attractors.length ; i++) { //attractors.length
    stroke("C7FBFF");
    point(attractors[i].x, attractors[i].y);
  }
  for (var i = 0; i < particles.length; i++) { //particles.length
    var particle = particles[i];
    for (var j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }
    particle.update();
    particle.show();
  }
}