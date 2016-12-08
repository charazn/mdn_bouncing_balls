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

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  // Checking to see whether the x coordinate is greater than the width of the canvas (the ball is going off the right hand edge).

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  // Checking to see whether the x coordinate is smaller than 0 (the ball is going off the left hand edge).

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  // Checking to see whether the y coordinate is greater than the height of the canvas (the ball is going off the bottom edge).

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  // Checking to see whether the y coordinate is smaller than 0 (the ball is going off the top edge).

  // The first four parts of the function check whether the ball has reached the edge of the canvas. If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction. So for example, if the ball was traveling upwards (positive velX), then the horizontal velocity is changed so that it starts to travel downwards instead.

  // In each case, we are including the size of the ball in the calculation because the x/y coordinates are in the center of the ball, but we want the edge of the ball to bounce off the perimeter — we don't want the ball to go halfway off the screen before it starts to bounce back.

  this.x += this.velX;
  this.y += this.velY;
  // The last two lines add the velX value to the x coordinate, and the velY value to the y coordinate — the ball is in effect moved each time this method is called.
}

var balls = [];

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  // Sets the canvas fill color to semi-transparent black, then draws a rectangle of the color across the whole width and height of the canvas, using fillRect() (the four parameters provide a start coordinate, and a width and height for the rectangle drawn). This serves to cover up the previous frame's drawing before the next one is drawn. If you don't do this, you'll just see long snakes worming their way around the canvas instead of balls moving! The color of the fill is set to semi-transparent, rgba(0,0,0,0.25), to allow the previous few frames to shine through slightly, producing the little trails behind the balls as they move. If you changed 0.25 to 1, you won't see them at all any more. Try varying this number to see the effect it has.

  while(balls.length < 25) {
    var ball = new Ball();
    balls.push(ball);
  }

  for(i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }
  // loops through all the balls in the balls array, and runs each ball's draw() and update() function to draw each one on the screen, then do the necessary updates to position and velocity in time for the next frame.

  requestAnimationFrame(loop);
  // Runs the function again using the requestAnimationFrame() method — when this method is constantly run and passed the same function name, it will run that function a set number of times per second to create a smooth animation. This is generally done recursively — which means that the function is calling itself every time it runs, so it will run over and over again.
}

loop();
