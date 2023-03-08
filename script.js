// Start of Code

let player;
let enemy1;
let bullet;



function setup() {
  // creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight);
  player = new Sprite(width / 2, height / 2, 50, 50, "d");
  player.shapeColor = color("white");
  enemyBots = new Group();
  playerBullets = new Group();
  wallGroup = new Group();

  walls();
  enemy();

  // player movement when key is pressed
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

  // player movement reset when key is relased 
  document.addEventListener("keyup", function(event) {

    if (event.code == "ArrowUp" || event.code == "ArrowDown" || event.code == "KeyW" || event.code == "KeyS") {
      player.vel.y = 0;
    }
    else if (event.code == "ArrowLeft" || event.code == "ArrowRight" || event.code == "KeyA" || event.code == "KeyD") {
      player.vel.x = 0;
    }
  })
}

function walls() {
  // function makes walls and sets the colours
  wallRH = new Sprite(width, height / 2, 8, height, 'k');
  wallRH.shapeColor = color('white');
  wallLH = new Sprite(0, height / 2, 8, height, 'k');
  wallLH.shapeColor = color('white');
  wallTop = new Sprite(width / 2, 4, width, 8, 'k');
  wallTop.shapeColor = color('white');
  wallBot = new Sprite(width/2, height + 4, width * 2, 8, 'k');
  wallBot.shapeColor = color('white');
  wallGroup.add(wallRH);
  wallGroup.add(wallLH);
  wallGroup.add(wallTop);
  wallGroup.add(wallBot);
}


function enemy() {
  //function creates enemiesvwith random postions and sets colour
  for (i = 0; i < 10; i++) {
    enemy1 = new Sprite(random(width), random(height), 29, 29, "d");
    enemyBots.add(enemy1);
    enemy1.shapeColor = color("red");
  }
}

function mouseClicked() {
  // players gun when clicked
  // Calculates values
  // Creates bullet and makes sets colour and adds to group
  dx = mouseX - player.pos.x;
  dy = mouseY - player.pos.y;
  bulletSpeed = createVector(dx, dy).setMag(6);
  bullet = new Sprite(player.pos.x, player.pos.y, 13);
  bullet.vel = bulletSpeed;
  bullet.shapeColor = color("white");
  playerBullets.add(bullet);
}


function draw() {
  //background for canvas
  background("black");
  //player items
  player.rotation = atan2(mouseY - player.pos.y, mouseX - player.pos.x);
  //enemy items
  for (let i = 0; i < enemyBots.length; i++) {
    enemy1 = enemyBots[i];
    let direction = p5.Vector.sub(player.pos, enemy1.pos);
    enemy1.vel = direction.limit(1.5);
  }
//bullet items
  for (let i = 0; i < playerBullets.length; i++) {
    bullets = playerBullets[i];
    if (bullets.collide(wallGroup)) {
      playerBullets.remove(bullets);
      bullets.remove();
    }
  }
}

//end of code 
