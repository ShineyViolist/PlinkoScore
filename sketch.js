const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score = 0;
var particle;
var count = 0;
var gameState = "start"
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,10);

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
  textSize(20)
  stroke("white");
  text("Score : "+score,20,30);
  text("500",25,600);
  text("500",105,600);
  text("500",185,600);
  text("500",265,600);
  text("100",345,600);
  text("100",425,600);
  text("100",505,600);
  text("200",585,600);
  text("200",665,600);
  text("200",745,600);

  stroke("yellow");
  line(0,450,800,450);

  Engine.update(engine);
 
  
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
     
  }
   
  for (var k = 0; k < divisions.length; k++) {
     
    divisions[k].display();
  }



  if(particle != null){

    particle.display();

    if(particle.body.position.y > 760){

      if(particle.body.position.x < 300){
        score = score + 500;
        particle = null;

        if(count >= 5){
          gameState = "end";
        }

    }else if(particle.body.position.x > 301 && particle.body.position.x < 600){
        score = score + 100;
        particle = null;

        if(count >= 5){
          gameState = "end";
        }

      }else if(particle.body.position.x > 601){
        score = score + 200;
        particle = null;

        if(count >= 5){
          gameState = "end";
        }
      }
    }
  }


  if(gameState == "end"){
    stroke("white");
    text("Game Over",400,400);
  }
  //console.log(gameState)
  ground.display();

}

function mousePressed(){
  if(gameState !== "end"){
    count++;
    particle = new Particle(mouseX,-10,10);
  }
}