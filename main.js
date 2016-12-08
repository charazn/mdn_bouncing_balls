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

function Shape() {
  this.x = random(0,width);
  this.y = random(0,height);
  this.velX = random(-7,7);
  this.velY = random(-7,7);
  this.exists = true;
}

function Ball(x, y, velX, velY, exists) {
  Shape.call(this, x, y, velX, velY, exists);

  this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
  this.size = random(10,20);
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, exists);

  this.color = 'white';
  this.size = 10;
  this.velX = 20;
  this.velY = 20;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;


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

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
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

Ball.prototype.collisionDetect = function() {
  for(j = 0; j < balls.length; j++) {
    // For each ball, we need to check every other ball to see if it has collided with the current ball. To the end, we open up another for loop to loop through all the balls in the balls[] array.
    if( (!(this.x === balls[j].x && this.y === balls[j].y && this.velX === balls[j].velX && this.velY === balls[j].velY)) ) {
      // Immediately inside our for loop, we use an if statement to check whether the current ball being looped through is the same ball as the one we are currently checking. We don't want to check whether a ball has collided with itself! To do this, we check whether the current ball's x/y coordinates and current velocity are the same as the loop ball. We then use ! to negate the check, so that the code inside the the if statement only runs if they are not the same.
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      // We then use a common algorithm to check the collision of two circles. We are basically checking whether any of the two circle's areas overlap. This is explained further in 2D collision detection.
      // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
      // Circle Collision
      // Another simple shape for collision detection is between two circles. This algorithm works by taking the centre points of the two circles and ensuring the distance between the centre points are less than the two radii added together.
      //
      // var circle1 = {radius: 20, x: 5, y: 5};
      // var circle2 = {radius: 12, x: 10, y: 5};
      //
      // var dx = circle1.x - circle2.x;
      // var dy = circle1.y - circle2.y;
      // var distance = Math.sqrt(dx * dx + dy * dy);
      //
      // if (distance < circle1.radius + circle2.radius) {
      //     // collision detected!
      // }

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
      // If a collision is detected, the code inside the inner if statement is run. In this case we are just setting the color property of both the circles to a new random color. We could have done something far more complex, like get the balls to bounce off each other realistically, but that would have been far more complex to implement. For such physics simulations, developers tend to use a games or physics library such as PhysicsJS, matter.js, Phaser, etc.
    }
  }
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
    balls[i].collisionDetect();
  }
  // loops through all the balls in the balls array, and runs each ball's draw() and update() function to draw each one on the screen, then do the necessary updates to position and velocity in time for the next frame.

  requestAnimationFrame(loop);
  // Runs the function again using the requestAnimationFrame() method — when this method is constantly run and passed the same function name, it will run that function a set number of times per second to create a smooth animation. This is generally done recursively — which means that the function is calling itself every time it runs, so it will run over and over again.
}

loop();
