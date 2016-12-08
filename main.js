// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
// The getContext() method on canvas is to give us a context on which we can start to draw.
// The resulting variable (ctx) is the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it.

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball() {
  this.x = random(0,width);
  this.y = random(0,height);
  // x and y coordinates — each ball is initially given a random horizontal and vertical coordinate where it will start on the screen. This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right hand corner).
  this.velX = random(-7,7);
  this.velY = random(-7,7);
  // horizontal and vertical velocity (velX and velY) — each ball is given random values to represent its velocity; in real terms these values will be regularly added to the x/y coordinate values when we start to animate the balls, to move them by this much on each frame.
  this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
  this.size = random(10,20);
  // size — each ball gets a random size, a radius of between 10 and 20 pixels.
}
