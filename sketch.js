const  Engine = Matter.Engine,
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

var particle;

var gameState = "play";

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}

function draw() {
  background("black");
  
  Engine.update(engine);

  textSize(20)
  text("Score: "+ score,20,30);
  text("Your Turn: " + turn,600,30);
  
  textSize(30);
  text(500,18,540);
  text(500,94,540);
  text(500,174,540);
  text(500,255,540);

  text(100,333,540);
  text(100,414,540);
  text(100,496,540);

  text(200,576,540);
  text(200,655,540);
  text(200,733,540);

   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

  if(particle!=null){

    particle.display();

    if(particle.body.position.y > 760){

      if(particle.body.position.x < 300){
        score = score+500;
        particle = null;

        if(turn>=5){ 
          gameState = "end";
        }
      }
    

    else

    if(particle.body.position.x > 301 && particle.body.position.x < 600){
        score = score+100;
        particle = null;

        if(turn>=5){ 
          gameState = "end";
        }
    }

    else

    if(particle.body.position.x > 601 && particle.body.position.x < 900){
        score = score+200;
        particle = null;

        if(turn>=5){ 
          gameState = "end";
        }
      }
    }
  }

  if(gameState === "end" && turn>=5){
    textSize(50);
    text("Game Over",270,227);
  }
}

function mousePressed(){
  if(gameState!="end"){
    turn += 1;
    particle = new Particle(mouseX,10,10);
  }
}