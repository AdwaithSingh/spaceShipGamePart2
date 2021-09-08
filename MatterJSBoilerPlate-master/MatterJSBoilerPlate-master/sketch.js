var spaceShip, spaceShipImg;
var bg, bgImg;
var astroid, astroidImg, astroidGroup;
var bullet = 5;
var bulletImg, bulletsGroup;
var score = 0;
var gameState = "fight";
var ammoBelt1, ammoBelt1Img, ammoBelt1Group;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	bgImg = loadImage("spaceGameBg3.jpg");
	
	spaceShipImg = loadImage("spaceShipImg1.png");

	astroidImg = loadImage("astroidImg1.png");

	bulletImg = loadImage("spaceshipBullet1.png");

	ammoBelt1Img = loadImage("ammoBelt1.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	bg = createSprite(displayWidth/2-20,displayHeight/2-40,windowWidth,windowHeight);
	bg.addImage(bgImg)
	bg.scale = 6;

	spaceShip = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
    spaceShip.addImage(spaceShipImg);
    spaceShip.scale = 0.7;
    spaceShip.debug = false;
    spaceShip.setCollider("rectangle",0,0,200,335)

	astroidGroup = new Group();
	bulletsGroup = new Group();
	ammoBelt1Group = new Group();

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  if(gameState === "fight"){

  if(keyDown("RIGHT_ARROW")){
	spaceShip.x = spaceShip.x+15;
  }
  if(keyDown("LEFT_ARROW")){
	spaceShip.x = spaceShip.x-15;
  }

  if(keyWentDown("space")){
	bullets = createSprite(spaceShip.x, spaceShip.y-50, 20, 10);
	bullets.addImage(bulletImg);
	bullets.scale = 1;
	bullets.velocityY = -15;
	bulletsGroup.add(bullets);
	bullet = bullet-1;
  }

  if(bullet === 0){
	gameState = "bullet";
  }

  if(score === 30){
	  gameState = "won";
  }

  if(astroidGroup.isTouching(bulletsGroup)){
	astroidGroup.destroyEach();
	bulletsGroup.destroyEach();
	score = score+2;
  }
  
  if(astroidGroup.isTouching(spaceShip)){
	astroidGroup.destroyEach();
	spaceShip.destroy();
	gameState = "lost";
  }

  if(spaceShip.isTouching(ammoBelt1Group)){
	  bullet = 5;
	  ammoBelt1Group.destroyEach();
  }
  
  spawnAmmo();
  spawnAstroids();
  }
  drawSprites();

textSize(20);
fill("white");
text("BULLETS = " + bullet, displayWidth-210, displayHeight/2-250);
text("SCORE = " + score, displayWidth-200, displayHeight/2-220);

if(gameState === "lost"){
	textSize(100);
	fill("red");
	text("U LOST ", 730, 400);
	astroidGroup.destroyEach();
	spaceShip.destroy();
  }
  
  else if(gameState === "won"){
	textSize(100);
	fill("yellow");
	text("U WON ", 730, 400);
	astroidGroup.destroyEach();
	spaceShip.destroy();
  }
  
  else if(gameState === "bullet"){
	textSize(100);
	fill("blue");
	text("U RAN OUT OF BULLETS ", 400, 400);
	astroidGroup.destroyEach();
	spaceShip.destroy();
	bulletsGroup.destroyEach();
  }
 
}

function spawnAstroids(){
	if(frameCount%250===0){
	  astroid = createSprite(random(80,1400),10, 30, 30);
	  astroid.addImage(astroidImg);
	  astroid.scale = 0.8;
	  astroid.velocityY = 5;
	  astroidGroup.add(astroid);
	  astroid.lifetime = 280;
	  astroid.debug = false;
	  astroid.setCollider("rectangle",0,0,180,180)
  
	}
  }

  function spawnAmmo(){
	  if(frameCount%1100===0){
		  ammoBelt1 = createSprite(random(80,1400),10,30,30);
		  ammoBelt1.addImage(ammoBelt1Img);
		  ammoBelt1.scale = 0.5;
		  ammoBelt1.velocityY = 10;
		  ammoBelt1.lifetime = 280;
		  ammoBelt1.debug = true;
		  ammoBelt1.setCollider("rectangle",0,0,180,180);
		  ammoBelt1Group.add(ammoBelt1);
	  }
  }



