const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

var divisions = [];
var particles = [];
var plinkos = [];

var divisionHeight = 300;
var score = 0;
var turn = 0;

var particle, base;

var gameState = "play";

localStorage["HighestScore"] = 0;

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height, width, 20);
  base = new Divisions(width / 2, height - 5, width, 10);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(
      new Divisions(k, height - divisionHeight / 2, 10, divisionHeight)
    );
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("black");

  Engine.update(engine);

  fill("white");
  textSize(20);
  text("Score: " + score, 195, 30);
  text("Your Turn: " + turn, 600, 30);

  if(gameState === "play"){
    text("You have only 5 turns", 330, 30);
  } else{
    text("Tap anywhere to Retry", 342, 30);
  }
  
  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }

  text("High Score: " + localStorage["HighestScore"], 20, 30);

  textSize(30);
  text(500, 18, 540);
  text(50, 95, 540);
  text(10, 174, 540);
  text(300, 255, 540);

  text(100, 333, 540);
  text(50, 414, 540);
  text(20, 496, 540);

  text(200, 576, 540);
  text(10, 655, 540);
  text(500, 733, 540);

  base.display();

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if (particle != null) {
    particle.display();

    if (particle.body.position.y > 760) {
      if (particle.body.position.x < 83) {
        score = score + 500;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      } else if (
        particle.body.position.x > 93 &&
        particle.body.position.x < 163
      ) {
        score = score + 50;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      } else if (
        particle.body.position.x > 173 &&
        particle.body.position.x < 243
      ) {
        score = score + 10;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      } else if (
        particle.body.position.x > 253 &&
        particle.body.position.x < 323
      ) {
        score = score + 300;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      } else if (
        particle.body.position.x > 333 &&
        particle.body.position.x < 403
      ) {
        score = score + 100;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      } else if (
        particle.body.position.x > 413 &&
        particle.body.position.x < 483
      ) {
        score = score + 50;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      } else if (
        particle.body.position.x > 493 &&
        particle.body.position.x < 563
      ) {
        score = score + 20;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      }
      else if (
        particle.body.position.x > 573 &&
        particle.body.position.x < 643
      ) {
        score = score + 200;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      }
      else if (
        particle.body.position.x > 653 &&
        particle.body.position.x < 723
      ) {
        score = score + 10;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      }
      else if (
        particle.body.position.x > 733 &&
        particle.body.position.x < 803
      ) {
        score = score + 500;
        particle = null;

        if (turn >= 5) {
          gameState = "end";
        }
      }
    }
  }

  if (turn >= 5) {
    gameState = "end";
  }

  if (gameState === "end" && turn >= 5) {
    textSize(50);
    text("Game Over", 270, 238);
  }

  // console.log(mouseY);
}

function mousePressed() {
  if (gameState != "end" && mouseX > 55 && mouseX < 720 && mouseY <= 60) {
    turn += 1;
    particle = new Particle(mouseX, 10, 10);
  } else{
    gameState = "play";
    turn = 0;
    score = 0;
  }
}
