// Start of Code
// Declare variables
var gameOver = false
var player;
var bullet;
var enemy1;
var enemy2;
var enemy3;
// lets
let enemy1Health = 2;
let playerHealth = 100;
let enemy2Health = 3;
let enemy3Health = 1;
let bulletDamage = 1;
let bulletSpawnDistance = 40;
let score = 0;
let timer = 0;
let damageText;
//consts
const PLAYERSAFESPAWNINGZONE = 140;
const ENEMY1DAMAGE = 25;
const ENEMY2DAMAGE = 50;
const ENEMY3DAMAGE = 10;

function setup() {
  //creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight - 10);
  player = new Sprite(width / 2, height / 2, 50, 50, "d");
  player.shapeColor = color("white");
  enemyBots = new Group();
  playerBullets = new Group();
  wallGroup = new Group();
  strongEnemy = new Group();
  speedEnemy = new Group();

  walls();
  enemyThree();

  //player movement when key is pressed
  document.addEventListener("keydown", function(event) {
    if (event.code == 'ArrowUp' || event.code == "KeyW") {
      player.vel.y = -5;
    }
    else if (event.code == 'ArrowDown' || event.code == "KeyS") {
      player.vel.y = 5;
    }
    else if (event.code == 'ArrowLeft' || event.code == "KeyA") {
      player.vel.x = -5;
    }
    else if (event.code == "ArrowRight" || event.code == "KeyD") {
      player.vel.x = 5;
    }
  })

  //player movement reset when key is relased 
  document.addEventListener("keyup", function(event) {

    if (event.code == "ArrowUp" || event.code == "ArrowDown" || event.code == "KeyW" || event.code == "KeyS") {
      player.vel.y = 0;
    }
    else if (event.code == "ArrowLeft" || event.code == "ArrowRight" || event.code == "KeyA" || event.code == "KeyD") {
      player.vel.x = 0;
    }
  })

  // spawn intervals for enemys and timer
  setInterval(gameTimer, 1000);
  setInterval(enemy, 5000);
  setInterval(enemyTwo, 8000);
  setInterval(enemyThree, 12000);
}

function walls() {
  //function makes walls and sets the colours + adds to group
  wallRH = new Sprite(width, height / 2, 8, height, 'k');
  wallRH.shapeColor = color('white');
  wallLH = new Sprite(0, height / 2, 8, height, 'k');
  wallLH.shapeColor = color('white');
  wallTop = new Sprite(width / 2, 1, width, 8, 'k');
  wallTop.shapeColor = color('white');
  wallBot = new Sprite(width / 2, height + 4, width * 2, 8, 'k');
  wallBot.shapeColor = color('white');
  wallGroup.add(wallRH);
  wallGroup.add(wallLH);
  wallGroup.add(wallTop);
  wallGroup.add(wallBot);
}

function enemy() {
  //functions runs if var is false
  if (gameOver == false) {
    //calculates spawn sure it is a certain distance from player
    for (i = 0; i < 6; i++) {
      enemyX = random(width);
      enemyY = random(height);
      dx = enemyX - player.pos.x;
      dy = enemyY - player.pos.y
      distance = sqrt(dx * dx + dy * dy);
      if (distance < PLAYERSAFESPAWNINGZONE) {
        i--;
        continue;
      }
      //creates enemies with random postions using values from above
      enemy1 = new Sprite(enemyX, enemyY, 29, 29, "d");
      enemy1.shapeColor = color("red");
      console.log("enemy spawned");
      enemy1.health = enemy1Health;
      enemyBots.add(enemy1);
    }
  }
}

function enemyTwo() {
  //function spawns stronger enemy
  //runs if var is false
  if (gameOver == false) {
    //calculates values
    for (i = 0; i < 3; i++) {
      enemyX = random(width);
      enemyY = random(height);
      dx = enemyX - player.pos.x;
      dy = enemyY - player.pos.y
      distance = sqrt(dx * dx + dy * dy);
      if (distance < PLAYERSAFESPAWNINGZONE) {
        i--;
        continue;
      }
      //using values calculated above, makes random spawning locations for strong enemy
      enemy2 = new Sprite(enemyX, enemyY, 60, "d");
      enemy2.shapeColor = color("red");
      console.log("Strong enemy spawned");
      enemy2.health = enemy2Health;
      strongEnemy.add(enemy2);
    }
  }
}

function enemyThree() {
  // function spawns speed enemy
  //runs if car is false
  if (gameOver == false) {
    // calculates values
    for (i = 0; i < 5; i++) {
      enemyX = random(width);
      enemyY = random(height);
      dx = enemyX - player.pos.x;
      dy = enemyY - player.pos.y;
      distance = sqrt(dx * dx + dy * dy);
      if (distance < PLAYERSAFESPAWNINGZONE) {
        i--;
        continue;
      }
      //creates speed enemies with random postions using values from above + hit boxes
      enemy3 = new Sprite(enemyX, enemyY, 52, 52, "d");
      enemy3.draw = function() {
        triangle(0, 30, 34, 0, 35, 35);
      }
      enemy3.health = enemy3Health;
      enemy3.shapeColor = color("red");
      console.log("Speed enemy spawned");
      speedEnemy.add(enemy3);
    }
  }
}

