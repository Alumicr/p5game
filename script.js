// Start of Code
var gameOver = false
var enemy1Damage = 25;
var enemy2Damage = 50;
let player;
let enemy1;
let enemy2;
let bullet;
let score = 0;
let bulletSpawnDistance = 40;
let playerHealth = 100;
let damageText;

function setup() {
  //creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight - 10);
  player = new Sprite(width / 2, height / 2, 50, 50, "d");
  player.shapeColor = color("white");
  enemyBots = new Group();
  playerBullets = new Group();
  wallGroup = new Group();
  strongEnemy = new Group();

  walls();
  enemy();
  enemyTwo();

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

  //spawns enemys every 5.5 secconds
  setInterval(enemy, 5500)
  setInterval(enemyTwo, 10000)
}



function walls() {
  //function makes walls and sets the colours + adds to group
  wallRH = new Sprite(width, height / 2, 8, height, 'k');
  wallRH.shapeColor = color('white');
  wallLH = new Sprite(0, height / 2, 8, height, 'k');
  wallLH.shapeColor = color('white');
  wallTop = new Sprite(width / 2, 4, width, 8, 'k');
  wallTop.shapeColor = color('white');
  wallBot = new Sprite(width / 2, height + 4, width * 2, 8, 'k');
  wallBot.shapeColor = color('white');
  wallGroup.add(wallRH);
  wallGroup.add(wallLH);
  wallGroup.add(wallTop);
  wallGroup.add(wallBot);
}


function enemy() {
  // functions runs if var is false
  if (gameOver == false) {
    //function creates enemies vwith random postions and sets colour
    for (i = 0; i < 10; i++) {
      enemy1 = new Sprite(random(width), random(height), 29, 29, "d");
      enemyBots.add(enemy1);
      enemy1.shapeColor = color("red");
      console.log("enemy spawned");
    }
  }
}

function enemyTwo() {
  //function spawns stronger enemy
  //runs if var is false
  if (gameOver == false) {
    //spawns enemy with random location and sets colour
    for (i = 0; i < 3; i++) {
      enemy2 = new Sprite(random(width), random(height), 50, "d");
      enemy2.shapeColor = color("red");
      console.log("Strong enemy spawned");
      strongEnemy.add(enemy2);

    }
  }
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
    playerHealth -= enemy1Damage;
    damageText = 'An enemy has hit you!\nYou have taken ' + enemy1Damage + ' damage!';
    console.log(playerHealth);
  });

  // player health for enemy 2
  player.collide(strongEnemy, function(player, enemy) {
    enemy.remove();
    playerHealth -= enemy2Damage;
    damageText = 'A strong enemy has hit you!\nYou have taken ' + enemy2Damage + ' damage!'
    console.log(playerHealth);
  });


  // checks player health and stops game if player has 0 health
  if (playerHealth <= 0) {
    gameOver = true;
    enemyBots.remove();
    playerBullets.remove();
    console.log("Game over!");
    textSize(30);
    fill("white");
    text("You have died! \nYour score was: " + score + "!", 200, 200);
    noLoop();
  }

  //enemy items
  //enemy 1 control
  for (i = 0; i < enemyBots.length; i++) {
    enemy1 = enemyBots[i];
    let direction = p5.Vector.sub(player.pos, enemy1.pos);
    enemy1.vel = direction.limit(1.5);
  }
  //enemy 2 control
  for (i = 0; i < strongEnemy.length; i++) {
    enemy2 = strongEnemy[i];
    let direction = p5.Vector.sub(player.pos, enemy2.pos);
    enemy2.vel = direction.limit(1);

  }

  //bullet items
  for (i = 0; i < playerBullets.length; i++) {
    bullets = playerBullets[i];
    if (bullets.collide(wallGroup)) {
      playerBullets.remove(bullets);
      bullets.remove();
    }
  }


  //checks if players bullets are hitting enemys
  //controls score
  playerBullets.collide(enemyBots, function(bullet, enemy) {
    bullet.remove();
    enemy.remove();
    score += 1;
    console.log("enemydead");
  });
  //enemy 2 score
  playerBullets.collide(strongEnemy, function(bullet, enemy) {
    bullet.remove();
    enemy.remove();
    score += 2;
    console.log("strong enemy dead");
  });

  //players score
  textSize(20);
  fill("white");
  text("Score: " + score, 10, 35);

  //players health
  text("Health: " + playerHealth, 10, 70);

  //damage notification
  textSize(20);
  fill('red');
  text(damageText, 10, 105);

  //removes damage notfication every 9 milliseconds 
  if (damageText) {
    setTimeout(function() {
      damageText = '';
    }, 1000);
  }
}

//end of code 
