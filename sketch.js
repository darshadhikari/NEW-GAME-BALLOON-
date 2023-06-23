var bg,bgimg;
var player, shooterImg, shooter_shooting;
var balloon,balloonimg,balloongroup;
var gameOverImg,gameOver,restartImg,restart;
var gameState=PLAY;
var PLAY=1
var END=0

function preload(){
    bgimg = loadImage("assets/bg.png");
    balloonimg = loadImage("assets/obsTop1.png");
    shooterImg = loadImage("assets/shooter_2.png");
    shooter_shooting = loadImage("assets/shooter_3.png");
    gameOverImg = loadImage("assets/gameOver.png");
    restartImg  = loadImage("assets/restart.png");
}

function setup(){
createCanvas(400,400);

bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgimg);
bg.scale = 1.1;

player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300);

   balloon = createSprite(100,200,20,50);
   balloon.addAnimation("balloon",balloonimg);
   balloon.scale = 0.2;
   balloon.velocityX=-3;
   balloon.debug=true;
balloon.setCollider("rectangle",0,0,400,400);
balloon.lifetime=400;
balloongroup=new Group();
balloongroup.add(balloon);

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite(300,140);
restart.addImage(restartImg);

gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible=false;
  restart.visible=false;


}

function draw(){
background(0);

if(gameState===PLAY){
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30;
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y+30;
   }

   if(keyWentDown("space")){
    player.addImage(shooter_shooting);
  }

  if(balloongroup.isTouching(player)){
 

    for(var i=0;i<balloongroup.length;i++){     
         
     if(balloongroup[i].isTouching(player)){
          balloongroup[i].destroy()
          gameState=END;
          } 
    }
   }
}

if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
}


if (gameState=restart){
  gameState=PLAY;
}


 

spawnBalloons();

   drawSprites();
}


function spawnBalloons(){


      if(World.frameCount % 60 === 0) {
        balloon = createSprite(400,50,40,50);
    
    balloon.addImage(balloonimg);
    
    balloon.scale = 0.1;
    balloon.velocityX = -4;

   
    balloon.y = Math.round(random(10,100));
}
}