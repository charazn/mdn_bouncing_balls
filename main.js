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

Ball.prototype.draw = function() {
  ctx.beginPath(); // we use beginPath() to state that we want to draw a shape on the paper
  ctx.fillStyle = this.color; // we use fillStyle to define what color we want the shape to be — we set it to our ball's color property.
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  // Next, we use the arc() method to trace an arc shape on the paper. Its parameters are:
  // The x and y position of the arc's center — we are specifying our ball's x and y properties.
  // The radius of our arc — we are specifying our ball's size property.
  // The last two parameters specify the start and end number of degrees round the circle that the arc is drawn between. Here we specify 0 degrees, and 2 * PI, which is the equivalent of 360 degrees in radians (annoyingly, you have to specify this in radians). That gives us a complete circle. If you had specified only 1 * PI, you'd get a semi-circle (180 degrees).
  ctx.fill(); // we use the fill() method, which basically states "finish drawing the path we started with beginPath(), and fill the area it takes up with the color we specified earlier in fillStyle."
}
