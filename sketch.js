var trex,ground1,restartbutton,gameOver,gameState,score,clouds,cloud1,obsticle1,select,obsticles,planes,invisibleground;
var cloudImage,gameOverImage,grd1,ob1,ob2,ob3,ob4,ob5,ob6,restartImage,trexRunning,trexColiding;
function preload(){
  cloudImage=loadImage("cloud.png");
  gameOverImage=loadImage("gameOver.png")
grd1=loadImage("ground2.png")
ob1=loadImage("obstacle1.png")
ob2=loadImage("obstacle2.png")
ob3=loadImage("obstacle3.png")
ob4=loadImage("obstacle4.png")
ob5=loadImage("obstacle5.png")
ob6=loadImage("obstacle6.png")
restartImage=loadImage("restart.png")
trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png")
trexcoliding=loadAnimation("trex_collided.png")
}
function setup(){
  createCanvas(windowWidth,windowHeight)

trex = createSprite(32, 348);
trex.addAnimation("trex",trexRunning)
trex.addAnimation("trexcoliding",trexcoliding)
  trex.scale = 0.5
trex.setCollider("circle",0,0,40)
 ground1 = createSprite(0, 360,400,10);
ground1.addImage(grd1)
 invisibleground=createSprite(0,380,400,10)
  invisibleground.visible=false
  restartbutton = createSprite(200, 200);
restartbutton.addImage(restartImage)
restartbutton.visible=false
 gameOver = createSprite(200, 100);
gameOver.addImage(gameOverImage)
gameOver.scale = 3.5
  gameOver.visible=false
 score = 0
 gameState= "Play"

 clouds = new Group();
 obsticles = new Group();
 planes = new Group();
}
function draw() {
background("white")
textSize(20)
text("Score"+score,300,139)

if (gameState=="Play") {
ground1.velocityX = -(6+score/100)
 if (ground1.x<0) {
    ground1.x=ground1.width/2
  }
score=score+Math.round(frameCount/60)

if (touches.length>0||keyDown("space")&&trex.y>330){
  trex.velocityY = -10
//playSound("sound://category_jump/arcade_game_jump_1.mp3");
touches=[]
}
 
trex.collide(invisibleground);  
 
  cloud()
obstacle()
if (trex.isTouching(obsticles)) {
 //playSound("sound://category_hits/8bit_splat.mp3");
 
 obsticles.setVelocityXEach(0)
clouds.setVelocityXEach(0)
 restartbutton.visible=true
gameOver.visible=true
ground1.velocityX=0
 trex.changeAnimation("trexcoliding",trexcoliding)

gameState="end"
}
}
else if (gameState=="end") {
  obsticles.destroyEach()  
 clouds.destroyEach() 
  obsticles.setLifetimeEach(-1)
clouds.setLifetimeEach(-1)
 
 if (mousePressedOver(restartbutton)||touches.length>0) {
   touches=[]
   gameState="Play"
 score = 0
 gameOver.visible=false  
 restartbutton.visible=false
trex.changeAnimation("trex",trexRunning)
   
 }
 
}


  trex.velocityY=trex.velocityY+0.8 
trex.collide(ground1)
drawSprites();
}
function cloud() {
 if (frameCount%60==0 ) {
   
 
 
 cloud1 = createSprite(400, Math.round(random(60,250)));
   cloud1.addImage(cloudImage)
  cloud.scale = 0.4
  cloud1.velocityX = -(10+score/100)
clouds.add(cloud1);
  cloud1.lifetime=60
   
 }
  
}
function obstacle() {
  if (frameCount%80==0 ) {
 obstacle1 = createSprite(400, 350);
 select=Math.round(random(1,6));
 switch(select){
   case 1:obstacle1.addImage(ob1);
     break; 
  case 2:obstacle1.addImage(ob2);
     break; 
  case 3:obstacle1.addImage(ob3);
     break; 
  case 4:obstacle1.addImage(ob4);
     break; 
  case 5:obstacle1.addImage(ob5);
     break; 
  case 6:obstacle1.addImage(ob6);
     break; 
     default:   break;
 }
 obstacle1.velocityX = -(6+score/100);
 obstacle1.scale = 0.6;
    obstacle1.depth=trex.depth;
  trex.depth=trex.depth+1;
   obsticles.add(obstacle1);
   obstacle1.lifetime=66;
  }
     
}