// function is for game timer
function gameTimer() {
  if (gameOver == false) {
    timer += 1;
  }
}

function playerDamage() {
  //flashes player when damge is taken
  player.shapeColor = color("red");
  setTimeout(function() {
    player.shapeColor = color("white");
  }, 300);
}

function mouseClicked() {
  //players gun when clicked
  //Calculates values (making sure it spawns a certain distance from the player)
  dx = mouseX - player.pos.x;
  dy = mouseY - player.pos.y;
  angle = atan2(dy, dx);
  bulletX = player.pos.x + cos(angle) * bulletSpawnDistance;
  bulletY = player.pos.y + sin(angle) * bulletSpawnDistance;
  bulletSpeed = createVector(dx, dy).setMag(8);

  //Creates bullet (using values above) and makes sets colour + speed + adds to group
  bullet = new Sprite(bulletX, bulletY, 13);
  bullet.vel = bulletSpeed;
  bullet.shapeColor = color("white");
  playerBullets.add(bullet);
}

function draw() {
  //background for canvas
  background("black");

  //player items
  player.rotation = atan2(mouseY - player.pos.y, mouseX - player.pos.x);

  //player health, removes damage health if touches 
  player.collide(enemyBots, function(player, enemy) {
    enemy.remove();
    playerHealth -= ENEMY1DAMAGE;
    damageText = 'An enemy has hit you!\nYou have taken ' + ENEMY1DAMAGE + ' damage!';
    playerDamage();
    console.log(playerHealth);
  });

  // player damage for enemy 2
  player.collide(strongEnemy, function(player, enemy) {
    enemy.remove();
    playerHealth -= ENEMY2DAMAGE;
    damageText = 'A strong enemy has hit you!\nYou have taken ' + ENEMY2DAMAGE + ' damage!'
    playerDamage();
    console.log(playerHealth);
  });

  // player damge for enemy 3
  player.collide(speedEnemy, function(player, enemy) {
    enemy.remove();
    playerHealth -= ENEMY3DAMAGE
    damageText = 'A speed enemy has hit you!\nYou have taken ' + ENEMY3DAMAGE + ' damage!'
    playerDamage();
    console.log(playerHealth);
  });
  
  // checks player health and stops game if player has 0 health
  if (playerHealth <= 0) {
    playerHealth = 0;
    gameOver = true;
    enemyBots.remove();
    strongEnemy.remove();
    speedEnemy.remove();
    playerBullets.remove();
    console.log("Game over!");
    textSize(30);
    fill("white");
    text("You have died!\nYou survived for " + timer + " seconds\nYour score was: " + score + "!", width / 2, 200);
    noLoop();
  }

  //enemy items
  //enemy 1 control
  for (i = 0; i < enemyBots.length; i++) {
    enemy1 = enemyBots[i];
    let direction = p5.Vector.sub(player.pos, enemy1.pos);
    enemy1.vel = direction.limit(1.35);
  }
  //enemy 2 control
  for (i = 0; i < strongEnemy.length; i++) {
    enemy2 = strongEnemy[i];
    let direction = p5.Vector.sub(player.pos, enemy2.pos);
    enemy2.vel = direction.limit(1);
  }
  //enemy 3 control
  for (i = 0; i < speedEnemy.length; i++) {
    enemy3 = speedEnemy[i];
    let direction = p5.Vector.sub(player.pos, enemy3.pos);
    enemy3.vel = direction.limit(2.9);
  }
  //bullet items
  for (i = 0; i < playerBullets.length; i++) {
    bullets = playerBullets[i];
    if (bullets.collide(wallGroup)) {
      playerBullets.remove(bullets);
      bullets.remove();
    }
  }
  //enemy death
  //controls score
  playerBullets.collide(enemyBots, function(bullet, enemy) {
    if (enemy.health <= bulletDamage) {
      bullet.remove();
      enemy.remove();
      score += 2;
      console.log("enemydead");
    } else {
      bullet.remove();
      enemy.health -= bulletDamage;
    }
  });

  //enemy 2 score and enemy death
  playerBullets.collide(strongEnemy, function(bullet, enemy) {
    if (enemy.health <= bulletDamage) {
      bullet.remove();
      enemy.remove();
      score += 3;
      console.log("strong enemy dead");
    } else {
      bullet.remove();
      enemy.health -= bulletDamage;
    }
  });

  //enemy 3 score and enemy death
  playerBullets.collide(speedEnemy, function(bullet, enemy) {
    if (enemy.health <= bulletDamage) {
      bullet.remove();
      enemy.remove();
      score += 1;
      console.log("speed enemy dead");
    } else {
      bullet.remove();
      enemy.health -= bulletDamage;
    }
  });

  // players score
  textSize(30);
  fill("white");
  text("Score: " + score, 10, 35);

  //players health
  text("Health: " + playerHealth, 10, 70);

  //damage notification
  textSize(30);
  fill('red');
  text(damageText, 10, 105);

  //display timer
  textSize(50);
  fill('white');
  text(timer, width - 65, 60)

  //removes damage notfication every 0.7 secconds
  if (damageText) {
    setTimeout(function() {
      damageText = '';
    }, 700);
  }
}

//end of code 
