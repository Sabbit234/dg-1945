var bg_s, bg_g;
var player, playerImg;
var bullet_e, bulletImg;
var missile, missile_e, missileImg, missile_e_img;
var fireBall, fireBall_img;

var gameState_s, gameState_g, gameState_d;

var level;

var bossFight;

var gameOver, gameOver_img;
var missionComplete, missionComplete_img;

var bg;

var enemy, enemyImg;

var trig1, trig2;

var health = 200;
var maxHealth = 100;

var health_e = 1000;
var maxHealth_e = 500

var bullets_p, bullets_e;
var missiles, missiles_e;

var playerAlive = true;

var enemyAlive = true;




function preload()
{
  playerImg = loadImage("Assets/TBM-3.png")
  bulletImg = loadImage("Assets/Bullets_01.png")
  missileImg = loadImage("Assets/missile_01.png")
  missile_e_img = loadImage("Assets/missile_02.png")
  fireBall_img = loadImage("Assets/fireBall_01.png")

  bg_s         = loadImage("Assets/Backgrounds/BG_04.png")
  bg_g         = loadImage("Assets/Backgrounds/BG_07.png")

  gameOver_img = loadImage("Assets/Game Over.png")
  missionComplete_img = loadImage("Assets/Mission accomplished.png")

  enemyImg = loadImage("Assets/Enemy_FighterJet_Ba.png")
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  gameState_s = true;
  gameState_g = false



  if (gameState_s == true)
{

  player = createSprite(width/2, height/2 + 270);
  player.addImage("player", playerImg);
  player.scale = 0.5;

 enemy = createSprite(windowWidth/2+600 , windowHeight/2 - 300);
  enemy.addImage("enemy", enemyImg);
  enemy.scale = 0.6 

trig1 = createSprite(windowWidth, windowHeight-650)
trig1.scale = 0.7;
trig1.visible = false;

trig2 = createSprite(windowWidth/100, windowHeight-650)
trig2.scale = 0.7;
trig2.visible = false;

bullets_p = createGroup()
bullets_e = createGroup()

gameOver = createSprite(width/2, height/2);
gameOver.addImage("GameOver", gameOver_img);
gameOver.visible = false;

missionComplete = createSprite(width/2, height/2);
missionComplete.addImage("MissionComplete", missionComplete_img);
missionComplete.scale = 0.7
missionComplete.visible = false;

missiles_e = createGroup()

fireBalls = createGroup()
}

}


function draw() {
  background(bg_s, windowWidth, windowHeight);  

 

  textSize (70)
  text("Dogfight 1945", width/2 - 190, height/2 - 195)

  textSize (30)
  text("Press 0 to start", width/2 - 80, height/2 + 210)


  if(keyWentDown ("0"))
  {
  gameState_g = true
  level = 0
  
  }

  if(keyWentDown("1"))
  {
    gameState_g = true
    level = 1
  }




  if (gameState_g == true)
{
  background(bg_g, windowWidth, windowHeight);  


//Health Bar



  
  playerController()
 

  enemyController()

  if(playerAlive === true)
  {
  spawnBullets_p()
  gameState_d = false
  updateHealth()
  }

  //spawnBullets_e()
 //updateHealth()
 
 //Bullets
  bullets_e.collide(player, (bullet, plr)=> 
    {
     console.log(health)
      if(health > 0)
      {
      health -= 5;
      } else 
      {
        plr.remove()
        playerAlive = false;
        
      }
      bullet.remove()
  }) 
 
  //Missiles
   
  
  missiles_e.isTouching(player, (missile, plr)=> 
  {
   console.log(health)
   if(level === 0)
   {
    if(health > 0)
    {
    health -= 45;
    } else 
    {
      plr.remove()
      playerAlive = false;
      
    }
    missile.remove()
  }
   
  if(level === 1)
  {
    if(health > 0)
    {
    health -= 200;
    } else 
    {
      plr.remove()
      playerAlive = false;
      
    }
    missile.remove()
  }

})



//Enemy Damage
if(enemyAlive === true)
  {
    enemyController()
    updateHealth_e()
  }

  //spawnBullets_e()
 
 //Bullet
  bullets_p.collide(enemy, (bullet, enm)=> 
    {
     console.log(health_e)

     if(level === 0)
     {
      if(health_e > 0)
      {
      health_e -= 5;
      } else 
      {
        enm.remove()
        enemyAlive = false;
        
      }
      bullet.remove()
    }

    if(level === 1)
    {
      if(health_e > 0)
      {
      health_e -= 0.5;
      } else 
      {
        enm.remove()
        enemyAlive = false;
        
      }
      bullet.remove()
    }

  }) 
 
  //Missiles

  /* missiles.isTouching(enemy, (missile, enm)=> 
  {
   console.log(health_e)
    if(health_e > 0)
    {
    health_e -= 45;
    } else 
    {
      enm.remove()
      enemyAlive = false;
      
    }
    missile.remove()
}) */





  // health bar enemy
  if(health_e <= 0)
{
  missionComplete.visible = true
  missiles_e.destroyEach()
  fireBalls.destroyEach()


}


  drawSprites();
}
}


