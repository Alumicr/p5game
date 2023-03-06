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
  wallTop = new Sprite(0, 8, width * 2, 8, 'k');
  wallTop.shapeColor = color('white');
  wallBot = new Sprite(width, height + 8, width * 2, 8, 'k');
  wallBot.shapeColor = color('white');
}


function enemy() {
  //function creates enemiesvwith random postions and sets colour
  for (i = 0; i < 10; i++) {
    enemy1 = new Sprite(random(width), random(height), 25, 25, "d");
    enemyBots.add(enemy1);
    enemy1.shapeColor = color("red");
  }
}

function mouseClicked() {
  // players gun
  bullet = new Sprite(player.pos.x, player.pos.y, 12);
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
    let enemy1 = enemyBots[i];
    let direction = p5.Vector.sub(player.pos, enemy1.pos);
    enemy1.vel = direction.limit(1.5);

  }
}


//end of code 