function playerController ()
{

  // Locomotion

   if(keyDown(RIGHT_ARROW))
   {
    player.x = player.x + 8
   }

   if(keyDown(LEFT_ARROW))
   {
    player.x = player.x - 8
   }

   if(keyDown(UP_ARROW))
   {
    player.y = player.y - 6
   }

   if(keyDown(DOWN_ARROW))
   {
    player.y = player.y + 6
   }

   //Attacks

   if(keyWentDown("space"))
   {
    // Right wing
     missile = createSprite(player.x + 39, player.y - 29);
     missile.addImage("missile", missileImg)
     missile.scale = 0.08;
     missile.velocityY = -8;
     missile.lifetime = 80;
     
     // Left Wing
     missile = createSprite(player.x - 39, player.y - 29);
     missile.addImage("missile", missileImg)
     missile.scale = 0.08;
     missile.velocityY = -8;
     missile.lifetime = 80;
   

   }


}



function spawnBullets_p () 
{ 
  if(frameCount % 4 === 0) 
  {
  bullet_p = createSprite(player.x + 37, player.y - 29)
  bullet_p.addImage ("bullet", bulletImg)
  bullet_p.scale = 0.09
  bullet_p.velocityY = -30;
  bullet_p.lifetime = 30;
  bullets_p.add(bullet_p);

  bullet_p = createSprite(player.x - 37, player.y - 29)
  bullet_p.addImage ("bullet", bulletImg)
  bullet_p.scale = 0.09
  bullet_p.velocityY = -30;
  bullet_p.lifetime = 30;
  bullets_p.add(bullet_p);

}
}


function spawnBullets_e () 
{ 
  if(frameCount % 30)
  {
  if(frameCount % 6 === 0) 
  {
  bullet_e = createSprite(enemy.x + 33, enemy.y + 68)
  bullet_e.addImage ("bullet", bulletImg)
  bullet_e.scale = 0.09
  bullet_e.velocityY = 30;
  bullet_e.lifetime = 30;
  bullets_e.add(bullet_e);

  bullet_e = createSprite(enemy.x - 33, enemy.y + 68)
  bullet_e.addImage ("bullet", bulletImg)
  bullet_e.scale = 0.09
  bullet_e.velocityY = 30;
  bullet_e.lifetime = 30;
  bullets_e.add(bullet_e);




  }
}
}

function enemyController () 
{
// locomotion

  if(enemy.isTouching(trig1)) 
  {
    enemy.velocityX = -4
  }

  if(enemy.isTouching(trig2)) 
  {
    enemy.velocityX = 4
  }


//Attack

//For level 0 difficulty

if(level === 0)
{
if(frameCount % 40 === 0) 
{
     // Right wing
     missile_e = createSprite(enemy.x + 50, enemy.y + 68);
     missile_e.addImage("missile2", missile_e_img)
     missile_e.scale = 0.08;
     missile_e.velocityY = +8;
     missile_e.lifetime = 80;
     missiles_e.add(missile_e);
     
     // Left Wing
     missile_e = createSprite(enemy.x - 50, enemy.y + 68);
     missile_e.addImage("missile2", missile_e_img)
     missile_e.scale = 0.08;
     missile_e.velocityY = +8;
     missile_e.lifetime = 80;
     missiles_e.add(missile_e);
}
}

// For level 1 difficulty

if(level === 1)
{
  if(frameCount % 20 === 0) 
{
     // Right wing
     missile_e = createSprite(enemy.x + 50, enemy.y + 68);
     missile_e.addImage("missile2", missile_e_img)
     missile_e.scale = 0.08;
     missile_e.velocityY = +10;
     missile_e.lifetime = 80;
     missiles_e.add(missile_e);
     
     // Left Wing
     missile_e = createSprite(enemy.x - 50, enemy.y + 68);
     missile_e.addImage("missile2", missile_e_img)
     missile_e.scale = 0.08;
     missile_e.velocityY = +10;
     missile_e.lifetime = 80;
     missiles_e.add(missile_e);
}
}
  
 if(frameCount % 500 === 0)
 {

   fireBall = createSprite(enemy.x, enemy.y + 30);
   fireBall.addImage("fireBall", fireBall_img)
   fireBall.scale = 0.09;
   fireBall.velocityY = 5;
   fireBall.lifetime = 90;
   fireBalls.add(fireBall);

 }


}



function updateHealth () 
{

  stroke(0);
  strokeWeight(4);
  noFill();
  rect(10, height-100, 200, 20);
  
  if(health > 150)
  {
  noStroke();
  fill(0, 128, 0);
  rect(10, height-100, health, 20); 
  }

  if(health < 150)
  {
   noStroke();
  fill(255, 255, 0);
  rect(10, height-100, health, 20); 
  }

  if(health < 80)
  {
  noStroke();
  fill(255, 69, 0);
  rect(10,height-100, health, 20); 
  }

  if(health < 50)
  {
  noStroke();
  fill(255, 0, 0);
  rect(10, height-100 , health, 20); 
  }

if(health < 0)
{
 gameOver.visible = true;
}

}


function updateHealth_e () 
{
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(10, 10, 1000, 20);

  if(health_e > 750)
  {
  noStroke();
  fill(0, 128, 0);
  rect(10, 10, health_e, 20); 
  }

  if(health_e < 750)
  {
   noStroke();
  fill(255, 255, 0);
  rect(10, 10, health_e, 20); 
  }

  if(health_e < 400)
  {
  noStroke();
  fill(255,90,54);
  rect(10, 10, health_e, 20); 
  }

  if(health_e < 200)
  {
  noStroke();
  fill(255,69,0);
  rect(10, 10, health_e, 20); 
  }

  if(health_e < 100)
  {
  noStroke();
  fill(255,8,0);
  rect(10, 10, health_e, 20); 
  }



}


